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
    data: figma.root.getPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"])
});
const setLayoutProps = (frame, data, skipAxisMode = false, rename = true) => {
    frame.name = rename ? `${data.hookName}` : frame.name;
    frame.layoutMode = data.direction;
    if (!skipAxisMode) {
        frame.primaryAxisSizingMode =
            data.direction === "HORIZONTAL" ? frame.primaryAxisSizingMode : "AUTO";
        frame.counterAxisSizingMode =
            data.direction === "VERTICAL" ? frame.counterAxisSizingMode : "AUTO";
    }
    frame.paddingTop = data.space.top;
    frame.paddingRight = data.space.right;
    frame.paddingBottom = data.space.bottom;
    frame.paddingLeft = data.space.left;
    frame.itemSpacing = data.space.between;
};
figma.ui.onmessage = async (msg) => {
    let node = figma.currentPage.selection;
    if (msg.type === "clear-stoorage") {
        figma.root.setPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"], "");
        figma.notify("👻 Storage cleared");
    }
    if (msg.type === "record-config") {
        figma.root.setPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"], JSON.stringify(msg.data));
    }
    if (msg.type === "apply-layout") {
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
            sortedNodes.map(item => {
                frame.appendChild(item);
            });
            parentConteiner.appendChild(frame);
            figma.currentPage.selection = [frame];
        }
        else if ((node.length === 1 && node[0].type === "FRAME") ||
            (node.length === 1 && node[0].type === "COMPONENT")) {
            let frame = node[0];
            setLayoutProps(frame, msg.data, true);
        }
        else if (node.length === 1 && node[0].type === "INSTANCE") {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].warn("Please select the master component", true, 4000);
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].error("Please select at least two blocks", true, 4000);
        }
    }
    if (msg.type === "update-all") {
        let page = figma.currentPage;
        _utils__WEBPACK_IMPORTED_MODULE_0__["log"].custom("🥁", "Updating all layouts", true, 2000);
        msg.data.layouts.map(LayoutData => {
            let layouts = page.findAll(n => n.name.includes(LayoutData.hookName));
            if (layouts.length !== 0) {
                layouts.map(LayoutFrame => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWFibGUvdmFyaWFibGVzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmUudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9kb3dubG9hZEpTT04udHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZW5lcmF0ZVJhbmRvbUlELnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0QmVmb3JlU3VmZml4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0UmFuZG9tS2V5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9sb2cudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9zb3J0Tm9kZXNCeVBvc2l0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFvRDtBQUNNO0FBQzFELHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQSxVQUFVLHFFQUFnQjtBQUMxQixtQ0FBbUMscUVBQWdCO0FBQ25ELENBQUM7QUFDRDtBQUNBLDZCQUE2QixjQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFFQUFnQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMscUVBQWdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0VBQW1CO0FBQ2pEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwQ0FBRztBQUNmO0FBQ0E7QUFDQSxZQUFZLDBDQUFHO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQUE7QUFBTzs7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ2Usc0ZBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNSdkM7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNlLHVFQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNUeEI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVksRUFBRSxTQUFTO0FBQ3JDO0FBQ2UsK0VBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNySmhDO0FBQUE7QUFDQTtBQUNBO0FBQ2UsOEVBQWUsRUFBQzs7Ozs7Ozs7Ozs7OztBQ0gvQjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsMkVBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQ0o1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNnQztBQUNSO0FBQ0U7QUFDUjtBQUNBO0FBQ3NCOzs7Ozs7Ozs7Ozs7O0FDTi9FO0FBQUEsb0NBQW9DLGtCQUFrQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLDBDQUEwQyxFQUFFLFVBQVU7QUFDMUY7QUFDQSx3QkFBd0IsS0FBSztBQUM3QjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLG1DQUFtQyxFQUFFLFVBQVU7QUFDbkY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLDBDQUEwQyxFQUFFLFVBQVU7QUFDMUY7QUFDQSx3QkFBd0IsTUFBTSxHQUFHLEtBQUs7QUFDdEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNlLGtFQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNwRG5CO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNlLGtGQUFtQixFQUFDIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsImltcG9ydCB7IGxvZywgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgY29uZmlnU3RvcmFnZUtleSB9IGZyb20gXCIuLi9zaGFyZWFibGUvdmFyaWFibGVzXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDM1MCwgaGVpZ2h0OiA1NDAgfSk7XG5maWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgdHlwZTogY29uZmlnU3RvcmFnZUtleSxcbiAgICBkYXRhOiBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnU3RvcmFnZUtleSlcbn0pO1xuY29uc3Qgc2V0TGF5b3V0UHJvcHMgPSAoZnJhbWUsIGRhdGEsIHNraXBBeGlzTW9kZSA9IGZhbHNlLCByZW5hbWUgPSB0cnVlKSA9PiB7XG4gICAgZnJhbWUubmFtZSA9IHJlbmFtZSA/IGAke2RhdGEuaG9va05hbWV9YCA6IGZyYW1lLm5hbWU7XG4gICAgZnJhbWUubGF5b3V0TW9kZSA9IGRhdGEuZGlyZWN0aW9uO1xuICAgIGlmICghc2tpcEF4aXNNb2RlKSB7XG4gICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbiA9PT0gXCJIT1JJWk9OVEFMXCIgPyBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgOiBcIkFVVE9cIjtcbiAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID1cbiAgICAgICAgICAgIGRhdGEuZGlyZWN0aW9uID09PSBcIlZFUlRJQ0FMXCIgPyBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgOiBcIkFVVE9cIjtcbiAgICB9XG4gICAgZnJhbWUucGFkZGluZ1RvcCA9IGRhdGEuc3BhY2UudG9wO1xuICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IGRhdGEuc3BhY2UucmlnaHQ7XG4gICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IGRhdGEuc3BhY2UuYm90dG9tO1xuICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gZGF0YS5zcGFjZS5sZWZ0O1xuICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gZGF0YS5zcGFjZS5iZXR3ZWVuO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IGFzeW5jIChtc2cpID0+IHtcbiAgICBsZXQgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY2xlYXItc3Rvb3JhZ2VcIikge1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnU3RvcmFnZUtleSwgXCJcIik7XG4gICAgICAgIGZpZ21hLm5vdGlmeShcIvCfkbsgU3RvcmFnZSBjbGVhcmVkXCIpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVjb3JkLWNvbmZpZ1wiKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWdTdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShtc2cuZGF0YSkpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiYXBwbHktbGF5b3V0XCIpIHtcbiAgICAgICAgaWYgKG5vZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudENvbnRlaW5lciA9IG5vZGVbMF0ucGFyZW50O1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAobm9kZSwgcGFyZW50Q29udGVpbmVyKTtcbiAgICAgICAgICAgIGZyYW1lLnggPSBncm91cC54O1xuICAgICAgICAgICAgZnJhbWUueSA9IGdyb3VwLnk7XG4gICAgICAgICAgICBmcmFtZS5iYWNrZ3JvdW5kcyA9IFtdO1xuICAgICAgICAgICAgZnJhbWUucmVzaXplKGdyb3VwLndpZHRoLCBncm91cC5oZWlnaHQpO1xuICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoZnJhbWUsIG1zZy5kYXRhKTtcbiAgICAgICAgICAgIGxldCBzb3J0ZWROb2RlcyA9IHNvcnROb2Rlc0J5UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzb3J0ZWROb2Rlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhcmVudENvbnRlaW5lci5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbZnJhbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09IFwiRlJBTUVcIikgfHxcbiAgICAgICAgICAgIChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09IFwiQ09NUE9ORU5UXCIpKSB7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBub2RlWzBdO1xuICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoZnJhbWUsIG1zZy5kYXRhLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09IFwiSU5TVEFOQ0VcIikge1xuICAgICAgICAgICAgbG9nLndhcm4oXCJQbGVhc2Ugc2VsZWN0IHRoZSBtYXN0ZXIgY29tcG9uZW50XCIsIHRydWUsIDQwMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKFwiUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCB0d28gYmxvY2tzXCIsIHRydWUsIDQwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJ1cGRhdGUtYWxsXCIpIHtcbiAgICAgICAgbGV0IHBhZ2UgPSBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICAgICAgbG9nLmN1c3RvbShcIvCfpYFcIiwgXCJVcGRhdGluZyBhbGwgbGF5b3V0c1wiLCB0cnVlLCAyMDAwKTtcbiAgICAgICAgbXNnLmRhdGEubGF5b3V0cy5tYXAoTGF5b3V0RGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgbGF5b3V0cyA9IHBhZ2UuZmluZEFsbChuID0+IG4ubmFtZS5pbmNsdWRlcyhMYXlvdXREYXRhLmhvb2tOYW1lKSk7XG4gICAgICAgICAgICBpZiAobGF5b3V0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRzLm1hcChMYXlvdXRGcmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldExheW91dFByb3BzKExheW91dEZyYW1lLCBMYXlvdXREYXRhLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNvbmZpZ1N0b3JhZ2VLZXkgPSBcImxhc3QtY29uZmlnLXJlY29yZFwiO1xuIiwiY29uc3QgY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmUgPSBmaWxlID0+IHtcbiAgICBmaWxlLmxheW91dHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoXCJmb2xkXCIpKSB7XG4gICAgICAgICAgICBpdGVtLmZvbGQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaWxlO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNoZWNrQW5kVXBkYXRlU3RydWN0dXJlO1xuIiwiY29uc3QgZG93bmxvYWQgPSAoY29udGVudCwgZmlsZU5hbWUsIGNvbnRlbnRUeXBlKSA9PiB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKV0sIHtcbiAgICAgICAgdHlwZTogY29udGVudFR5cGVcbiAgICB9KTtcbiAgICBhLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBhLmNsaWNrKCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQ7XG4iLCJ2YXIgZW1vamlzID0gW1xuICAgIFwi8J+QulwiLFxuICAgIFwi8J+QsVwiLFxuICAgIFwi8J+QrVwiLFxuICAgIFwi8J+QuVwiLFxuICAgIFwi8J+QsFwiLFxuICAgIFwi8J+QuFwiLFxuICAgIFwi8J+Qr1wiLFxuICAgIFwi8J+QqFwiLFxuICAgIFwi8J+Qu1wiLFxuICAgIFwi8J+Qt1wiLFxuICAgIFwi8J+QvVwiLFxuICAgIFwi8J+QrlwiLFxuICAgIFwi8J+Ql1wiLFxuICAgIFwi8J+QtVwiLFxuICAgIFwi8J+QklwiLFxuICAgIFwi8J+QtFwiLFxuICAgIFwi8J+QkVwiLFxuICAgIFwi8J+QmFwiLFxuICAgIFwi8J+QvFwiLFxuICAgIFwi8J+Qp1wiLFxuICAgIFwi8J+QplwiLFxuICAgIFwi8J+QpFwiLFxuICAgIFwi8J+QpVwiLFxuICAgIFwi8J+Qo1wiLFxuICAgIFwi8J+QlFwiLFxuICAgIFwi8J+QjVwiLFxuICAgIFwi8J+QolwiLFxuICAgIFwi8J+Qm1wiLFxuICAgIFwi8J+QnVwiLFxuICAgIFwi8J+QnFwiLFxuICAgIFwi8J+QnlwiLFxuICAgIFwi8J+QjFwiLFxuICAgIFwi8J+QmVwiLFxuICAgIFwi8J+QmlwiLFxuICAgIFwi8J+QoFwiLFxuICAgIFwi8J+Qn1wiLFxuICAgIFwi8J+QrFwiLFxuICAgIFwi8J+Qs1wiLFxuICAgIFwi8J+Qi1wiLFxuICAgIFwi8J+QhFwiLFxuICAgIFwi8J+Qj1wiLFxuICAgIFwi8J+QgFwiLFxuICAgIFwi8J+Qg1wiLFxuICAgIFwi8J+QhVwiLFxuICAgIFwi8J+Qh1wiLFxuICAgIFwi8J+QiVwiLFxuICAgIFwi8J+QjlwiLFxuICAgIFwi8J+QkFwiLFxuICAgIFwi8J+Qk1wiLFxuICAgIFwi8J+QlVwiLFxuICAgIFwi8J+QllwiLFxuICAgIFwi8J+QgVwiLFxuICAgIFwi8J+QglwiLFxuICAgIFwi8J+QslwiLFxuICAgIFwi8J+QoVwiLFxuICAgIFwi8J+QilwiLFxuICAgIFwi8J+Qq1wiLFxuICAgIFwi8J+QqlwiLFxuICAgIFwi8J+QhlwiLFxuICAgIFwi8J+QiFwiLFxuICAgIFwi8J+QqVwiLFxuICAgIFwi8J+QvlwiLFxuICAgIFwi8J+SkFwiLFxuICAgIFwi8J+MuFwiLFxuICAgIFwi8J+Mt1wiLFxuICAgIFwi8J+NgFwiLFxuICAgIFwi8J+MuVwiLFxuICAgIFwi8J+Mu1wiLFxuICAgIFwi8J+MulwiLFxuICAgIFwi8J+NgVwiLFxuICAgIFwi8J+Ng1wiLFxuICAgIFwi8J+NglwiLFxuICAgIFwi8J+Mv1wiLFxuICAgIFwi8J+MvlwiLFxuICAgIFwi8J+NhFwiLFxuICAgIFwi8J+MtVwiLFxuICAgIFwi8J+MtFwiLFxuICAgIFwi8J+MslwiLFxuICAgIFwi8J+Ms1wiLFxuICAgIFwi8J+PiFwiLFxuICAgIFwi8J+PgFwiLFxuICAgIFwi4pq9XCIsXG4gICAgXCLimr5cIixcbiAgICBcIvCfjr5cIixcbiAgICBcIvCfjrFcIixcbiAgICBcIvCfjbpcIixcbiAgICBcIvCfjbtcIixcbiAgICBcIvCfjbhcIixcbiAgICBcIvCfjblcIixcbiAgICBcIvCfjbdcIixcbiAgICBcIvCfjbRcIixcbiAgICBcIvCfjZVcIixcbiAgICBcIvCfjZRcIixcbiAgICBcIvCfjZ9cIixcbiAgICBcIvCfjZdcIixcbiAgICBcIvCfjZZcIixcbiAgICBcIvCfjZ1cIixcbiAgICBcIvCfjZtcIixcbiAgICBcIvCfjaRcIixcbiAgICBcIvCfjbFcIixcbiAgICBcIvCfjaNcIixcbiAgICBcIvCfjaVcIixcbiAgICBcIvCfjZlcIixcbiAgICBcIvCfjZhcIixcbiAgICBcIvCfjZpcIixcbiAgICBcIvCfjZxcIixcbiAgICBcIvCfjbJcIixcbiAgICBcIvCfjaJcIixcbiAgICBcIvCfjaFcIixcbiAgICBcIvCfjbNcIixcbiAgICBcIvCfjZ5cIixcbiAgICBcIvCfjalcIixcbiAgICBcIvCfja5cIixcbiAgICBcIvCfjaZcIixcbiAgICBcIvCfjahcIixcbiAgICBcIvCfjadcIixcbiAgICBcIvCfjoJcIixcbiAgICBcIvCfjbBcIixcbiAgICBcIvCfjapcIixcbiAgICBcIvCfjatcIixcbiAgICBcIvCfjaxcIixcbiAgICBcIvCfja1cIixcbiAgICBcIvCfja9cIixcbiAgICBcIvCfjY5cIixcbiAgICBcIvCfjY9cIixcbiAgICBcIvCfjYpcIixcbiAgICBcIvCfjYtcIixcbiAgICBcIvCfjZJcIixcbiAgICBcIvCfjYdcIixcbiAgICBcIvCfjYlcIixcbiAgICBcIvCfjZNcIixcbiAgICBcIvCfjZFcIixcbiAgICBcIvCfjYhcIixcbiAgICBcIvCfjYxcIixcbiAgICBcIvCfjZBcIixcbiAgICBcIvCfjY1cIixcbiAgICBcIvCfjaBcIixcbiAgICBcIvCfjYZcIixcbiAgICBcIvCfjYVcIixcbiAgICBcIvCfjL1cIlxuXTtcbmNvbnN0IGdlbmVyYXRlUmFuZG9tSUQgPSAoKSA9PiB7XG4gICAgbGV0IHJhbmRvbUVtb2ppID0gZW1vamlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppcy5sZW5ndGgpXTtcbiAgICBsZXQgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgLnNsaWNlKC00KTtcbiAgICByZXR1cm4gYCR7cmFuZG9tRW1vaml9JHtyYW5kb21JRH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlUmFuZG9tSUQ7XG4iLCJjb25zdCBnZXRCZWZvcmVTdWZmaXggPSAoc3RyLCBjaGVja1N5bWJvbCkgPT4ge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIHN0ci5pbmRleE9mKGNoZWNrU3ltYm9sKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0QmVmb3JlU3VmZml4O1xuIiwiY29uc3QgZ2V0UmFuZG9tS2V5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMCkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gcmFuZG9tS2V5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFJhbmRvbUtleTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNvcnROb2Rlc0J5UG9zaXRpb24gfSBmcm9tIFwiLi9zb3J0Tm9kZXNCeVBvc2l0aW9uXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdldEJlZm9yZVN1ZmZpeCB9IGZyb20gXCIuL2dldEJlZm9yZVN1ZmZpeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZW5lcmF0ZVJhbmRvbUlEIH0gZnJvbSBcIi4vZ2VuZXJhdGVSYW5kb21JRFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBkb3dubG9hZEpTT04gfSBmcm9tIFwiLi9kb3dubG9hZEpTT05cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0UmFuZG9tS2V5IH0gZnJvbSBcIi4vZ2V0UmFuZG9tS2V5XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNoZWNrQW5kVXBkYXRlU3RydWN0dXJlIH0gZnJvbSBcIi4vY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmVcIjtcbiIsImxldCBsb2dTdHlsZXMgPSBcImJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMnB4IDRweDtcIjtcbmxldCBsb2dUaW1lID0gODAwO1xuY29uc3QgbG9nID0ge1xuICAgIHN1Y2Nlc3M6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDI1NSwgMTM2LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDwn46JICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyMDQsIDI1NSwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pyFICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG5ldXRyYWw6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHdhcm46ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTIzLCAwLCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDimKLvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwwLDAsMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4puU77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGN1c3RvbTogKGVtb2ppLCB0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7ZW1vaml9ICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9nO1xuIiwiY29uc3Qgc29ydE5vZGVzQnlQb3NpdGlvbiA9IG5vZGVzID0+IHtcbiAgICB2YXIgcmVzdWx0ID0gbm9kZXMubWFwKHggPT4geCk7XG4gICAgcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQueCAtIG5leHQueDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IGN1cnJlbnQueSAtIG5leHQueSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ydE5vZGVzQnlQb3NpdGlvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=