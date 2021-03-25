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


figma.showUI(__html__, { width: 340, height: 600 });
figma.ui.postMessage({
    type: _shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"],
    data: figma.root.getPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__["configStorageKey"])
});
let mySelection = figma.currentPage.selection;
mySelection.map(item => {
    console.log({
        counterAxisAlignItems: item.counterAxisAlignItems,
        counterAxisSizingMode: item.counterAxisSizingMode,
        primaryAxisSizingMode: item.primaryAxisSizingMode,
        primaryAxisAlignItems: item.primaryAxisAlignItems,
        paddingLeft: item.paddingLeft,
        paddingRight: item.paddingRight,
        paddingTop: item.paddingTop,
        paddingBottom: item.paddingBottom,
        itemSpacing: item.itemSpacing,
        layoutMode: item.layoutMode,
        layoutAlign: item.layoutAlign,
        constrainProportions: item.constrainProportions
    });
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
        msg.data.layouts.map(LayoutData => {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].success(`Updating all Layouts`, true, 2000);
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
    const randomKey = Math.floor(Math.random() * 10000000).toString();
    return randomKey;
};
/* harmony default export */ __webpack_exports__["default"] = (getRandomKey);


/***/ }),

/***/ "./src/utils/index.tsx":
/*!*****************************!*\
  !*** ./src/utils/index.tsx ***!
  \*****************************/
