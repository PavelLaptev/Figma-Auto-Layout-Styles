/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/controller.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/controller.ts":
/*!**********************************!*\
  !*** ./src/plugin/controller.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.tsx");
/* harmony import */ var _shareable_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shareable/variables */ "./src/shareable/variables.tsx");


figma.showUI(__html__, { width: 350, height: 540 });
figma.ui.postMessage({
    type: _shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"],
    data: figma.root.getPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"]),
});
const setLayoutProps = (frame, data, skipAxisMode = false, rename = true) => {
    frame.name = rename ? `${data.hookName}` : frame.name;
    frame.layoutMode = data.direction;
    if (!skipAxisMode) {
        frame.primaryAxisSizingMode = data.direction === 'HORIZONTAL' ? frame.primaryAxisSizingMode : 'AUTO';
        frame.counterAxisSizingMode = data.direction === 'VERTICAL' ? frame.counterAxisSizingMode : 'AUTO';
    }
    frame.paddingTop = data.space.top;
    frame.paddingRight = data.space.right;
    frame.paddingBottom = data.space.bottom;
    frame.paddingLeft = data.space.left;
    frame.itemSpacing = data.space.between;
};
figma.ui.onmessage = async (msg) => {
    let node = figma.currentPage.selection;
    if (msg.type === 'clear-stoorage') {
        figma.root.setPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"], '');
        figma.notify('👻 Storage cleared');
    }
    if (msg.type === 'record-config') {
        figma.root.setPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"], JSON.stringify(msg.data));
    }
    if (msg.type === 'apply-layout') {
        if (node.length > 1) {
            let parentConteiner = node[0].parent;
            let frame = figma.createFrame();
            const group = figma.group(node, parentConteiner);
            frame.x = group.x;
            frame.y = group.y;
            frame.backgrounds = [];
            frame.resize(group.width, group.height);
            setLayoutProps(frame, msg.data);
            let sortedNodes = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortNodesByPosition"])(node);
            sortedNodes.map((item) => {
                frame.appendChild(item);
            });
            parentConteiner.appendChild(frame);
            figma.currentPage.selection = [frame];
        }
        else if ((node.length === 1 && node[0].type === 'FRAME') || (node.length === 1 && node[0].type === 'COMPONENT')) {
            let frame = node[0];
            setLayoutProps(frame, msg.data, true);
        }
        else if (node.length === 1 && node[0].type === 'INSTANCE') {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].warn('Please select the master component', true, 4000);
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].error('Please select at least two blocks', true, 4000);
        }
    }
    if (msg.type === 'update-all') {
        let page = figma.currentPage;
        _utils__WEBPACK_IMPORTED_MODULE_0__["log"].custom('🥁', 'Updating all layouts', true, 2000);
        msg.data.layouts.map((LayoutData) => {
            let layouts = page.findAll((n) => n.name.includes(LayoutData.hookName));
            if (layouts.length !== 0) {
                layouts.map((LayoutFrame) => {
                    console.log(LayoutFrame, LayoutData);
                    setLayoutProps(LayoutFrame, LayoutData, false, false);
                });
            }
        });
    }
};


/***/ }),

/***/ "./src/shareable/variables.tsx":
/*!*************************************!*\
  !*** ./src/shareable/variables.tsx ***!
  \*************************************/
/*! exports provided: configStorageKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configStorageKey", function() { return configStorageKey; });
const configStorageKey = "last-config-record";


/***/ }),

/***/ "./src/utils/checkAndUpdateStructure.tsx":
/*!***********************************************!*\
  !*** ./src/utils/checkAndUpdateStructure.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const checkAndUpdateStructure = file => {
    file.layouts.forEach((item) => {
        if (!item.hasOwnProperty("fold")) {
            item.fold = false;
        }
    });
    return file;
};
/* harmony default export */ __webpack_exports__["default"] = (checkAndUpdateStructure);


/***/ }),

/***/ "./src/utils/downloadJSON.tsx":
/*!************************************!*\
  !*** ./src/utils/downloadJSON.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const download = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content, null, 2)], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};
/* harmony default export */ __webpack_exports__["default"] = (download);


/***/ }),

