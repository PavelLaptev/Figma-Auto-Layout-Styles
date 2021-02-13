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
    frame.layoutMode = data.direction;
    frame.primaryAxisSizingMode = "FIXED";
    frame.counterAxisSizingMode = "FIXED";
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
                frame.appendChild(item);
            });
            parentConteiner.appendChild(frame);
            figma.currentPage.selection = [frame];
        }
        else if (node.length === 1 && node[0].type === "FRAME") {
            if (node[0].layoutMode !== "NONE") {
                let frame = node[0];
                setCompositionProps(frame, msg.data);
            }
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].error("Please select at least two blocks");
        }
    }
    if (msg.type === "update-all") {
        let showMessageState = false;
        let allPages = figma.root.children;
        allPages.map(page => {
            msg.data.compositions.map(compositionData => {
                let compositions = page.findAll(n => n.name === compositionData.hookName);
                if (compositions.length > 0) {
                    showMessageState ? false : _utils__WEBPACK_IMPORTED_MODULE_0__["log"].success(`Updating all compositions`);
                    showMessageState = true;
                    compositions.map(compositionFrame => {
                        setCompositionProps(compositionFrame, compositionData);
                    });
                }
                else {
                    _utils__WEBPACK_IMPORTED_MODULE_0__["log"].warn(`no compositions on the page "${page.name}"`);
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kb3dubG9hZEpTT04udHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZW5lcmF0ZVJhbmRvbUlELnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0QmVmb3JlU3VmZml4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0UmFuZG9tS2V5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9sb2cudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9zb3J0Tm9kZXNCeVBvc2l0aW9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBb0Q7QUFDcEQsd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrRUFBbUI7QUFDakQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQUc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMENBQUc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxvQkFBb0IsMENBQUcsc0NBQXNDLFVBQVU7QUFDdkU7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNlLHVFQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNUeEI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVksRUFBRSxTQUFTO0FBQ3JDO0FBQ2UsK0VBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNySmhDO0FBQUE7QUFDQTtBQUNBO0FBQ2UsOEVBQWUsRUFBQzs7Ozs7Ozs7Ozs7OztBQ0gvQjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsMkVBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQ0o1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNnQztBQUNSO0FBQ0U7QUFDUjtBQUNBOzs7Ozs7Ozs7Ozs7O0FDTHpEO0FBQUEsb0NBQW9DLGtCQUFrQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLDBDQUEwQyxFQUFFLFVBQVU7QUFDMUY7QUFDQSx3QkFBd0IsS0FBSztBQUM3QjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLHdDQUF3QyxFQUFFLFVBQVU7QUFDeEY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixLQUFLLG1DQUFtQyxFQUFFLFVBQVU7QUFDbkY7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ2Usa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQzVDbkI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ2Usa0ZBQW1CLEVBQUMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwiaW1wb3J0IHsgbG9nLCBzb3J0Tm9kZXNCeVBvc2l0aW9uIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDM2MCwgaGVpZ2h0OiA1MDAgfSk7XG5jb25zdCBzZXRDb21wb3NpdGlvblByb3BzID0gKGZyYW1lLCBkYXRhKSA9PiB7XG4gICAgZnJhbWUubmFtZSA9IGAke2RhdGEuaG9va05hbWV9YDtcbiAgICBmcmFtZS5sYXlvdXRNb2RlID0gZGF0YS5kaXJlY3Rpb247XG4gICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJGSVhFRFwiO1xuICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9IFwiRklYRURcIjtcbiAgICBmcmFtZS5wYWRkaW5nVG9wID0gZGF0YS5zcGFjZS50b3A7XG4gICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gZGF0YS5zcGFjZS5yaWdodDtcbiAgICBmcmFtZS5wYWRkaW5nQm90dG9tID0gZGF0YS5zcGFjZS5ib3R0b207XG4gICAgZnJhbWUucGFkZGluZ0xlZnQgPSBkYXRhLnNwYWNlLmxlZnQ7XG4gICAgZnJhbWUuaXRlbVNwYWNpbmcgPSBkYXRhLnNwYWNlLmJldHdlZW47XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gYXN5bmMgKG1zZykgPT4ge1xuICAgIGxldCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJhcHBseS1jb21wb3NpdGlvblwiKSB7XG4gICAgICAgIGlmIChub2RlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRDb250ZWluZXIgPSBub2RlWzBdLnBhcmVudDtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKG5vZGUsIHBhcmVudENvbnRlaW5lcik7XG4gICAgICAgICAgICBmcmFtZS54ID0gZ3JvdXAueDtcbiAgICAgICAgICAgIGZyYW1lLnkgPSBncm91cC55O1xuICAgICAgICAgICAgZnJhbWUuYmFja2dyb3VuZHMgPSBbXTtcbiAgICAgICAgICAgIGZyYW1lLnJlc2l6ZShncm91cC53aWR0aCwgZ3JvdXAuaGVpZ2h0KTtcbiAgICAgICAgICAgIHNldENvbXBvc2l0aW9uUHJvcHMoZnJhbWUsIG1zZy5kYXRhKTtcbiAgICAgICAgICAgIGxldCBzb3J0ZWROb2RlcyA9IHNvcnROb2Rlc0J5UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzb3J0ZWROb2Rlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhcmVudENvbnRlaW5lci5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbZnJhbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gXCJGUkFNRVwiKSB7XG4gICAgICAgICAgICBpZiAobm9kZVswXS5sYXlvdXRNb2RlICE9PSBcIk5PTkVcIikge1xuICAgICAgICAgICAgICAgIGxldCBmcmFtZSA9IG5vZGVbMF07XG4gICAgICAgICAgICAgICAgc2V0Q29tcG9zaXRpb25Qcm9wcyhmcmFtZSwgbXNnLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKFwiUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCB0d28gYmxvY2tzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJ1cGRhdGUtYWxsXCIpIHtcbiAgICAgICAgbGV0IHNob3dNZXNzYWdlU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgbGV0IGFsbFBhZ2VzID0gZmlnbWEucm9vdC5jaGlsZHJlbjtcbiAgICAgICAgYWxsUGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgICAgICAgbXNnLmRhdGEuY29tcG9zaXRpb25zLm1hcChjb21wb3NpdGlvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb3NpdGlvbnMgPSBwYWdlLmZpbmRBbGwobiA9PiBuLm5hbWUgPT09IGNvbXBvc2l0aW9uRGF0YS5ob29rTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlU3RhdGUgPyBmYWxzZSA6IGxvZy5zdWNjZXNzKGBVcGRhdGluZyBhbGwgY29tcG9zaXRpb25zYCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbnMubWFwKGNvbXBvc2l0aW9uRnJhbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29tcG9zaXRpb25Qcm9wcyhjb21wb3NpdGlvbkZyYW1lLCBjb21wb3NpdGlvbkRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy53YXJuKGBubyBjb21wb3NpdGlvbnMgb24gdGhlIHBhZ2UgXCIke3BhZ2UubmFtZX1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiY29uc3QgZG93bmxvYWQgPSAoY29udGVudCwgZmlsZU5hbWUsIGNvbnRlbnRUeXBlKSA9PiB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKV0sIHtcbiAgICAgICAgdHlwZTogY29udGVudFR5cGVcbiAgICB9KTtcbiAgICBhLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBhLmNsaWNrKCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQ7XG4iLCJ2YXIgZW1vamlzID0gW1xuICAgIFwi8J+QulwiLFxuICAgIFwi8J+QsVwiLFxuICAgIFwi8J+QrVwiLFxuICAgIFwi8J+QuVwiLFxuICAgIFwi8J+QsFwiLFxuICAgIFwi8J+QuFwiLFxuICAgIFwi8J+Qr1wiLFxuICAgIFwi8J+QqFwiLFxuICAgIFwi8J+Qu1wiLFxuICAgIFwi8J+Qt1wiLFxuICAgIFwi8J+QvVwiLFxuICAgIFwi8J+QrlwiLFxuICAgIFwi8J+Ql1wiLFxuICAgIFwi8J+QtVwiLFxuICAgIFwi8J+QklwiLFxuICAgIFwi8J+QtFwiLFxuICAgIFwi8J+QkVwiLFxuICAgIFwi8J+QmFwiLFxuICAgIFwi8J+QvFwiLFxuICAgIFwi8J+Qp1wiLFxuICAgIFwi8J+QplwiLFxuICAgIFwi8J+QpFwiLFxuICAgIFwi8J+QpVwiLFxuICAgIFwi8J+Qo1wiLFxuICAgIFwi8J+QlFwiLFxuICAgIFwi8J+QjVwiLFxuICAgIFwi8J+QolwiLFxuICAgIFwi8J+Qm1wiLFxuICAgIFwi8J+QnVwiLFxuICAgIFwi8J+QnFwiLFxuICAgIFwi8J+QnlwiLFxuICAgIFwi8J+QjFwiLFxuICAgIFwi8J+QmVwiLFxuICAgIFwi8J+QmlwiLFxuICAgIFwi8J+QoFwiLFxuICAgIFwi8J+Qn1wiLFxuICAgIFwi8J+QrFwiLFxuICAgIFwi8J+Qs1wiLFxuICAgIFwi8J+Qi1wiLFxuICAgIFwi8J+QhFwiLFxuICAgIFwi8J+Qj1wiLFxuICAgIFwi8J+QgFwiLFxuICAgIFwi8J+Qg1wiLFxuICAgIFwi8J+QhVwiLFxuICAgIFwi8J+Qh1wiLFxuICAgIFwi8J+QiVwiLFxuICAgIFwi8J+QjlwiLFxuICAgIFwi8J+QkFwiLFxuICAgIFwi8J+Qk1wiLFxuICAgIFwi8J+QlVwiLFxuICAgIFwi8J+QllwiLFxuICAgIFwi8J+QgVwiLFxuICAgIFwi8J+QglwiLFxuICAgIFwi8J+QslwiLFxuICAgIFwi8J+QoVwiLFxuICAgIFwi8J+QilwiLFxuICAgIFwi8J+Qq1wiLFxuICAgIFwi8J+QqlwiLFxuICAgIFwi8J+QhlwiLFxuICAgIFwi8J+QiFwiLFxuICAgIFwi8J+QqVwiLFxuICAgIFwi8J+QvlwiLFxuICAgIFwi8J+SkFwiLFxuICAgIFwi8J+MuFwiLFxuICAgIFwi8J+Mt1wiLFxuICAgIFwi8J+NgFwiLFxuICAgIFwi8J+MuVwiLFxuICAgIFwi8J+Mu1wiLFxuICAgIFwi8J+MulwiLFxuICAgIFwi8J+NgVwiLFxuICAgIFwi8J+Ng1wiLFxuICAgIFwi8J+NglwiLFxuICAgIFwi8J+Mv1wiLFxuICAgIFwi8J+MvlwiLFxuICAgIFwi8J+NhFwiLFxuICAgIFwi8J+MtVwiLFxuICAgIFwi8J+MtFwiLFxuICAgIFwi8J+MslwiLFxuICAgIFwi8J+Ms1wiLFxuICAgIFwi8J+PiFwiLFxuICAgIFwi8J+PgFwiLFxuICAgIFwi4pq9XCIsXG4gICAgXCLimr5cIixcbiAgICBcIvCfjr5cIixcbiAgICBcIvCfjrFcIixcbiAgICBcIvCfjbpcIixcbiAgICBcIvCfjbtcIixcbiAgICBcIvCfjbhcIixcbiAgICBcIvCfjblcIixcbiAgICBcIvCfjbdcIixcbiAgICBcIvCfjbRcIixcbiAgICBcIvCfjZVcIixcbiAgICBcIvCfjZRcIixcbiAgICBcIvCfjZ9cIixcbiAgICBcIvCfjZdcIixcbiAgICBcIvCfjZZcIixcbiAgICBcIvCfjZ1cIixcbiAgICBcIvCfjZtcIixcbiAgICBcIvCfjaRcIixcbiAgICBcIvCfjbFcIixcbiAgICBcIvCfjaNcIixcbiAgICBcIvCfjaVcIixcbiAgICBcIvCfjZlcIixcbiAgICBcIvCfjZhcIixcbiAgICBcIvCfjZpcIixcbiAgICBcIvCfjZxcIixcbiAgICBcIvCfjbJcIixcbiAgICBcIvCfjaJcIixcbiAgICBcIvCfjaFcIixcbiAgICBcIvCfjbNcIixcbiAgICBcIvCfjZ5cIixcbiAgICBcIvCfjalcIixcbiAgICBcIvCfja5cIixcbiAgICBcIvCfjaZcIixcbiAgICBcIvCfjahcIixcbiAgICBcIvCfjadcIixcbiAgICBcIvCfjoJcIixcbiAgICBcIvCfjbBcIixcbiAgICBcIvCfjapcIixcbiAgICBcIvCfjatcIixcbiAgICBcIvCfjaxcIixcbiAgICBcIvCfja1cIixcbiAgICBcIvCfja9cIixcbiAgICBcIvCfjY5cIixcbiAgICBcIvCfjY9cIixcbiAgICBcIvCfjYpcIixcbiAgICBcIvCfjYtcIixcbiAgICBcIvCfjZJcIixcbiAgICBcIvCfjYdcIixcbiAgICBcIvCfjYlcIixcbiAgICBcIvCfjZNcIixcbiAgICBcIvCfjZFcIixcbiAgICBcIvCfjYhcIixcbiAgICBcIvCfjYxcIixcbiAgICBcIvCfjZBcIixcbiAgICBcIvCfjY1cIixcbiAgICBcIvCfjaBcIixcbiAgICBcIvCfjYZcIixcbiAgICBcIvCfjYVcIixcbiAgICBcIvCfjL1cIlxuXTtcbmNvbnN0IGdlbmVyYXRlUmFuZG9tSUQgPSAoKSA9PiB7XG4gICAgbGV0IHJhbmRvbUVtb2ppID0gZW1vamlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGVtb2ppcy5sZW5ndGgpXTtcbiAgICBsZXQgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgLnNsaWNlKC00KTtcbiAgICByZXR1cm4gYCR7cmFuZG9tRW1vaml9JHtyYW5kb21JRH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlUmFuZG9tSUQ7XG4iLCJjb25zdCBnZXRCZWZvcmVTdWZmaXggPSAoc3RyLCBjaGVja1N5bWJvbCkgPT4ge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIHN0ci5pbmRleE9mKGNoZWNrU3ltYm9sKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0QmVmb3JlU3VmZml4O1xuIiwiY29uc3QgZ2V0UmFuZG9tS2V5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwKS50b1N0cmluZygpO1xuICAgIHJldHVybiByYW5kb21LZXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UmFuZG9tS2V5O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuL3NvcnROb2Rlc0J5UG9zaXRpb25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0QmVmb3JlU3VmZml4IH0gZnJvbSBcIi4vZ2V0QmVmb3JlU3VmZml4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdlbmVyYXRlUmFuZG9tSUQgfSBmcm9tIFwiLi9nZW5lcmF0ZVJhbmRvbUlEXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGRvd25sb2FkSlNPTiB9IGZyb20gXCIuL2Rvd25sb2FkSlNPTlwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRSYW5kb21LZXkgfSBmcm9tIFwiLi9nZXRSYW5kb21LZXlcIjtcbiIsImxldCBsb2dTdHlsZXMgPSBcImJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMnB4IDRweDtcIjtcbmxldCBsb2dUaW1lID0gODAwO1xuY29uc3QgbG9nID0ge1xuICAgIHN1Y2Nlc3M6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDI1NSwgMTM2LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDwn46JICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyMDQsIDI1NSwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pyFICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG5ldXRyYWw6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHdhcm46ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTIzLCAwLCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDimKLvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwwLDAsMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4puU77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9nO1xuIiwiY29uc3Qgc29ydE5vZGVzQnlQb3NpdGlvbiA9IG5vZGVzID0+IHtcbiAgICB2YXIgcmVzdWx0ID0gbm9kZXMubWFwKHggPT4geCk7XG4gICAgcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQueCAtIG5leHQueDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IGN1cnJlbnQueSAtIG5leHQueSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ydE5vZGVzQnlQb3NpdGlvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=