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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWFibGUvdmFyaWFibGVzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZG93bmxvYWRKU09OLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2VuZXJhdGVSYW5kb21JRC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2dldEJlZm9yZVN1ZmZpeC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2dldFJhbmRvbUtleS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvbG9nLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvc29ydE5vZGVzQnlQb3NpdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNE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eEY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLDBDQUEwQyxFQUFFLFVBQVU7QUFDMUY7QUFDQSx3QkFBd0IsS0FBSztBQUM3QjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLG1DQUFtQyxFQUFFLFVBQVU7QUFDbkY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ2Usa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQzVDbkI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ2Usa0ZBQW1CLEVBQUMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwiaW1wb3J0IHsgbG9nLCBzb3J0Tm9kZXNCeVBvc2l0aW9uIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBjb25maWdTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL3NoYXJlYWJsZS92YXJpYWJsZXNcIjtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB3aWR0aDogMzQwLCBoZWlnaHQ6IDYwMCB9KTtcbmZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICB0eXBlOiBjb25maWdTdG9yYWdlS2V5LFxuICAgIGRhdGE6IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShjb25maWdTdG9yYWdlS2V5KVxufSk7XG5jb25zdCBzZXRMYXlvdXRQcm9wcyA9IChmcmFtZSwgZGF0YSwgc2tpcEF4aXNNb2RlID0gZmFsc2UsIHJlbmFtZSA9IHRydWUpID0+IHtcbiAgICBmcmFtZS5uYW1lID0gcmVuYW1lID8gYCR7ZGF0YS5ob29rTmFtZX1gIDogZnJhbWUubmFtZTtcbiAgICBmcmFtZS5sYXlvdXRNb2RlID0gZGF0YS5kaXJlY3Rpb247XG4gICAgaWYgKCFza2lwQXhpc01vZGUpIHtcbiAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID1cbiAgICAgICAgICAgIGRhdGEuZGlyZWN0aW9uID09PSBcIkhPUklaT05UQUxcIiA/IGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA6IFwiQVVUT1wiO1xuICAgICAgICBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPVxuICAgICAgICAgICAgZGF0YS5kaXJlY3Rpb24gPT09IFwiVkVSVElDQUxcIiA/IGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA6IFwiQVVUT1wiO1xuICAgIH1cbiAgICBmcmFtZS5wYWRkaW5nVG9wID0gZGF0YS5zcGFjZS50b3A7XG4gICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gZGF0YS5zcGFjZS5yaWdodDtcbiAgICBmcmFtZS5wYWRkaW5nQm90dG9tID0gZGF0YS5zcGFjZS5ib3R0b207XG4gICAgZnJhbWUucGFkZGluZ0xlZnQgPSBkYXRhLnNwYWNlLmxlZnQ7XG4gICAgZnJhbWUuaXRlbVNwYWNpbmcgPSBkYXRhLnNwYWNlLmJldHdlZW47XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gYXN5bmMgKG1zZykgPT4ge1xuICAgIGxldCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWNvcmQtY29uZmlnXCIpIHtcbiAgICAgICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZ1N0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KG1zZy5kYXRhKSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJhcHBseS1sYXlvdXRcIikge1xuICAgICAgICBpZiAobm9kZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50Q29udGVpbmVyID0gbm9kZVswXS5wYXJlbnQ7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChub2RlLCBwYXJlbnRDb250ZWluZXIpO1xuICAgICAgICAgICAgZnJhbWUueCA9IGdyb3VwLng7XG4gICAgICAgICAgICBmcmFtZS55ID0gZ3JvdXAueTtcbiAgICAgICAgICAgIGZyYW1lLmJhY2tncm91bmRzID0gW107XG4gICAgICAgICAgICBmcmFtZS5yZXNpemUoZ3JvdXAud2lkdGgsIGdyb3VwLmhlaWdodCk7XG4gICAgICAgICAgICBzZXRMYXlvdXRQcm9wcyhmcmFtZSwgbXNnLmRhdGEpO1xuICAgICAgICAgICAgbGV0IHNvcnRlZE5vZGVzID0gc29ydE5vZGVzQnlQb3NpdGlvbihub2RlKTtcbiAgICAgICAgICAgIHNvcnRlZE5vZGVzLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFyZW50Q29udGVpbmVyLmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtmcmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gXCJGUkFNRVwiKSB8fFxuICAgICAgICAgICAgKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gXCJDT01QT05FTlRcIikpIHtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IG5vZGVbMF07XG4gICAgICAgICAgICBzZXRMYXlvdXRQcm9wcyhmcmFtZSwgbXNnLmRhdGEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gXCJJTlNUQU5DRVwiKSB7XG4gICAgICAgICAgICBsb2cud2FybihcIlBsZWFzZSBzZWxlY3QgdGhlIG1hc3RlciBjb21wb25lbnRcIiwgdHJ1ZSwgNDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IHR3byBibG9ja3NcIiwgdHJ1ZSwgNDAwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInVwZGF0ZS1hbGxcIikge1xuICAgICAgICBsZXQgcGFnZSA9IGZpZ21hLmN1cnJlbnRQYWdlO1xuICAgICAgICBtc2cuZGF0YS5sYXlvdXRzLm1hcChMYXlvdXREYXRhID0+IHtcbiAgICAgICAgICAgIGxvZy5zdWNjZXNzKGBVcGRhdGluZyBhbGwgTGF5b3V0c2AsIHRydWUsIDIwMDApO1xuICAgICAgICAgICAgbGV0IGxheW91dHMgPSBwYWdlLmZpbmRBbGwobiA9PiBuLm5hbWUuaW5jbHVkZXMoTGF5b3V0RGF0YS5ob29rTmFtZSkpO1xuICAgICAgICAgICAgaWYgKGxheW91dHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0cy5tYXAoTGF5b3V0RnJhbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRMYXlvdXRQcm9wcyhMYXlvdXRGcmFtZSwgTGF5b3V0RGF0YSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCBjb25zdCBjb25maWdTdG9yYWdlS2V5ID0gXCJsYXN0LWNvbmZpZy1yZWNvcmRcIjtcbiIsImNvbnN0IGRvd25sb2FkID0gKGNvbnRlbnQsIGZpbGVOYW1lLCBjb250ZW50VHlwZSkgPT4ge1xuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgMildLCB7XG4gICAgICAgIHR5cGU6IGNvbnRlbnRUeXBlXG4gICAgfSk7XG4gICAgYS5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICBhLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gICAgYS5jbGljaygpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRvd25sb2FkO1xuIiwidmFyIGVtb2ppcyA9IFtcbiAgICBcIvCfkLpcIixcbiAgICBcIvCfkLFcIixcbiAgICBcIvCfkK1cIixcbiAgICBcIvCfkLlcIixcbiAgICBcIvCfkLBcIixcbiAgICBcIvCfkLhcIixcbiAgICBcIvCfkK9cIixcbiAgICBcIvCfkKhcIixcbiAgICBcIvCfkLtcIixcbiAgICBcIvCfkLdcIixcbiAgICBcIvCfkL1cIixcbiAgICBcIvCfkK5cIixcbiAgICBcIvCfkJdcIixcbiAgICBcIvCfkLVcIixcbiAgICBcIvCfkJJcIixcbiAgICBcIvCfkLRcIixcbiAgICBcIvCfkJFcIixcbiAgICBcIvCfkJhcIixcbiAgICBcIvCfkLxcIixcbiAgICBcIvCfkKdcIixcbiAgICBcIvCfkKZcIixcbiAgICBcIvCfkKRcIixcbiAgICBcIvCfkKVcIixcbiAgICBcIvCfkKNcIixcbiAgICBcIvCfkJRcIixcbiAgICBcIvCfkI1cIixcbiAgICBcIvCfkKJcIixcbiAgICBcIvCfkJtcIixcbiAgICBcIvCfkJ1cIixcbiAgICBcIvCfkJxcIixcbiAgICBcIvCfkJ5cIixcbiAgICBcIvCfkIxcIixcbiAgICBcIvCfkJlcIixcbiAgICBcIvCfkJpcIixcbiAgICBcIvCfkKBcIixcbiAgICBcIvCfkJ9cIixcbiAgICBcIvCfkKxcIixcbiAgICBcIvCfkLNcIixcbiAgICBcIvCfkItcIixcbiAgICBcIvCfkIRcIixcbiAgICBcIvCfkI9cIixcbiAgICBcIvCfkIBcIixcbiAgICBcIvCfkINcIixcbiAgICBcIvCfkIVcIixcbiAgICBcIvCfkIdcIixcbiAgICBcIvCfkIlcIixcbiAgICBcIvCfkI5cIixcbiAgICBcIvCfkJBcIixcbiAgICBcIvCfkJNcIixcbiAgICBcIvCfkJVcIixcbiAgICBcIvCfkJZcIixcbiAgICBcIvCfkIFcIixcbiAgICBcIvCfkIJcIixcbiAgICBcIvCfkLJcIixcbiAgICBcIvCfkKFcIixcbiAgICBcIvCfkIpcIixcbiAgICBcIvCfkKtcIixcbiAgICBcIvCfkKpcIixcbiAgICBcIvCfkIZcIixcbiAgICBcIvCfkIhcIixcbiAgICBcIvCfkKlcIixcbiAgICBcIvCfkL5cIixcbiAgICBcIvCfkpBcIixcbiAgICBcIvCfjLhcIixcbiAgICBcIvCfjLdcIixcbiAgICBcIvCfjYBcIixcbiAgICBcIvCfjLlcIixcbiAgICBcIvCfjLtcIixcbiAgICBcIvCfjLpcIixcbiAgICBcIvCfjYFcIixcbiAgICBcIvCfjYNcIixcbiAgICBcIvCfjYJcIixcbiAgICBcIvCfjL9cIixcbiAgICBcIvCfjL5cIixcbiAgICBcIvCfjYRcIixcbiAgICBcIvCfjLVcIixcbiAgICBcIvCfjLRcIixcbiAgICBcIvCfjLJcIixcbiAgICBcIvCfjLNcIixcbiAgICBcIvCfj4hcIixcbiAgICBcIvCfj4BcIixcbiAgICBcIuKavVwiLFxuICAgIFwi4pq+XCIsXG4gICAgXCLwn46+XCIsXG4gICAgXCLwn46xXCIsXG4gICAgXCLwn426XCIsXG4gICAgXCLwn427XCIsXG4gICAgXCLwn424XCIsXG4gICAgXCLwn425XCIsXG4gICAgXCLwn423XCIsXG4gICAgXCLwn420XCIsXG4gICAgXCLwn42VXCIsXG4gICAgXCLwn42UXCIsXG4gICAgXCLwn42fXCIsXG4gICAgXCLwn42XXCIsXG4gICAgXCLwn42WXCIsXG4gICAgXCLwn42dXCIsXG4gICAgXCLwn42bXCIsXG4gICAgXCLwn42kXCIsXG4gICAgXCLwn42xXCIsXG4gICAgXCLwn42jXCIsXG4gICAgXCLwn42lXCIsXG4gICAgXCLwn42ZXCIsXG4gICAgXCLwn42YXCIsXG4gICAgXCLwn42aXCIsXG4gICAgXCLwn42cXCIsXG4gICAgXCLwn42yXCIsXG4gICAgXCLwn42iXCIsXG4gICAgXCLwn42hXCIsXG4gICAgXCLwn42zXCIsXG4gICAgXCLwn42eXCIsXG4gICAgXCLwn42pXCIsXG4gICAgXCLwn42uXCIsXG4gICAgXCLwn42mXCIsXG4gICAgXCLwn42oXCIsXG4gICAgXCLwn42nXCIsXG4gICAgXCLwn46CXCIsXG4gICAgXCLwn42wXCIsXG4gICAgXCLwn42qXCIsXG4gICAgXCLwn42rXCIsXG4gICAgXCLwn42sXCIsXG4gICAgXCLwn42tXCIsXG4gICAgXCLwn42vXCIsXG4gICAgXCLwn42OXCIsXG4gICAgXCLwn42PXCIsXG4gICAgXCLwn42KXCIsXG4gICAgXCLwn42LXCIsXG4gICAgXCLwn42SXCIsXG4gICAgXCLwn42HXCIsXG4gICAgXCLwn42JXCIsXG4gICAgXCLwn42TXCIsXG4gICAgXCLwn42RXCIsXG4gICAgXCLwn42IXCIsXG4gICAgXCLwn42MXCIsXG4gICAgXCLwn42QXCIsXG4gICAgXCLwn42NXCIsXG4gICAgXCLwn42gXCIsXG4gICAgXCLwn42GXCIsXG4gICAgXCLwn42FXCIsXG4gICAgXCLwn4y9XCJcbl07XG5jb25zdCBnZW5lcmF0ZVJhbmRvbUlEID0gKCkgPT4ge1xuICAgIGxldCByYW5kb21FbW9qaSA9IGVtb2ppc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaXMubGVuZ3RoKV07XG4gICAgbGV0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKVxuICAgICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAgIC5zbGljZSgtNCk7XG4gICAgcmV0dXJuIGAke3JhbmRvbUVtb2ppfSR7cmFuZG9tSUR9YDtcbn07XG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVJhbmRvbUlEO1xuIiwiY29uc3QgZ2V0QmVmb3JlU3VmZml4ID0gKHN0ciwgY2hlY2tTeW1ib2wpID0+IHtcbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBzdHIuaW5kZXhPZihjaGVja1N5bWJvbCkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEJlZm9yZVN1ZmZpeDtcbiIsImNvbnN0IGdldFJhbmRvbUtleSA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21LZXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMCkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gcmFuZG9tS2V5O1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldFJhbmRvbUtleTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNvcnROb2Rlc0J5UG9zaXRpb24gfSBmcm9tIFwiLi9zb3J0Tm9kZXNCeVBvc2l0aW9uXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdldEJlZm9yZVN1ZmZpeCB9IGZyb20gXCIuL2dldEJlZm9yZVN1ZmZpeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZW5lcmF0ZVJhbmRvbUlEIH0gZnJvbSBcIi4vZ2VuZXJhdGVSYW5kb21JRFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBkb3dubG9hZEpTT04gfSBmcm9tIFwiLi9kb3dubG9hZEpTT05cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0UmFuZG9tS2V5IH0gZnJvbSBcIi4vZ2V0UmFuZG9tS2V5XCI7XG4iLCJsZXQgbG9nU3R5bGVzID0gXCJib3JkZXItcmFkaXVzOiA0cHg7IHBhZGRpbmc6IDJweCA0cHg7XCI7XG5sZXQgbG9nVGltZSA9IDgwMDtcbmNvbnN0IGxvZyA9IHtcbiAgICBzdWNjZXNzOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyNTUsIDEzNiwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg8J+OiSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGVjazogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMCwgMjA0LCAyNTUsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKchSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBuZXV0cmFsOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXJuOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgyNTUsIDEyMywgMCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pii77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgyNTUsMCwwLDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKblO+4jyAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvZztcbiIsImNvbnN0IHNvcnROb2Rlc0J5UG9zaXRpb24gPSBub2RlcyA9PiB7XG4gICAgdmFyIHJlc3VsdCA9IG5vZGVzLm1hcCh4ID0+IHgpO1xuICAgIHJlc3VsdC5zb3J0KChjdXJyZW50LCBuZXh0KSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50LnggLSBuZXh0Lng7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdC5zb3J0KChjdXJyZW50LCBuZXh0KSA9PiBjdXJyZW50LnkgLSBuZXh0LnkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHNvcnROb2Rlc0J5UG9zaXRpb247XG4iXSwic291cmNlUm9vdCI6IiJ9