/***/ "./src/utils/generateRandomID.tsx":
/*!****************************************!*\
  !*** ./src/utils/generateRandomID.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var emojis = [
    "🐺",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🐸",
    "🐯",
    "🐨",
    "🐻",
    "🐷",
    "🐽",
    "🐮",
    "🐗",
    "🐵",
    "🐒",
    "🐴",
    "🐑",
    "🐘",
    "🐼",
    "🐧",
    "🐦",
    "🐤",
    "🐥",
    "🐣",
    "🐔",
    "🐍",
    "🐢",
    "🐛",
    "🐝",
    "🐜",
    "🐞",
    "🐌",
    "🐙",
    "🐚",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🐄",
    "🐏",
    "🐀",
    "🐃",
    "🐅",
    "🐇",
    "🐉",
    "🐎",
    "🐐",
    "🐓",
    "🐕",
    "🐖",
    "🐁",
    "🐂",
    "🐲",
    "🐡",
    "🐊",
    "🐫",
    "🐪",
    "🐆",
    "🐈",
    "🐩",
    "🐾",
    "💐",
    "🌸",
    "🌷",
    "🍀",
    "🌹",
    "🌻",
    "🌺",
    "🍁",
    "🍃",
    "🍂",
    "🌿",
    "🌾",
    "🍄",
    "🌵",
    "🌴",
    "🌲",
    "🌳",
    "🏈",
    "🏀",
    "⚽",
    "⚾",
    "🎾",
    "🎱",
    "🍺",
    "🍻",
    "🍸",
    "🍹",
    "🍷",
    "🍴",
    "🍕",
    "🍔",
    "🍟",
    "🍗",
    "🍖",
    "🍝",
    "🍛",
    "🍤",
    "🍱",
    "🍣",
    "🍥",
    "🍙",
    "🍘",
    "🍚",
    "🍜",
    "🍲",
    "🍢",
    "🍡",
    "🍳",
    "🍞",
    "🍩",
    "🍮",
    "🍦",
    "🍨",
    "🍧",
    "🎂",
    "🍰",
    "🍪",
    "🍫",
    "🍬",
    "🍭",
    "🍯",
    "🍎",
    "🍏",
    "🍊",
    "🍋",
    "🍒",
    "🍇",
    "🍉",
    "🍓",
    "🍑",
    "🍈",
    "🍌",
    "🍐",
    "🍍",
    "🍠",
    "🍆",
    "🍅",
    "🌽"
];
const generateRandomID = () => {
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    let randomID = Math.random()
        .toString(36)
        .slice(-4);
    return `${randomEmoji}${randomID}`;
};
/* harmony default export */ __webpack_exports__["default"] = (generateRandomID);


/***/ }),

/***/ "./src/utils/getBeforeSuffix.tsx":
/*!***************************************!*\
  !*** ./src/utils/getBeforeSuffix.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getBeforeSuffix = (str, checkSymbol) => {
    return str.substr(0, str.indexOf(checkSymbol));
};
/* harmony default export */ __webpack_exports__["default"] = (getBeforeSuffix);


/***/ }),

/***/ "./src/utils/getRandomKey.tsx":
/*!************************************!*\
  !*** ./src/utils/getRandomKey.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getRandomKey = () => {
    const randomKey = Math.floor(Math.random() * 100000000).toString();
    return randomKey;
};
/* harmony default export */ __webpack_exports__["default"] = (getRandomKey);


/***/ }),

/***/ "./src/utils/index.tsx":
/*!*****************************!*\
  !*** ./src/utils/index.tsx ***!
  \*****************************/
