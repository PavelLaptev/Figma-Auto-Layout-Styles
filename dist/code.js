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

figma.showUI(__html__, { width: 360, height: 600 });
const setCompositionProps = (frame, data, skipAxisMode = false) => {
    frame.name = `${data.hookName}`;
    frame.layoutMode = data.direction;
    if (!skipAxisMode) {
        frame.primaryAxisSizingMode =
            data.direction === "HORIZONTAL" ? "FIXED" : "AUTO";
        frame.counterAxisSizingMode =
            data.direction === "VERTICAL" ? "FIXED" : "AUTO";
    }
    frame.paddingTop = data.space.top;
    frame.paddingRight = data.space.right;
    frame.paddingBottom = data.space.bottom;
    frame.paddingLeft = data.space.left;
    frame.itemSpacing = data.space.between;
};
figma.ui.onmessage = async (msg) => {
    let node = figma.currentPage.selection;
    if (msg.type === "apply-composition") {
        if (node.length > 1) {
            let parentConteiner = node[0].parent;
            let frame = figma.createFrame();
            const group = figma.group(node, parentConteiner);
            frame.x = group.x;
            frame.y = group.y;
            frame.backgrounds = [];
            frame.resize(group.width, group.height);
            setCompositionProps(frame, msg.data);
            let sortedNodes = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortNodesByPosition"])(node);
            sortedNodes.map(item => {
                console.log(item.width);
                frame.appendChild(item);
            });
            parentConteiner.appendChild(frame);
            figma.currentPage.selection = [frame];
        }
        else if (node.length === 1 && node[0].type === "FRAME") {
            if (node[0].layoutMode !== "NONE") {
                let frame = node[0];
                setCompositionProps(frame, msg.data, true);
            }
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].error("Please select at least two blocks");
        }
    }
    if (msg.type === "update-all") {
        let page = figma.currentPage;
        msg.data.compositions.map(compositionData => {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].success(`Updating all compositions`);
            let compositions = page.findAll(n => n.name === compositionData.hookName);
            if (compositions.length !== 0) {
                compositions.map(compositionFrame => {
                    setCompositionProps(compositionFrame, compositionData);
                });
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kb3dubG9hZEpTT04udHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZW5lcmF0ZVJhbmRvbUlELnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0QmVmb3JlU3VmZml4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0UmFuZG9tS2V5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9sb2cudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9zb3J0Tm9kZXNCeVBvc2l0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7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QUFVO0FBQzFGO0FBQ0Esd0JBQXdCLEtBQUs7QUFDN0I7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSyx3Q0FBd0MsRUFBRSxVQUFVO0FBQ3hGO0FBQ0EsMkJBQTJCLEtBQUs7QUFDaEM7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSyxtQ0FBbUMsRUFBRSxVQUFVO0FBQ25GO0FBQ0EsMkJBQTJCLEtBQUs7QUFDaEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNlLGtFQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM1Q25CO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNlLGtGQUFtQixFQUFDIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsImltcG9ydCB7IGxvZywgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuLi91dGlsc1wiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzNjAsIGhlaWdodDogNjAwIH0pO1xuY29uc3Qgc2V0Q29tcG9zaXRpb25Qcm9wcyA9IChmcmFtZSwgZGF0YSwgc2tpcEF4aXNNb2RlID0gZmFsc2UpID0+IHtcbiAgICBmcmFtZS5uYW1lID0gYCR7ZGF0YS5ob29rTmFtZX1gO1xuICAgIGZyYW1lLmxheW91dE1vZGUgPSBkYXRhLmRpcmVjdGlvbjtcbiAgICBpZiAoIXNraXBBeGlzTW9kZSkge1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPVxuICAgICAgICAgICAgZGF0YS5kaXJlY3Rpb24gPT09IFwiSE9SSVpPTlRBTFwiID8gXCJGSVhFRFwiIDogXCJBVVRPXCI7XG4gICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbiA9PT0gXCJWRVJUSUNBTFwiID8gXCJGSVhFRFwiIDogXCJBVVRPXCI7XG4gICAgfVxuICAgIGZyYW1lLnBhZGRpbmdUb3AgPSBkYXRhLnNwYWNlLnRvcDtcbiAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSBkYXRhLnNwYWNlLnJpZ2h0O1xuICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSBkYXRhLnNwYWNlLmJvdHRvbTtcbiAgICBmcmFtZS5wYWRkaW5nTGVmdCA9IGRhdGEuc3BhY2UubGVmdDtcbiAgICBmcmFtZS5pdGVtU3BhY2luZyA9IGRhdGEuc3BhY2UuYmV0d2Vlbjtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBhc3luYyAobXNnKSA9PiB7XG4gICAgbGV0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKG1zZy50eXBlID09PSBcImFwcGx5LWNvbXBvc2l0aW9uXCIpIHtcbiAgICAgICAgaWYgKG5vZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudENvbnRlaW5lciA9IG5vZGVbMF0ucGFyZW50O1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAobm9kZSwgcGFyZW50Q29udGVpbmVyKTtcbiAgICAgICAgICAgIGZyYW1lLnggPSBncm91cC54O1xuICAgICAgICAgICAgZnJhbWUueSA9IGdyb3VwLnk7XG4gICAgICAgICAgICBmcmFtZS5iYWNrZ3JvdW5kcyA9IFtdO1xuICAgICAgICAgICAgZnJhbWUucmVzaXplKGdyb3VwLndpZHRoLCBncm91cC5oZWlnaHQpO1xuICAgICAgICAgICAgc2V0Q29tcG9zaXRpb25Qcm9wcyhmcmFtZSwgbXNnLmRhdGEpO1xuICAgICAgICAgICAgbGV0IHNvcnRlZE5vZGVzID0gc29ydE5vZGVzQnlQb3NpdGlvbihub2RlKTtcbiAgICAgICAgICAgIHNvcnRlZE5vZGVzLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLndpZHRoKTtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFyZW50Q29udGVpbmVyLmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtmcmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIkZSQU1FXCIpIHtcbiAgICAgICAgICAgIGlmIChub2RlWzBdLmxheW91dE1vZGUgIT09IFwiTk9ORVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZyYW1lID0gbm9kZVswXTtcbiAgICAgICAgICAgICAgICBzZXRDb21wb3NpdGlvblByb3BzKGZyYW1lLCBtc2cuZGF0YSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IHR3byBibG9ja3NcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInVwZGF0ZS1hbGxcIikge1xuICAgICAgICBsZXQgcGFnZSA9IGZpZ21hLmN1cnJlbnRQYWdlO1xuICAgICAgICBtc2cuZGF0YS5jb21wb3NpdGlvbnMubWFwKGNvbXBvc2l0aW9uRGF0YSA9PiB7XG4gICAgICAgICAgICBsb2cuc3VjY2VzcyhgVXBkYXRpbmcgYWxsIGNvbXBvc2l0aW9uc2ApO1xuICAgICAgICAgICAgbGV0IGNvbXBvc2l0aW9ucyA9IHBhZ2UuZmluZEFsbChuID0+IG4ubmFtZSA9PT0gY29tcG9zaXRpb25EYXRhLmhvb2tOYW1lKTtcbiAgICAgICAgICAgIGlmIChjb21wb3NpdGlvbnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zaXRpb25zLm1hcChjb21wb3NpdGlvbkZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29tcG9zaXRpb25Qcm9wcyhjb21wb3NpdGlvbkZyYW1lLCBjb21wb3NpdGlvbkRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiY29uc3QgZG93bmxvYWQgPSAoY29udGVudCwgZmlsZU5hbWUsIGNvbnRlbnRUeXBlKSA9PiB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKV0sIHtcbiAgICAgICAgdHlwZTogY29udGVudFR5cGVcbiAgICB9KTtcbiAgICBhLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBhLmNsaWNrKCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQ7XG4iLCJ2YXIgZW1vamlzID0gW1xuICAgIFwi8J+QulwiLFxuICAgIFwi8J+QsVwiLFxuICAgIFwi8J+QrVwiLFxuICAgIFwi8J+QuVwiLFxuICAgIFwi8J+QsFwiLFxuICAgIFwi8J+QuFwiLFxuICAgIFwi8J+Qr1wiLFxuICAgIFwi8J+QqFwiLFxuICAgIFwi8J+Qu1wiLFxuICAgIFwi8J+Qt1wiLFxuICAgIFwi8J+QvVwiLFxuICAgIFwi8J+QrlwiLFxuICAgIFwi8J+Ql1wiLFxuICAgIFwi8J+QtVwiLFxuICAgIFwi8J+QklwiLFxuICAgIFwi8J+QtFwiLFxuICAgIFwi8J+QkVwiLFxuICAgIFwi8J+QmFwiLFxuICAgIFwi8J+QvFwiLFxuICAgIFwi8J+Qp1wiLFxuICAgIFwi8J+QplwiLFxuICAgIFwi8J+QpFwiLFxuICAgIFwi8J+QpVwiLFxuICAgIFwi8J+Qo1wiLFxuICAgIFwi8J+QlFwiLFxuICAgIFwi8J+QjVwiLFxuICAgIFwi8J+QolwiLFxuICAgIFwi8J+Qm1wiLFxuICAgIFwi8J+QnVwiLFxuICAgIFwi8J+QnFwiLFxuICAgIFwi8J+QnlwiLFxuICAgIFwi8J+QjFwiLFxuICAgIFwi8J+QmVwiLFxuICAgIFwi8J+QmlwiLFxuICAgIFwi8J+QoFwiLFxuICAgIFwi8J+Qn1wiLFxuICAgIFwi8J+QrFwiLFxuICAgIFwi8J+Qs1wiLFxuICAgIFwi8J+Qi1wiLFxuICAgIFwi8J+QhFwiLFxuICAgIFwi8J+Qj1wiLFxuICAgIFwi8J+QgFwiLFxuICAgIFwi8J+Qg1wiLFxuICAgIFwi8J+QhVwiLFxuICAgIFwi8J+Qh1wiLFxuICAgIFwi8J+QiVwiLFxuICAgIFwi8J+QjlwiLFxuICAgIFwi8J+QkFwiLFxuICAgIFwi8J+Qk1wiLFxuICAgIFwi8J+QlVwiLFxuICAgIFwi8J+QllwiLFxuICAgIFwi8J+QgVwiLFxuICAgIFwi8J+QglwiLFxuICAgIFwi8J+QslwiLFxuICAgIFwi8J+QoVwiLFxuICAgIFwi8J+QilwiLFxuICAgIFwi8J+Qq1wiLFxuICAgIFwi8J+QqlwiLFxuICAgIFwi8J+QhlwiLFxuICAgIFwi8J+QiFwiLFxuICAgIFwi8J+QqVwiLFxuICAgIFwi8J+QvlwiLFxuICAgIFwi8J+SkFwiLFxuICAgIFwi8J+MuFwiLFxuICAgIFwi8J+Mt1wiLFxuICAgIFwi8J+NgFwiLFxuICAgIFwi8J+MuVwiLFxuICAgIFwi8J+Mu1wiLFxuICAgIFwi8J+MulwiLFxuICAgIFwi8J+NgVwiLFxuICAgIFwi8J+Ng1wiLFxuICAgIFwi8J+NglwiLFxuICAgIFwi8J+Mv1wiLFxuICAgIFwi8J+MvlwiLFxuICAgIFwi8J+NhFwiLFxuICAgIFwi8J+MtVwiLFxuICAgIFwi8J+MtFwiLFxuICAgIFwi8J+MslwiLFxuICAgIFwi8J+Ms1wiLFxuICAgIFwi8J+PiFwiLFxuICAgIFwi8J+PgFwiLFxuICAgIFwi4pq9XCIsXG4gICAgXCLimr5cIixcbiAgICBcIvCfjr5cIixcbiAgICBcIvCfjrFcIixcbiAgICBcIvCfjbpcIixcbiAgICBcIvCfjbtcIixcbiAgICBcIvCfjbhcIixcbiAgICBcIvCfjblcIixcbiAgICBcIvCfjbdcIixcbiAgICBcIvCfjbRcIixcbiAgICBcIvCfjZVcIixcbiAgICBcIvCfjZRcIixcbiAgICBcIvCfjZ9cIixcbiAgICBcIvCfjZdcIixcbiAgICBcIvCfjZZcIixcbiAgICBcIvCfjZ1cIixcbiAgICBcIvCfjZtcIixcbiAgICBcIvCfjaRcIixcbiAgICBcIvCfjbFcIixcbiAgICBcIvCfjaNcIixcbiAgICBcIvCfjaVcIixcbiAgICBcIvCfjZlcIixcbiAgICBcIvCfjZhcIixcbiAgICBcIvCfjZpcIixcbiAgICBcIvCfjZxcIixcbiAgICBcIvCfjbJcIixcbiAgICBcIvCfjaJcIixcbiAgICBcIvCfjaFcIixcbiAgICBcIvCfjbNcIixcbiAgICBcIvCfjZ5cIixcbiAgICBcIvCfjalcIixcbiAgICBcIvCfja5cIixcbiAgICBcIvCfjaZcIixcbiAgICBcIvCfjahcIixcbiAgICBcIvCfjadcIixcbiAgICBcIvCfjoJcIixcbiAgICBcIvCfjbBcIixcbiAgICBcIvCfjapcIixcbiAgICBcIvCfjatcIixcbiAgICBcIvCfjaxcIixcbiAgICBcIvCfja1cIixcbiAgICBcIvCfja9cIixcbiAgICBcIvCfjY5cIixcbiAgICBcIvCfjY9cIixcbiAgICBcIvCfjYpcIixcbiAgICBcIvCfjYtcIixcbiAgICBcIvCfjZJcIixcbiAgICBcIvCfjYdcIixcbiAgICBcIvCfjYlcIixcbiAgICBcIvCfjZNcIixcbiAgICBcIvCfjZFcIixcbiAgICBcIvCfjYhcIixcbiAgICBcIvCfjYxcIixcbiAgICBcIvCfjZBcIixcbiAgICBcIvCfjY1cIixcbiAgICBcIvCfjaBcIixcbiAgICBcIvCfjYZcIixcbiAgICBcIvCfjYVcIixcbiAgICBcIvCfjL1cIlxuXTtcbmNvbnN0IGdlbmVyYXRlUmFuZG9tSUQgPSAoKSA9PiB7XG4gICAgbGV0IHJhbmRvbUVtb2ppID0gZW1vamlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppcy5sZW5ndGgpXTtcbiAgICBsZXQgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgLnNsaWNlKC00KTtcbiAgICByZXR1cm4gYCR7cmFuZG9tRW1vaml9JHtyYW5kb21JRH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlUmFuZG9tSUQ7XG4iLCJjb25zdCBnZXRCZWZvcmVTdWZmaXggPSAoc3RyLCBjaGVja1N5bWJvbCkgPT4ge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIHN0ci5pbmRleE9mKGNoZWNrU3ltYm9sKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0QmVmb3JlU3VmZml4O1xuIiwiY29uc3QgZ2V0UmFuZG9tS2V5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwKS50b1N0cmluZygpO1xuICAgIHJldHVybiByYW5kb21LZXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UmFuZG9tS2V5O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuL3NvcnROb2Rlc0J5UG9zaXRpb25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0QmVmb3JlU3VmZml4IH0gZnJvbSBcIi4vZ2V0QmVmb3JlU3VmZml4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdlbmVyYXRlUmFuZG9tSUQgfSBmcm9tIFwiLi9nZW5lcmF0ZVJhbmRvbUlEXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGRvd25sb2FkSlNPTiB9IGZyb20gXCIuL2Rvd25sb2FkSlNPTlwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRSYW5kb21LZXkgfSBmcm9tIFwiLi9nZXRSYW5kb21LZXlcIjtcbiIsImxldCBsb2dTdHlsZXMgPSBcImJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMnB4IDRweDtcIjtcbmxldCBsb2dUaW1lID0gODAwO1xuY29uc3QgbG9nID0ge1xuICAgIHN1Y2Nlc3M6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDI1NSwgMTM2LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDwn46JICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyMDQsIDI1NSwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pyFICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG5ldXRyYWw6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHdhcm46ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTIzLCAwLCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDimKLvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwwLDAsMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4puU77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9nO1xuIiwiY29uc3Qgc29ydE5vZGVzQnlQb3NpdGlvbiA9IG5vZGVzID0+IHtcbiAgICB2YXIgcmVzdWx0ID0gbm9kZXMubWFwKHggPT4geCk7XG4gICAgcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQueCAtIG5leHQueDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IGN1cnJlbnQueSAtIG5leHQueSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ydE5vZGVzQnlQb3NpdGlvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=