/*! exports provided: log, sortNodesByPosition, getBeforeSuffix, generateRandomID, downloadJSON, getRandomKey */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWFibGUvdmFyaWFibGVzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZG93bmxvYWRKU09OLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2VuZXJhdGVSYW5kb21JRC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2dldEJlZm9yZVN1ZmZpeC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2dldFJhbmRvbUtleS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvbG9nLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvc29ydE5vZGVzQnlQb3NpdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNE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Ozs7Ozs7Ozs7Ozs7QUNMekQ7QUFBQSxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDBCQUEwQixLQUFLO0FBQy9CO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssMENBQTBDLEVBQUUsVUFBVTtBQUMxRjtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssbUNBQW1DLEVBQUUsVUFBVTtBQUNuRjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDZSxrRUFBRyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDNUNuQjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDZSxrRkFBbUIsRUFBQyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGx1Z2luL2NvbnRyb2xsZXIudHNcIik7XG4iLCJpbXBvcnQgeyBsb2csIHNvcnROb2Rlc0J5UG9zaXRpb24gfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IGNvbmZpZ1N0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vc2hhcmVhYmxlL3ZhcmlhYmxlc1wiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzNDAsIGhlaWdodDogNjAwIH0pO1xuZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGU6IGNvbmZpZ1N0b3JhZ2VLZXksXG4gICAgZGF0YTogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZ1N0b3JhZ2VLZXkpXG59KTtcbmxldCBteVNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbm15U2VsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIGNvdW50ZXJBeGlzQWxpZ25JdGVtczogaXRlbS5jb3VudGVyQXhpc0FsaWduSXRlbXMsXG4gICAgICAgIGNvdW50ZXJBeGlzU2l6aW5nTW9kZTogaXRlbS5jb3VudGVyQXhpc1NpemluZ01vZGUsXG4gICAgICAgIHByaW1hcnlBeGlzU2l6aW5nTW9kZTogaXRlbS5wcmltYXJ5QXhpc1NpemluZ01vZGUsXG4gICAgICAgIHByaW1hcnlBeGlzQWxpZ25JdGVtczogaXRlbS5wcmltYXJ5QXhpc0FsaWduSXRlbXMsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiBpdGVtLnBhZGRpbmdMZWZ0LFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IGl0ZW0ucGFkZGluZ1JpZ2h0LFxuICAgICAgICBwYWRkaW5nVG9wOiBpdGVtLnBhZGRpbmdUb3AsXG4gICAgICAgIHBhZGRpbmdCb3R0b206IGl0ZW0ucGFkZGluZ0JvdHRvbSxcbiAgICAgICAgaXRlbVNwYWNpbmc6IGl0ZW0uaXRlbVNwYWNpbmcsXG4gICAgICAgIGxheW91dE1vZGU6IGl0ZW0ubGF5b3V0TW9kZSxcbiAgICAgICAgbGF5b3V0QWxpZ246IGl0ZW0ubGF5b3V0QWxpZ24sXG4gICAgICAgIGNvbnN0cmFpblByb3BvcnRpb25zOiBpdGVtLmNvbnN0cmFpblByb3BvcnRpb25zXG4gICAgfSk7XG59KTtcbmNvbnN0IHNldExheW91dFByb3BzID0gKGZyYW1lLCBkYXRhLCBza2lwQXhpc01vZGUgPSBmYWxzZSwgcmVuYW1lID0gdHJ1ZSkgPT4ge1xuICAgIGZyYW1lLm5hbWUgPSByZW5hbWUgPyBgJHtkYXRhLmhvb2tOYW1lfWAgOiBmcmFtZS5uYW1lO1xuICAgIGZyYW1lLmxheW91dE1vZGUgPSBkYXRhLmRpcmVjdGlvbjtcbiAgICBpZiAoIXNraXBBeGlzTW9kZSkge1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPVxuICAgICAgICAgICAgZGF0YS5kaXJlY3Rpb24gPT09IFwiSE9SSVpPTlRBTFwiID8gZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlIDogXCJBVVRPXCI7XG4gICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbiA9PT0gXCJWRVJUSUNBTFwiID8gZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlIDogXCJBVVRPXCI7XG4gICAgfVxuICAgIGZyYW1lLnBhZGRpbmdUb3AgPSBkYXRhLnNwYWNlLnRvcDtcbiAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSBkYXRhLnNwYWNlLnJpZ2h0O1xuICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSBkYXRhLnNwYWNlLmJvdHRvbTtcbiAgICBmcmFtZS5wYWRkaW5nTGVmdCA9IGRhdGEuc3BhY2UubGVmdDtcbiAgICBmcmFtZS5pdGVtU3BhY2luZyA9IGRhdGEuc3BhY2UuYmV0d2Vlbjtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBhc3luYyAobXNnKSA9PiB7XG4gICAgbGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKG1zZy50eXBlID09PSBcInJlY29yZC1jb25maWdcIikge1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkobXNnLmRhdGEpKTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcImFwcGx5LWxheW91dFwiKSB7XG4gICAgICAgIGlmIChub2RlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRDb250ZWluZXIgPSBub2RlWzBdLnBhcmVudDtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKG5vZGUsIHBhcmVudENvbnRlaW5lcik7XG4gICAgICAgICAgICBmcmFtZS54ID0gZ3JvdXAueDtcbiAgICAgICAgICAgIGZyYW1lLnkgPSBncm91cC55O1xuICAgICAgICAgICAgZnJhbWUuYmFja2dyb3VuZHMgPSBbXTtcbiAgICAgICAgICAgIGZyYW1lLnJlc2l6ZShncm91cC53aWR0aCwgZ3JvdXAuaGVpZ2h0KTtcbiAgICAgICAgICAgIHNldExheW91dFByb3BzKGZyYW1lLCBtc2cuZGF0YSk7XG4gICAgICAgICAgICBsZXQgc29ydGVkTm9kZXMgPSBzb3J0Tm9kZXNCeVBvc2l0aW9uKG5vZGUpO1xuICAgICAgICAgICAgc29ydGVkTm9kZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGZyYW1lLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXJlbnRDb250ZWluZXIuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW2ZyYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIkZSQU1FXCIpIHx8XG4gICAgICAgICAgICAobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIkNPTVBPTkVOVFwiKSkge1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gbm9kZVswXTtcbiAgICAgICAgICAgIHNldExheW91dFByb3BzKGZyYW1lLCBtc2cuZGF0YSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIklOU1RBTkNFXCIpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKFwiUGxlYXNlIHNlbGVjdCB0aGUgbWFzdGVyIGNvbXBvbmVudFwiLCB0cnVlLCA0MDAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihcIlBsZWFzZSBzZWxlY3QgYXQgbGVhc3QgdHdvIGJsb2Nrc1wiLCB0cnVlLCA0MDAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwidXBkYXRlLWFsbFwiKSB7XG4gICAgICAgIGxldCBwYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgICAgIG1zZy5kYXRhLmxheW91dHMubWFwKExheW91dERhdGEgPT4ge1xuICAgICAgICAgICAgbG9nLnN1Y2Nlc3MoYFVwZGF0aW5nIGFsbCBMYXlvdXRzYCwgdHJ1ZSwgMjAwMCk7XG4gICAgICAgICAgICBsZXQgbGF5b3V0cyA9IHBhZ2UuZmluZEFsbChuID0+IG4ubmFtZS5pbmNsdWRlcyhMYXlvdXREYXRhLmhvb2tOYW1lKSk7XG4gICAgICAgICAgICBpZiAobGF5b3V0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRzLm1hcChMYXlvdXRGcmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldExheW91dFByb3BzKExheW91dEZyYW1lLCBMYXlvdXREYXRhLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNvbmZpZ1N0b3JhZ2VLZXkgPSBcImxhc3QtY29uZmlnLXJlY29yZFwiO1xuIiwiY29uc3QgZG93bmxvYWQgPSAoY29udGVudCwgZmlsZU5hbWUsIGNvbnRlbnRUeXBlKSA9PiB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKV0sIHtcbiAgICAgICAgdHlwZTogY29udGVudFR5cGVcbiAgICB9KTtcbiAgICBhLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBhLmNsaWNrKCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQ7XG4iLCJ2YXIgZW1vamlzID0gW1xuICAgIFwi8J+QulwiLFxuICAgIFwi8J+QsVwiLFxuICAgIFwi8J+QrVwiLFxuICAgIFwi8J+QuVwiLFxuICAgIFwi8J+QsFwiLFxuICAgIFwi8J+QuFwiLFxuICAgIFwi8J+Qr1wiLFxuICAgIFwi8J+QqFwiLFxuICAgIFwi8J+Qu1wiLFxuICAgIFwi8J+Qt1wiLFxuICAgIFwi8J+QvVwiLFxuICAgIFwi8J+QrlwiLFxuICAgIFwi8J+Ql1wiLFxuICAgIFwi8J+QtVwiLFxuICAgIFwi8J+QklwiLFxuICAgIFwi8J+QtFwiLFxuICAgIFwi8J+QkVwiLFxuICAgIFwi8J+QmFwiLFxuICAgIFwi8J+QvFwiLFxuICAgIFwi8J+Qp1wiLFxuICAgIFwi8J+QplwiLFxuICAgIFwi8J+QpFwiLFxuICAgIFwi8J+QpVwiLFxuICAgIFwi8J+Qo1wiLFxuICAgIFwi8J+QlFwiLFxuICAgIFwi8J+QjVwiLFxuICAgIFwi8J+QolwiLFxuICAgIFwi8J+Qm1wiLFxuICAgIFwi8J+QnVwiLFxuICAgIFwi8J+QnFwiLFxuICAgIFwi8J+QnlwiLFxuICAgIFwi8J+QjFwiLFxuICAgIFwi8J+QmVwiLFxuICAgIFwi8J+QmlwiLFxuICAgIFwi8J+QoFwiLFxuICAgIFwi8J+Qn1wiLFxuICAgIFwi8J+QrFwiLFxuICAgIFwi8J+Qs1wiLFxuICAgIFwi8J+Qi1wiLFxuICAgIFwi8J+QhFwiLFxuICAgIFwi8J+Qj1wiLFxuICAgIFwi8J+QgFwiLFxuICAgIFwi8J+Qg1wiLFxuICAgIFwi8J+QhVwiLFxuICAgIFwi8J+Qh1wiLFxuICAgIFwi8J+QiVwiLFxuICAgIFwi8J+QjlwiLFxuICAgIFwi8J+QkFwiLFxuICAgIFwi8J+Qk1wiLFxuICAgIFwi8J+QlVwiLFxuICAgIFwi8J+QllwiLFxuICAgIFwi8J+QgVwiLFxuICAgIFwi8J+QglwiLFxuICAgIFwi8J+QslwiLFxuICAgIFwi8J+QoVwiLFxuICAgIFwi8J+QilwiLFxuICAgIFwi8J+Qq1wiLFxuICAgIFwi8J+QqlwiLFxuICAgIFwi8J+QhlwiLFxuICAgIFwi8J+QiFwiLFxuICAgIFwi8J+QqVwiLFxuICAgIFwi8J+QvlwiLFxuICAgIFwi8J+SkFwiLFxuICAgIFwi8J+MuFwiLFxuICAgIFwi8J+Mt1wiLFxuICAgIFwi8J+NgFwiLFxuICAgIFwi8J+MuVwiLFxuICAgIFwi8J+Mu1wiLFxuICAgIFwi8J+MulwiLFxuICAgIFwi8J+NgVwiLFxuICAgIFwi8J+Ng1wiLFxuICAgIFwi8J+NglwiLFxuICAgIFwi8J+Mv1wiLFxuICAgIFwi8J+MvlwiLFxuICAgIFwi8J+NhFwiLFxuICAgIFwi8J+MtVwiLFxuICAgIFwi8J+MtFwiLFxuICAgIFwi8J+MslwiLFxuICAgIFwi8J+Ms1wiLFxuICAgIFwi8J+PiFwiLFxuICAgIFwi8J+PgFwiLFxuICAgIFwi4pq9XCIsXG4gICAgXCLimr5cIixcbiAgICBcIvCfjr5cIixcbiAgICBcIvCfjrFcIixcbiAgICBcIvCfjbpcIixcbiAgICBcIvCfjbtcIixcbiAgICBcIvCfjbhcIixcbiAgICBcIvCfjblcIixcbiAgICBcIvCfjbdcIixcbiAgICBcIvCfjbRcIixcbiAgICBcIvCfjZVcIixcbiAgICBcIvCfjZRcIixcbiAgICBcIvCfjZ9cIixcbiAgICBcIvCfjZdcIixcbiAgICBcIvCfjZZcIixcbiAgICBcIvCfjZ1cIixcbiAgICBcIvCfjZtcIixcbiAgICBcIvCfjaRcIixcbiAgICBcIvCfjbFcIixcbiAgICBcIvCfjaNcIixcbiAgICBcIvCfjaVcIixcbiAgICBcIvCfjZlcIixcbiAgICBcIvCfjZhcIixcbiAgICBcIvCfjZpcIixcbiAgICBcIvCfjZxcIixcbiAgICBcIvCfjbJcIixcbiAgICBcIvCfjaJcIixcbiAgICBcIvCfjaFcIixcbiAgICBcIvCfjbNcIixcbiAgICBcIvCfjZ5cIixcbiAgICBcIvCfjalcIixcbiAgICBcIvCfja5cIixcbiAgICBcIvCfjaZcIixcbiAgICBcIvCfjahcIixcbiAgICBcIvCfjadcIixcbiAgICBcIvCfjoJcIixcbiAgICBcIvCfjbBcIixcbiAgICBcIvCfjapcIixcbiAgICBcIvCfjatcIixcbiAgICBcIvCfjaxcIixcbiAgICBcIvCfja1cIixcbiAgICBcIvCfja9cIixcbiAgICBcIvCfjY5cIixcbiAgICBcIvCfjY9cIixcbiAgICBcIvCfjYpcIixcbiAgICBcIvCfjYtcIixcbiAgICBcIvCfjZJcIixcbiAgICBcIvCfjYdcIixcbiAgICBcIvCfjYlcIixcbiAgICBcIvCfjZNcIixcbiAgICBcIvCfjZFcIixcbiAgICBcIvCfjYhcIixcbiAgICBcIvCfjYxcIixcbiAgICBcIvCfjZBcIixcbiAgICBcIvCfjY1cIixcbiAgICBcIvCfjaBcIixcbiAgICBcIvCfjYZcIixcbiAgICBcIvCfjYVcIixcbiAgICBcIvCfjL1cIlxuXTtcbmNvbnN0IGdlbmVyYXRlUmFuZG9tSUQgPSAoKSA9PiB7XG4gICAgbGV0IHJhbmRvbUVtb2ppID0gZW1vamlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppcy5sZW5ndGgpXTtcbiAgICBsZXQgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgLnNsaWNlKC00KTtcbiAgICByZXR1cm4gYCR7cmFuZG9tRW1vaml9JHtyYW5kb21JRH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlUmFuZG9tSUQ7XG4iLCJjb25zdCBnZXRCZWZvcmVTdWZmaXggPSAoc3RyLCBjaGVja1N5bWJvbCkgPT4ge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIHN0ci5pbmRleE9mKGNoZWNrU3ltYm9sKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0QmVmb3JlU3VmZml4O1xuIiwiY29uc3QgZ2V0UmFuZG9tS2V5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwKS50b1N0cmluZygpO1xuICAgIHJldHVybiByYW5kb21LZXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UmFuZG9tS2V5O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuL3NvcnROb2Rlc0J5UG9zaXRpb25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0QmVmb3JlU3VmZml4IH0gZnJvbSBcIi4vZ2V0QmVmb3JlU3VmZml4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdlbmVyYXRlUmFuZG9tSUQgfSBmcm9tIFwiLi9nZW5lcmF0ZVJhbmRvbUlEXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGRvd25sb2FkSlNPTiB9IGZyb20gXCIuL2Rvd25sb2FkSlNPTlwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRSYW5kb21LZXkgfSBmcm9tIFwiLi9nZXRSYW5kb21LZXlcIjtcbiIsImxldCBsb2dTdHlsZXMgPSBcImJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMnB4IDRweDtcIjtcbmxldCBsb2dUaW1lID0gODAwO1xuY29uc3QgbG9nID0ge1xuICAgIHN1Y2Nlc3M6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDI1NSwgMTM2LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDwn46JICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyMDQsIDI1NSwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pyFICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG5ldXRyYWw6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHdhcm46ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTIzLCAwLCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDimKLvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwwLDAsMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4puU77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9nO1xuIiwiY29uc3Qgc29ydE5vZGVzQnlQb3NpdGlvbiA9IG5vZGVzID0+IHtcbiAgICB2YXIgcmVzdWx0ID0gbm9kZXMubWFwKHggPT4geCk7XG4gICAgcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQueCAtIG5leHQueDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IGN1cnJlbnQueSAtIG5leHQueSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ydE5vZGVzQnlQb3NpdGlvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=