/*! exports provided: log, sortNodesByPosition, getBeforeSuffix, generateRandomID, downloadJSON, getRandomKey, checkAndUpdateStructure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "./src/utils/log.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "log", function() { return _log__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _sortNodesByPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sortNodesByPosition */ "./src/utils/sortNodesByPosition.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortNodesByPosition", function() { return _sortNodesByPosition__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _getBeforeSuffix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBeforeSuffix */ "./src/utils/getBeforeSuffix.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBeforeSuffix", function() { return _getBeforeSuffix__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _generateRandomID__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generateRandomID */ "./src/utils/generateRandomID.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateRandomID", function() { return _generateRandomID__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _downloadJSON__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./downloadJSON */ "./src/utils/downloadJSON.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadJSON", function() { return _downloadJSON__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _getRandomKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getRandomKey */ "./src/utils/getRandomKey.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomKey", function() { return _getRandomKey__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _checkAndUpdateStructure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checkAndUpdateStructure */ "./src/utils/checkAndUpdateStructure.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkAndUpdateStructure", function() { return _checkAndUpdateStructure__WEBPACK_IMPORTED_MODULE_6__["default"]; });










/***/ }),

/***/ "./src/utils/log.tsx":
/*!***************************!*\
  !*** ./src/utils/log.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let logStyles = "border-radius: 4px; padding: 2px 4px;";
let logTime = 800;
const log = {
    success: (text, show = true, timer = logTime) => {
        show
            ? console.log(`%c${text}`, `background: rgba(0, 255, 136, 0.14);${logStyles}`)
            : false;
        figma.notify(`🎉 ${text}`, {
            timeout: timer
        });
    },
    check: (text, show = true, timer = logTime) => {
        show
            ? console.log(`%c${text}`, `background: rgba(0, 204, 255, 0.14);${logStyles}`)
            : false;
        figma.notify(`✅ ${text}`, {
            timeout: timer
        });
    },
    neutral: (text, show = true, timer = logTime) => {
        show
            ? console.log(`%c${text}`, `background: rgba(128, 128, 128, 0.14);${logStyles}`)
            : false;
        figma.notify(`${text}`, {
            timeout: timer
        });
    },
    warn: (text, show = true, timer = logTime) => {
        show
            ? console.log(`%c${text}`, `background: rgba(255, 123, 0, 0.14);${logStyles}`)
            : false;
        figma.notify(`☢️ ${text}`, {
            timeout: timer
        });
    },
    error: (text, show = true, timer = logTime) => {
        show
            ? console.log(`%c${text}`, `background: rgba(255,0,0,0.14);${logStyles}`)
            : false;
        figma.notify(`⛔️ ${text}`, {
            timeout: timer
        });
    },
    custom: (emoji, text, show = true, timer = logTime) => {
        show
            ? console.log(`%c${text}`, `background: rgba(128, 128, 128, 0.14);${logStyles}`)
            : false;
        figma.notify(`${emoji} ${text}`, {
            timeout: timer
        });
    }
};
/* harmony default export */ __webpack_exports__["default"] = (log);


/***/ }),

