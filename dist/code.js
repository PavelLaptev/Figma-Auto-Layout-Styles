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

figma.showUI(__html__, { width: 360, height: 500 });
const setCompositionProps = (frame, data) => {
    frame.name = `${data.hookName}`;
    frame.paddingTop = data.space.top;
    frame.paddingRight = data.space.right;
    frame.paddingBottom = data.space.bottom;
    frame.paddingLeft = data.space.left;
    frame.itemSpacing = data.space.between;
};
figma.ui.onmessage = async (msg) => {
    let node = figma.currentPage.selection;
    if (msg.type === "apply-composition") {
        console.log(msg.data);
        if (node.length > 1) {
            let parentConteiner = node[0].parent;
            let frame = figma.createFrame();
            const group = figma.group(node, parentConteiner);
            frame.x = group.x;
            frame.y = group.y;
            frame.layoutMode = "VERTICAL";
            frame.backgrounds = [];
            frame.resize(group.width, group.height);
            frame.primaryAxisSizingMode = "AUTO";
            setCompositionProps(frame, msg.data);
            let sortedNodes = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortNodesByPosition"])(node);
            sortedNodes.map(item => {
                frame.appendChild(item);
            });
            parentConteiner.appendChild(frame);
            figma.currentPage.selection = [frame];
        }
        else if (node.length === 1 && node[0].type === "FRAME") {
            if (node[0].layoutMode === "VERTICAL") {
                let frame = node[0];
                frame.primaryAxisSizingMode = "AUTO";
                setCompositionProps(frame, msg.data);
            }
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].error("Please select at least two blocks");
        }
    }
    if (msg.type === "update-all") {
        _utils__WEBPACK_IMPORTED_MODULE_0__["log"].success("Updating all compositions");
        let allPages = figma.root.children;
        allPages.map(page => {
            msg.data.compositions.map(compositionData => {
                let compositions = page.findAll(n => n.name === compositionData.hookName);
                compositions.map(compositionFrame => {
                    setCompositionProps(compositionFrame, compositionData);
                });
            });
        });
    }
};


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
    success: (text, show = true) => {
        show
            ? console.log(`%c${text}`, `background: rgba(0, 255, 136, 0.14);${logStyles}`)
            : false;
        figma.notify(`🎉 ${text}`, {
            timeout: logTime
        });
    },
    check: (text, show = true) => {
        show
            ? console.log(`%c${text}`, `background: rgba(0, 204, 255, 0.14);${logStyles}`)
            : false;
        figma.notify(`✅ ${text}`, {
            timeout: logTime
        });
    },
    neutral: (text, show = true) => {
        show
            ? console.log(`%c${text}`, `background: rgba(128, 128, 128, 0.14);${logStyles}`)
            : false;
        figma.notify(`${text}`, {
            timeout: logTime
        });
    },
    warn: (text, show = true) => {
        show
            ? console.log(`%c${text}`, `background: rgba(255, 123, 0, 0.14);${logStyles}`)
            : false;
        figma.notify(`☢️ ${text}`, {
            timeout: logTime
        });
    },
    error: (text, show = true) => {
        show
            ? console.log(`%c${text}`, `background: rgba(255,0,0,0.14);${logStyles}`)
            : false;
        figma.notify(`⛔️ ${text}`, {
            timeout: logTime
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kb3dubG9hZEpTT04udHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZW5lcmF0ZVJhbmRvbUlELnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0QmVmb3JlU3VmZml4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0UmFuZG9tS2V5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9sb2cudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9zb3J0Tm9kZXNCeVBvc2l0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7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d0JBQXdCLEtBQUs7QUFDN0I7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSyx3Q0FBd0MsRUFBRSxVQUFVO0FBQ3hGO0FBQ0EsMkJBQTJCLEtBQUs7QUFDaEM7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSyxtQ0FBbUMsRUFBRSxVQUFVO0FBQ25GO0FBQ0EsMkJBQTJCLEtBQUs7QUFDaEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNlLGtFQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM1Q25CO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNlLGtGQUFtQixFQUFDIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsImltcG9ydCB7IGxvZywgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuLi91dGlsc1wiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzNjAsIGhlaWdodDogNTAwIH0pO1xuY29uc3Qgc2V0Q29tcG9zaXRpb25Qcm9wcyA9IChmcmFtZSwgZGF0YSkgPT4ge1xuICAgIGZyYW1lLm5hbWUgPSBgJHtkYXRhLmhvb2tOYW1lfWA7XG4gICAgZnJhbWUucGFkZGluZ1RvcCA9IGRhdGEuc3BhY2UudG9wO1xuICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IGRhdGEuc3BhY2UucmlnaHQ7XG4gICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IGRhdGEuc3BhY2UuYm90dG9tO1xuICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gZGF0YS5zcGFjZS5sZWZ0O1xuICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gZGF0YS5zcGFjZS5iZXR3ZWVuO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IGFzeW5jIChtc2cpID0+IHtcbiAgICBsZXQgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiYXBwbHktY29tcG9zaXRpb25cIikge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cuZGF0YSk7XG4gICAgICAgIGlmIChub2RlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRDb250ZWluZXIgPSBub2RlWzBdLnBhcmVudDtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKG5vZGUsIHBhcmVudENvbnRlaW5lcik7XG4gICAgICAgICAgICBmcmFtZS54ID0gZ3JvdXAueDtcbiAgICAgICAgICAgIGZyYW1lLnkgPSBncm91cC55O1xuICAgICAgICAgICAgZnJhbWUubGF5b3V0TW9kZSA9IFwiVkVSVElDQUxcIjtcbiAgICAgICAgICAgIGZyYW1lLmJhY2tncm91bmRzID0gW107XG4gICAgICAgICAgICBmcmFtZS5yZXNpemUoZ3JvdXAud2lkdGgsIGdyb3VwLmhlaWdodCk7XG4gICAgICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICAgICAgICAgIHNldENvbXBvc2l0aW9uUHJvcHMoZnJhbWUsIG1zZy5kYXRhKTtcbiAgICAgICAgICAgIGxldCBzb3J0ZWROb2RlcyA9IHNvcnROb2Rlc0J5UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzb3J0ZWROb2Rlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhcmVudENvbnRlaW5lci5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbZnJhbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gXCJGUkFNRVwiKSB7XG4gICAgICAgICAgICBpZiAobm9kZVswXS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWUgPSBub2RlWzBdO1xuICAgICAgICAgICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgICAgIHNldENvbXBvc2l0aW9uUHJvcHMoZnJhbWUsIG1zZy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihcIlBsZWFzZSBzZWxlY3QgYXQgbGVhc3QgdHdvIGJsb2Nrc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwidXBkYXRlLWFsbFwiKSB7XG4gICAgICAgIGxvZy5zdWNjZXNzKFwiVXBkYXRpbmcgYWxsIGNvbXBvc2l0aW9uc1wiKTtcbiAgICAgICAgbGV0IGFsbFBhZ2VzID0gZmlnbWEucm9vdC5jaGlsZHJlbjtcbiAgICAgICAgYWxsUGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgICAgICAgbXNnLmRhdGEuY29tcG9zaXRpb25zLm1hcChjb21wb3NpdGlvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb3NpdGlvbnMgPSBwYWdlLmZpbmRBbGwobiA9PiBuLm5hbWUgPT09IGNvbXBvc2l0aW9uRGF0YS5ob29rTmFtZSk7XG4gICAgICAgICAgICAgICAgY29tcG9zaXRpb25zLm1hcChjb21wb3NpdGlvbkZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29tcG9zaXRpb25Qcm9wcyhjb21wb3NpdGlvbkZyYW1lLCBjb21wb3NpdGlvbkRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJjb25zdCBkb3dubG9hZCA9IChjb250ZW50LCBmaWxlTmFtZSwgY29udGVudFR5cGUpID0+IHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHZhciBmaWxlID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIDIpXSwge1xuICAgICAgICB0eXBlOiBjb250ZW50VHlwZVxuICAgIH0pO1xuICAgIGEuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIGEuY2xpY2soKTtcbn07XG5leHBvcnQgZGVmYXVsdCBkb3dubG9hZDtcbiIsInZhciBlbW9qaXMgPSBbXG4gICAgXCLwn5C6XCIsXG4gICAgXCLwn5CxXCIsXG4gICAgXCLwn5CtXCIsXG4gICAgXCLwn5C5XCIsXG4gICAgXCLwn5CwXCIsXG4gICAgXCLwn5C4XCIsXG4gICAgXCLwn5CvXCIsXG4gICAgXCLwn5CoXCIsXG4gICAgXCLwn5C7XCIsXG4gICAgXCLwn5C3XCIsXG4gICAgXCLwn5C9XCIsXG4gICAgXCLwn5CuXCIsXG4gICAgXCLwn5CXXCIsXG4gICAgXCLwn5C1XCIsXG4gICAgXCLwn5CSXCIsXG4gICAgXCLwn5C0XCIsXG4gICAgXCLwn5CRXCIsXG4gICAgXCLwn5CYXCIsXG4gICAgXCLwn5C8XCIsXG4gICAgXCLwn5CnXCIsXG4gICAgXCLwn5CmXCIsXG4gICAgXCLwn5CkXCIsXG4gICAgXCLwn5ClXCIsXG4gICAgXCLwn5CjXCIsXG4gICAgXCLwn5CUXCIsXG4gICAgXCLwn5CNXCIsXG4gICAgXCLwn5CiXCIsXG4gICAgXCLwn5CbXCIsXG4gICAgXCLwn5CdXCIsXG4gICAgXCLwn5CcXCIsXG4gICAgXCLwn5CeXCIsXG4gICAgXCLwn5CMXCIsXG4gICAgXCLwn5CZXCIsXG4gICAgXCLwn5CaXCIsXG4gICAgXCLwn5CgXCIsXG4gICAgXCLwn5CfXCIsXG4gICAgXCLwn5CsXCIsXG4gICAgXCLwn5CzXCIsXG4gICAgXCLwn5CLXCIsXG4gICAgXCLwn5CEXCIsXG4gICAgXCLwn5CPXCIsXG4gICAgXCLwn5CAXCIsXG4gICAgXCLwn5CDXCIsXG4gICAgXCLwn5CFXCIsXG4gICAgXCLwn5CHXCIsXG4gICAgXCLwn5CJXCIsXG4gICAgXCLwn5COXCIsXG4gICAgXCLwn5CQXCIsXG4gICAgXCLwn5CTXCIsXG4gICAgXCLwn5CVXCIsXG4gICAgXCLwn5CWXCIsXG4gICAgXCLwn5CBXCIsXG4gICAgXCLwn5CCXCIsXG4gICAgXCLwn5CyXCIsXG4gICAgXCLwn5ChXCIsXG4gICAgXCLwn5CKXCIsXG4gICAgXCLwn5CrXCIsXG4gICAgXCLwn5CqXCIsXG4gICAgXCLwn5CGXCIsXG4gICAgXCLwn5CIXCIsXG4gICAgXCLwn5CpXCIsXG4gICAgXCLwn5C+XCIsXG4gICAgXCLwn5KQXCIsXG4gICAgXCLwn4y4XCIsXG4gICAgXCLwn4y3XCIsXG4gICAgXCLwn42AXCIsXG4gICAgXCLwn4y5XCIsXG4gICAgXCLwn4y7XCIsXG4gICAgXCLwn4y6XCIsXG4gICAgXCLwn42BXCIsXG4gICAgXCLwn42DXCIsXG4gICAgXCLwn42CXCIsXG4gICAgXCLwn4y/XCIsXG4gICAgXCLwn4y+XCIsXG4gICAgXCLwn42EXCIsXG4gICAgXCLwn4y1XCIsXG4gICAgXCLwn4y0XCIsXG4gICAgXCLwn4yyXCIsXG4gICAgXCLwn4yzXCIsXG4gICAgXCLwn4+IXCIsXG4gICAgXCLwn4+AXCIsXG4gICAgXCLimr1cIixcbiAgICBcIuKavlwiLFxuICAgIFwi8J+OvlwiLFxuICAgIFwi8J+OsVwiLFxuICAgIFwi8J+NulwiLFxuICAgIFwi8J+Nu1wiLFxuICAgIFwi8J+NuFwiLFxuICAgIFwi8J+NuVwiLFxuICAgIFwi8J+Nt1wiLFxuICAgIFwi8J+NtFwiLFxuICAgIFwi8J+NlVwiLFxuICAgIFwi8J+NlFwiLFxuICAgIFwi8J+Nn1wiLFxuICAgIFwi8J+Nl1wiLFxuICAgIFwi8J+NllwiLFxuICAgIFwi8J+NnVwiLFxuICAgIFwi8J+Nm1wiLFxuICAgIFwi8J+NpFwiLFxuICAgIFwi8J+NsVwiLFxuICAgIFwi8J+No1wiLFxuICAgIFwi8J+NpVwiLFxuICAgIFwi8J+NmVwiLFxuICAgIFwi8J+NmFwiLFxuICAgIFwi8J+NmlwiLFxuICAgIFwi8J+NnFwiLFxuICAgIFwi8J+NslwiLFxuICAgIFwi8J+NolwiLFxuICAgIFwi8J+NoVwiLFxuICAgIFwi8J+Ns1wiLFxuICAgIFwi8J+NnlwiLFxuICAgIFwi8J+NqVwiLFxuICAgIFwi8J+NrlwiLFxuICAgIFwi8J+NplwiLFxuICAgIFwi8J+NqFwiLFxuICAgIFwi8J+Np1wiLFxuICAgIFwi8J+OglwiLFxuICAgIFwi8J+NsFwiLFxuICAgIFwi8J+NqlwiLFxuICAgIFwi8J+Nq1wiLFxuICAgIFwi8J+NrFwiLFxuICAgIFwi8J+NrVwiLFxuICAgIFwi8J+Nr1wiLFxuICAgIFwi8J+NjlwiLFxuICAgIFwi8J+Nj1wiLFxuICAgIFwi8J+NilwiLFxuICAgIFwi8J+Ni1wiLFxuICAgIFwi8J+NklwiLFxuICAgIFwi8J+Nh1wiLFxuICAgIFwi8J+NiVwiLFxuICAgIFwi8J+Nk1wiLFxuICAgIFwi8J+NkVwiLFxuICAgIFwi8J+NiFwiLFxuICAgIFwi8J+NjFwiLFxuICAgIFwi8J+NkFwiLFxuICAgIFwi8J+NjVwiLFxuICAgIFwi8J+NoFwiLFxuICAgIFwi8J+NhlwiLFxuICAgIFwi8J+NhVwiLFxuICAgIFwi8J+MvVwiXG5dO1xuY29uc3QgZ2VuZXJhdGVSYW5kb21JRCA9ICgpID0+IHtcbiAgICBsZXQgcmFuZG9tRW1vamkgPSBlbW9qaXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamlzLmxlbmd0aCldO1xuICAgIGxldCByYW5kb21JRCA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAuc2xpY2UoLTQpO1xuICAgIHJldHVybiBgJHtyYW5kb21FbW9qaX0ke3JhbmRvbUlEfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVSYW5kb21JRDtcbiIsImNvbnN0IGdldEJlZm9yZVN1ZmZpeCA9IChzdHIsIGNoZWNrU3ltYm9sKSA9PiB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgc3RyLmluZGV4T2YoY2hlY2tTeW1ib2wpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRCZWZvcmVTdWZmaXg7XG4iLCJjb25zdCBnZXRSYW5kb21LZXkgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tS2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDApLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHJhbmRvbUtleTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRSYW5kb21LZXk7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzb3J0Tm9kZXNCeVBvc2l0aW9uIH0gZnJvbSBcIi4vc29ydE5vZGVzQnlQb3NpdGlvblwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRCZWZvcmVTdWZmaXggfSBmcm9tIFwiLi9nZXRCZWZvcmVTdWZmaXhcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2VuZXJhdGVSYW5kb21JRCB9IGZyb20gXCIuL2dlbmVyYXRlUmFuZG9tSURcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZG93bmxvYWRKU09OIH0gZnJvbSBcIi4vZG93bmxvYWRKU09OXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdldFJhbmRvbUtleSB9IGZyb20gXCIuL2dldFJhbmRvbUtleVwiO1xuIiwibGV0IGxvZ1N0eWxlcyA9IFwiYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAycHggNHB4O1wiO1xubGV0IGxvZ1RpbWUgPSA4MDA7XG5jb25zdCBsb2cgPSB7XG4gICAgc3VjY2VzczogKHRleHQsIHNob3cgPSB0cnVlKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDI1NSwgMTM2LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDwn46JICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiBsb2dUaW1lXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2hlY2s6ICh0ZXh0LCBzaG93ID0gdHJ1ZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyMDQsIDI1NSwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pyFICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiBsb2dUaW1lXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgbmV1dHJhbDogKHRleHQsIHNob3cgPSB0cnVlKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiBsb2dUaW1lXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgd2FybjogKHRleHQsIHNob3cgPSB0cnVlKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTIzLCAwLCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDimKLvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IGxvZ1RpbWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogKHRleHQsIHNob3cgPSB0cnVlKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwwLDAsMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4puU77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiBsb2dUaW1lXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBsb2c7XG4iLCJjb25zdCBzb3J0Tm9kZXNCeVBvc2l0aW9uID0gbm9kZXMgPT4ge1xuICAgIHZhciByZXN1bHQgPSBub2Rlcy5tYXAoeCA9PiB4KTtcbiAgICByZXN1bHQuc29ydCgoY3VycmVudCwgbmV4dCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudC54IC0gbmV4dC54O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQuc29ydCgoY3VycmVudCwgbmV4dCkgPT4gY3VycmVudC55IC0gbmV4dC55KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb3J0Tm9kZXNCeVBvc2l0aW9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==