/***/ "./src/utils/sortNodesByPosition.tsx":
/*!*******************************************!*\
  !*** ./src/utils/sortNodesByPosition.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const sortNodesByPosition = nodes => {
    var result = nodes.map(x => x);
    result.sort((current, next) => {
        return current.x - next.x;
    });
    return result.sort((current, next) => current.y - next.y);
};
/* harmony default export */ __webpack_exports__["default"] = (sortNodesByPosition);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWFibGUvdmFyaWFibGVzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmUudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9kb3dubG9hZEpTT04udHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZW5lcmF0ZVJhbmRvbUlELnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0QmVmb3JlU3VmZml4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0UmFuZG9tS2V5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9sb2cudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9zb3J0Tm9kZXNCeVBvc2l0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFvRDtBQUNNO0FBQzFELHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQSxVQUFVLHFFQUFnQjtBQUMxQixtQ0FBbUMscUVBQWdCO0FBQ25ELENBQUM7QUFDRDtBQUNBLDZCQUE2QixjQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMscUVBQWdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxxRUFBZ0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrRUFBbUI7QUFDakQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwQ0FBRztBQUNmO0FBQ0E7QUFDQSxZQUFZLDBDQUFHO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0RUE7QUFBQTtBQUFPOzs7Ozs7Ozs7Ozs7O0FDQVA7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDZSxzRkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7OztBQ1J2QztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsdUVBQVEsRUFBQzs7Ozs7Ozs7Ozs7OztBQ1R4QjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWSxFQUFFLFNBQVM7QUFDckM7QUFDZSwrRUFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3JKaEM7QUFBQTtBQUNBO0FBQ0E7QUFDZSw4RUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDSC9CO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDSjVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVDO0FBQ2dDO0FBQ1I7QUFDRTtBQUNSO0FBQ0E7QUFDc0I7Ozs7Ozs7Ozs7Ozs7QUNOL0U7QUFBQSxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDBCQUEwQixLQUFLO0FBQy9CO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssMENBQTBDLEVBQUUsVUFBVTtBQUMxRjtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssbUNBQW1DLEVBQUUsVUFBVTtBQUNuRjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssMENBQTBDLEVBQUUsVUFBVTtBQUMxRjtBQUNBLHdCQUF3QixNQUFNLEdBQUcsS0FBSztBQUN0QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ2Usa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3BEbkI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ2Usa0ZBQW1CLEVBQUMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwiaW1wb3J0IHsgbG9nLCBzb3J0Tm9kZXNCeVBvc2l0aW9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlnU3RvcmFnZUtleSB9IGZyb20gJy4uL3NoYXJlYWJsZS92YXJpYWJsZXMnO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzNTAsIGhlaWdodDogNTQwIH0pO1xuZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGU6IGNvbmZpZ1N0b3JhZ2VLZXksXG4gICAgZGF0YTogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZ1N0b3JhZ2VLZXkpLFxufSk7XG5jb25zdCBzZXRMYXlvdXRQcm9wcyA9IChmcmFtZSwgZGF0YSwgc2tpcEF4aXNNb2RlID0gZmFsc2UsIHJlbmFtZSA9IHRydWUpID0+IHtcbiAgICBmcmFtZS5uYW1lID0gcmVuYW1lID8gYCR7ZGF0YS5ob29rTmFtZX1gIDogZnJhbWUubmFtZTtcbiAgICBmcmFtZS5sYXlvdXRNb2RlID0gZGF0YS5kaXJlY3Rpb247XG4gICAgaWYgKCFza2lwQXhpc01vZGUpIHtcbiAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gZGF0YS5kaXJlY3Rpb24gPT09ICdIT1JJWk9OVEFMJyA/IGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA6ICdBVVRPJztcbiAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gZGF0YS5kaXJlY3Rpb24gPT09ICdWRVJUSUNBTCcgPyBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgOiAnQVVUTyc7XG4gICAgfVxuICAgIGZyYW1lLnBhZGRpbmdUb3AgPSBkYXRhLnNwYWNlLnRvcDtcbiAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSBkYXRhLnNwYWNlLnJpZ2h0O1xuICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSBkYXRhLnNwYWNlLmJvdHRvbTtcbiAgICBmcmFtZS5wYWRkaW5nTGVmdCA9IGRhdGEuc3BhY2UubGVmdDtcbiAgICBmcmFtZS5pdGVtU3BhY2luZyA9IGRhdGEuc3BhY2UuYmV0d2Vlbjtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBhc3luYyAobXNnKSA9PiB7XG4gICAgbGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKG1zZy50eXBlID09PSAnY2xlYXItc3Rvb3JhZ2UnKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWdTdG9yYWdlS2V5LCAnJyk7XG4gICAgICAgIGZpZ21hLm5vdGlmeSgn8J+RuyBTdG9yYWdlIGNsZWFyZWQnKTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSAncmVjb3JkLWNvbmZpZycpIHtcbiAgICAgICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZ1N0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KG1zZy5kYXRhKSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2FwcGx5LWxheW91dCcpIHtcbiAgICAgICAgaWYgKG5vZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudENvbnRlaW5lciA9IG5vZGVbMF0ucGFyZW50O1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAobm9kZSwgcGFyZW50Q29udGVpbmVyKTtcbiAgICAgICAgICAgIGZyYW1lLnggPSBncm91cC54O1xuICAgICAgICAgICAgZnJhbWUueSA9IGdyb3VwLnk7XG4gICAgICAgICAgICBmcmFtZS5iYWNrZ3JvdW5kcyA9IFtdO1xuICAgICAgICAgICAgZnJhbWUucmVzaXplKGdyb3VwLndpZHRoLCBncm91cC5oZWlnaHQpO1xuICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoZnJhbWUsIG1zZy5kYXRhKTtcbiAgICAgICAgICAgIGxldCBzb3J0ZWROb2RlcyA9IHNvcnROb2Rlc0J5UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzb3J0ZWROb2Rlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFyZW50Q29udGVpbmVyLmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtmcmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gJ0ZSQU1FJykgfHwgKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gJ0NPTVBPTkVOVCcpKSB7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBub2RlWzBdO1xuICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoZnJhbWUsIG1zZy5kYXRhLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09ICdJTlNUQU5DRScpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKCdQbGVhc2Ugc2VsZWN0IHRoZSBtYXN0ZXIgY29tcG9uZW50JywgdHJ1ZSwgNDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoJ1BsZWFzZSBzZWxlY3QgYXQgbGVhc3QgdHdvIGJsb2NrcycsIHRydWUsIDQwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gJ3VwZGF0ZS1hbGwnKSB7XG4gICAgICAgIGxldCBwYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgICAgIGxvZy5jdXN0b20oJ/CfpYEnLCAnVXBkYXRpbmcgYWxsIGxheW91dHMnLCB0cnVlLCAyMDAwKTtcbiAgICAgICAgbXNnLmRhdGEubGF5b3V0cy5tYXAoKExheW91dERhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBsYXlvdXRzID0gcGFnZS5maW5kQWxsKChuKSA9PiBuLm5hbWUuaW5jbHVkZXMoTGF5b3V0RGF0YS5ob29rTmFtZSkpO1xuICAgICAgICAgICAgaWYgKGxheW91dHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0cy5tYXAoKExheW91dEZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKExheW91dEZyYW1lLCBMYXlvdXREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoTGF5b3V0RnJhbWUsIExheW91dERhdGEsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJleHBvcnQgY29uc3QgY29uZmlnU3RvcmFnZUtleSA9IFwibGFzdC1jb25maWctcmVjb3JkXCI7XG4iLCJjb25zdCBjaGVja0FuZFVwZGF0ZVN0cnVjdHVyZSA9IGZpbGUgPT4ge1xuICAgIGZpbGUubGF5b3V0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eShcImZvbGRcIikpIHtcbiAgICAgICAgICAgIGl0ZW0uZm9sZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbGU7XG59O1xuZXhwb3J0IGRlZmF1bHQgY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmU7XG4iLCJjb25zdCBkb3dubG9hZCA9IChjb250ZW50LCBmaWxlTmFtZSwgY29udGVudFR5cGUpID0+IHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHZhciBmaWxlID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIDIpXSwge1xuICAgICAgICB0eXBlOiBjb250ZW50VHlwZVxuICAgIH0pO1xuICAgIGEuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIGEuY2xpY2soKTtcbn07XG5leHBvcnQgZGVmYXVsdCBkb3dubG9hZDtcbiIsInZhciBlbW9qaXMgPSBbXG4gICAgXCLwn5C6XCIsXG4gICAgXCLwn5CxXCIsXG4gICAgXCLwn5CtXCIsXG4gICAgXCLwn5C5XCIsXG4gICAgXCLwn5CwXCIsXG4gICAgXCLwn5C4XCIsXG4gICAgXCLwn5CvXCIsXG4gICAgXCLwn5CoXCIsXG4gICAgXCLwn5C7XCIsXG4gICAgXCLwn5C3XCIsXG4gICAgXCLwn5C9XCIsXG4gICAgXCLwn5CuXCIsXG4gICAgXCLwn5CXXCIsXG4gICAgXCLwn5C1XCIsXG4gICAgXCLwn5CSXCIsXG4gICAgXCLwn5C0XCIsXG4gICAgXCLwn5CRXCIsXG4gICAgXCLwn5CYXCIsXG4gICAgXCLwn5C8XCIsXG4gICAgXCLwn5CnXCIsXG4gICAgXCLwn5CmXCIsXG4gICAgXCLwn5CkXCIsXG4gICAgXCLwn5ClXCIsXG4gICAgXCLwn5CjXCIsXG4gICAgXCLwn5CUXCIsXG4gICAgXCLwn5CNXCIsXG4gICAgXCLwn5CiXCIsXG4gICAgXCLwn5CbXCIsXG4gICAgXCLwn5CdXCIsXG4gICAgXCLwn5CcXCIsXG4gICAgXCLwn5CeXCIsXG4gICAgXCLwn5CMXCIsXG4gICAgXCLwn5CZXCIsXG4gICAgXCLwn5CaXCIsXG4gICAgXCLwn5CgXCIsXG4gICAgXCLwn5CfXCIsXG4gICAgXCLwn5CsXCIsXG4gICAgXCLwn5CzXCIsXG4gICAgXCLwn5CLXCIsXG4gICAgXCLwn5CEXCIsXG4gICAgXCLwn5CPXCIsXG4gICAgXCLwn5CAXCIsXG4gICAgXCLwn5CDXCIsXG4gICAgXCLwn5CFXCIsXG4gICAgXCLwn5CHXCIsXG4gICAgXCLwn5CJXCIsXG4gICAgXCLwn5COXCIsXG4gICAgXCLwn5CQXCIsXG4gICAgXCLwn5CTXCIsXG4gICAgXCLwn5CVXCIsXG4gICAgXCLwn5CWXCIsXG4gICAgXCLwn5CBXCIsXG4gICAgXCLwn5CCXCIsXG4gICAgXCLwn5CyXCIsXG4gICAgXCLwn5ChXCIsXG4gICAgXCLwn5CKXCIsXG4gICAgXCLwn5CrXCIsXG4gICAgXCLwn5CqXCIsXG4gICAgXCLwn5CGXCIsXG4gICAgXCLwn5CIXCIsXG4gICAgXCLwn5CpXCIsXG4gICAgXCLwn5C+XCIsXG4gICAgXCLwn5KQXCIsXG4gICAgXCLwn4y4XCIsXG4gICAgXCLwn4y3XCIsXG4gICAgXCLwn42AXCIsXG4gICAgXCLwn4y5XCIsXG4gICAgXCLwn4y7XCIsXG4gICAgXCLwn4y6XCIsXG4gICAgXCLwn42BXCIsXG4gICAgXCLwn42DXCIsXG4gICAgXCLwn42CXCIsXG4gICAgXCLwn4y/XCIsXG4gICAgXCLwn4y+XCIsXG4gICAgXCLwn42EXCIsXG4gICAgXCLwn4y1XCIsXG4gICAgXCLwn4y0XCIsXG4gICAgXCLwn4yyXCIsXG4gICAgXCLwn4yzXCIsXG4gICAgXCLwn4+IXCIsXG4gICAgXCLwn4+AXCIsXG4gICAgXCLimr1cIixcbiAgICBcIuKavlwiLFxuICAgIFwi8J+OvlwiLFxuICAgIFwi8J+OsVwiLFxuICAgIFwi8J+NulwiLFxuICAgIFwi8J+Nu1wiLFxuICAgIFwi8J+NuFwiLFxuICAgIFwi8J+NuVwiLFxuICAgIFwi8J+Nt1wiLFxuICAgIFwi8J+NtFwiLFxuICAgIFwi8J+NlVwiLFxuICAgIFwi8J+NlFwiLFxuICAgIFwi8J+Nn1wiLFxuICAgIFwi8J+Nl1wiLFxuICAgIFwi8J+NllwiLFxuICAgIFwi8J+NnVwiLFxuICAgIFwi8J+Nm1wiLFxuICAgIFwi8J+NpFwiLFxuICAgIFwi8J+NsVwiLFxuICAgIFwi8J+No1wiLFxuICAgIFwi8J+NpVwiLFxuICAgIFwi8J+NmVwiLFxuICAgIFwi8J+NmFwiLFxuICAgIFwi8J+NmlwiLFxuICAgIFwi8J+NnFwiLFxuICAgIFwi8J+NslwiLFxuICAgIFwi8J+NolwiLFxuICAgIFwi8J+NoVwiLFxuICAgIFwi8J+Ns1wiLFxuICAgIFwi8J+NnlwiLFxuICAgIFwi8J+NqVwiLFxuICAgIFwi8J+NrlwiLFxuICAgIFwi8J+NplwiLFxuICAgIFwi8J+NqFwiLFxuICAgIFwi8J+Np1wiLFxuICAgIFwi8J+OglwiLFxuICAgIFwi8J+NsFwiLFxuICAgIFwi8J+NqlwiLFxuICAgIFwi8J+Nq1wiLFxuICAgIFwi8J+NrFwiLFxuICAgIFwi8J+NrVwiLFxuICAgIFwi8J+Nr1wiLFxuICAgIFwi8J+NjlwiLFxuICAgIFwi8J+Nj1wiLFxuICAgIFwi8J+NilwiLFxuICAgIFwi8J+Ni1wiLFxuICAgIFwi8J+NklwiLFxuICAgIFwi8J+Nh1wiLFxuICAgIFwi8J+NiVwiLFxuICAgIFwi8J+Nk1wiLFxuICAgIFwi8J+NkVwiLFxuICAgIFwi8J+NiFwiLFxuICAgIFwi8J+NjFwiLFxuICAgIFwi8J+NkFwiLFxuICAgIFwi8J+NjVwiLFxuICAgIFwi8J+NoFwiLFxuICAgIFwi8J+NhlwiLFxuICAgIFwi8J+NhVwiLFxuICAgIFwi8J+MvVwiXG5dO1xuY29uc3QgZ2VuZXJhdGVSYW5kb21JRCA9ICgpID0+IHtcbiAgICBsZXQgcmFuZG9tRW1vamkgPSBlbW9qaXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamlzLmxlbmd0aCldO1xuICAgIGxldCByYW5kb21JRCA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAuc2xpY2UoLTQpO1xuICAgIHJldHVybiBgJHtyYW5kb21FbW9qaX0ke3JhbmRvbUlEfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVSYW5kb21JRDtcbiIsImNvbnN0IGdldEJlZm9yZVN1ZmZpeCA9IChzdHIsIGNoZWNrU3ltYm9sKSA9PiB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgc3RyLmluZGV4T2YoY2hlY2tTeW1ib2wpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRCZWZvcmVTdWZmaXg7XG4iLCJjb25zdCBnZXRSYW5kb21LZXkgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tS2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwKS50b1N0cmluZygpO1xuICAgIHJldHVybiByYW5kb21LZXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UmFuZG9tS2V5O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuL3NvcnROb2Rlc0J5UG9zaXRpb25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0QmVmb3JlU3VmZml4IH0gZnJvbSBcIi4vZ2V0QmVmb3JlU3VmZml4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdlbmVyYXRlUmFuZG9tSUQgfSBmcm9tIFwiLi9nZW5lcmF0ZVJhbmRvbUlEXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGRvd25sb2FkSlNPTiB9IGZyb20gXCIuL2Rvd25sb2FkSlNPTlwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRSYW5kb21LZXkgfSBmcm9tIFwiLi9nZXRSYW5kb21LZXlcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmUgfSBmcm9tIFwiLi9jaGVja0FuZFVwZGF0ZVN0cnVjdHVyZVwiO1xuIiwibGV0IGxvZ1N0eWxlcyA9IFwiYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAycHggNHB4O1wiO1xubGV0IGxvZ1RpbWUgPSA4MDA7XG5jb25zdCBsb2cgPSB7XG4gICAgc3VjY2VzczogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMCwgMjU1LCAxMzYsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYPCfjokgJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2hlY2s6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDIwNCwgMjU1LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDinIUgJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgbmV1dHJhbDogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShgJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgd2FybjogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxMjMsIDAsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKYou+4jyAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMjU1LDAsMCwwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDim5TvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY3VzdG9tOiAoZW1vamksIHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShgJHtlbW9qaX0gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBsb2c7XG4iLCJjb25zdCBzb3J0Tm9kZXNCeVBvc2l0aW9uID0gbm9kZXMgPT4ge1xuICAgIHZhciByZXN1bHQgPSBub2Rlcy5tYXAoeCA9PiB4KTtcbiAgICByZXN1bHQuc29ydCgoY3VycmVudCwgbmV4dCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudC54IC0gbmV4dC54O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQuc29ydCgoY3VycmVudCwgbmV4dCkgPT4gY3VycmVudC55IC0gbmV4dC55KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb3J0Tm9kZXNCeVBvc2l0aW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==