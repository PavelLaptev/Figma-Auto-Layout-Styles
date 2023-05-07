/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shareable/variables.tsx":
/*!*************************************!*\
  !*** ./src/shareable/variables.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configStorageKey": () => (/* binding */ configStorageKey),
/* harmony export */   "storageKey": () => (/* binding */ storageKey)
/* harmony export */ });
const storageKey = "autolayout-styles-plugin";
const configStorageKey = `${storageKey}-last-config-record`;


/***/ }),

/***/ "./src/utils/checkAndUpdateStructure.tsx":
/*!***********************************************!*\
  !*** ./src/utils/checkAndUpdateStructure.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const checkAndUpdateStructure = file => {
    file.layouts.forEach((item) => {
        if (!item.hasOwnProperty("fold")) {
            item.fold = false;
        }
    });
    return file;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkAndUpdateStructure);


/***/ }),

/***/ "./src/utils/downloadJSON.tsx":
/*!************************************!*\
  !*** ./src/utils/downloadJSON.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const download = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content, null, 2)], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (download);


/***/ }),

/***/ "./src/utils/generateRandomID.tsx":
/*!****************************************!*\
  !*** ./src/utils/generateRandomID.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateRandomID);


/***/ }),

/***/ "./src/utils/getBeforeSuffix.tsx":
/*!***************************************!*\
  !*** ./src/utils/getBeforeSuffix.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getBeforeSuffix = (str, checkSymbol) => {
    return str.substr(0, str.indexOf(checkSymbol));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getBeforeSuffix);


/***/ }),

/***/ "./src/utils/getRandomKey.tsx":
/*!************************************!*\
  !*** ./src/utils/getRandomKey.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getRandomKey = () => {
    const randomKey = Math.floor(Math.random() * 100000000).toString();
    return randomKey;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRandomKey);


/***/ }),

/***/ "./src/utils/index.tsx":
/*!*****************************!*\
  !*** ./src/utils/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkAndUpdateStructure": () => (/* reexport safe */ _checkAndUpdateStructure__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "downloadJSON": () => (/* reexport safe */ _downloadJSON__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "generateRandomID": () => (/* reexport safe */ _generateRandomID__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "getBeforeSuffix": () => (/* reexport safe */ _getBeforeSuffix__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "getRandomKey": () => (/* reexport safe */ _getRandomKey__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "log": () => (/* reexport safe */ _log__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "sortNodesByPosition": () => (/* reexport safe */ _sortNodesByPosition__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "./src/utils/log.tsx");
/* harmony import */ var _sortNodesByPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sortNodesByPosition */ "./src/utils/sortNodesByPosition.tsx");
/* harmony import */ var _getBeforeSuffix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBeforeSuffix */ "./src/utils/getBeforeSuffix.tsx");
/* harmony import */ var _generateRandomID__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generateRandomID */ "./src/utils/generateRandomID.tsx");
/* harmony import */ var _downloadJSON__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./downloadJSON */ "./src/utils/downloadJSON.tsx");
/* harmony import */ var _getRandomKey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getRandomKey */ "./src/utils/getRandomKey.tsx");
/* harmony import */ var _checkAndUpdateStructure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checkAndUpdateStructure */ "./src/utils/checkAndUpdateStructure.tsx");









/***/ }),

/***/ "./src/utils/log.tsx":
/*!***************************!*\
  !*** ./src/utils/log.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (log);


/***/ }),

/***/ "./src/utils/sortNodesByPosition.tsx":
/*!*******************************************!*\
  !*** ./src/utils/sortNodesByPosition.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sortNodesByPosition = nodes => {
    var result = nodes.map(x => x);
    result.sort((current, next) => {
        return current.x - next.x;
    });
    return result.sort((current, next) => current.y - next.y);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortNodesByPosition);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/plugin/controller.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.tsx");
/* harmony import */ var _shareable_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shareable/variables */ "./src/shareable/variables.tsx");


figma.showUI(__html__, { width: 350, height: 540 });
figma.ui.postMessage({
    type: _shareable_variables__WEBPACK_IMPORTED_MODULE_1__.configStorageKey,
    data: figma.root.getPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__.configStorageKey)
});
const setLayoutProps = (frame, data, skipAxisMode = false, rename = true) => {
    frame.name = rename ? data.name : frame.name;
    frame.setSharedPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__.storageKey, "hookName", data.hookName);
    if (!skipAxisMode) {
        frame.primaryAxisSizingMode =
            data.direction === "HORIZONTAL" ? frame.primaryAxisSizingMode : "AUTO";
        frame.counterAxisSizingMode =
            data.direction === "VERTICAL" ? frame.counterAxisSizingMode : "AUTO";
    }
    frame.layoutMode = data.direction;
    frame.paddingTop = data.space.top;
    frame.paddingRight = data.space.right;
    frame.paddingBottom = data.space.bottom;
    frame.paddingLeft = data.space.left;
    frame.itemSpacing = data.space.between;
};
figma.ui.onmessage = async (msg) => {
    let node = figma.currentPage.selection;
    if (msg.type === "clear-stoorage") {
        figma.root.setPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__.configStorageKey, "");
        figma.notify("👻 Storage cleared");
    }
    if (msg.type === "record-config") {
        figma.root.setPluginData(_shareable_variables__WEBPACK_IMPORTED_MODULE_1__.configStorageKey, JSON.stringify(msg.data));
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
            let sortedNodes = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sortNodesByPosition)(node);
            sortedNodes.map((item) => {
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
            _utils__WEBPACK_IMPORTED_MODULE_0__.log.warn("Please select the master component", true, 4000);
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__.log.error("Please select at least two blocks", true, 4000);
        }
    }
    if (msg.type === "update-all") {
        console.log(figma.currentPage.selection[0]);
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c3R5bGVzLy4vc3JjL3NoYXJlYWJsZS92YXJpYWJsZXMudHN4Iiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy8uL3NyYy91dGlscy9jaGVja0FuZFVwZGF0ZVN0cnVjdHVyZS50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2Rvd25sb2FkSlNPTi50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2dlbmVyYXRlUmFuZG9tSUQudHN4Iiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy8uL3NyYy91dGlscy9nZXRCZWZvcmVTdWZmaXgudHN4Iiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy8uL3NyYy91dGlscy9nZXRSYW5kb21LZXkudHN4Iiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy8uL3NyYy91dGlscy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2xvZy50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL3NvcnROb2Rlc0J5UG9zaXRpb24udHN4Iiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWdtYS1hdXRvLWxheW91dC1zdHlsZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy8uL3NyYy9wbHVnaW4vY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc3RvcmFnZUtleSA9IFwiYXV0b2xheW91dC1zdHlsZXMtcGx1Z2luXCI7XG5leHBvcnQgY29uc3QgY29uZmlnU3RvcmFnZUtleSA9IGAke3N0b3JhZ2VLZXl9LWxhc3QtY29uZmlnLXJlY29yZGA7XG4iLCJjb25zdCBjaGVja0FuZFVwZGF0ZVN0cnVjdHVyZSA9IGZpbGUgPT4ge1xuICAgIGZpbGUubGF5b3V0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eShcImZvbGRcIikpIHtcbiAgICAgICAgICAgIGl0ZW0uZm9sZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbGU7XG59O1xuZXhwb3J0IGRlZmF1bHQgY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmU7XG4iLCJjb25zdCBkb3dubG9hZCA9IChjb250ZW50LCBmaWxlTmFtZSwgY29udGVudFR5cGUpID0+IHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHZhciBmaWxlID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIDIpXSwge1xuICAgICAgICB0eXBlOiBjb250ZW50VHlwZVxuICAgIH0pO1xuICAgIGEuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIGEuY2xpY2soKTtcbn07XG5leHBvcnQgZGVmYXVsdCBkb3dubG9hZDtcbiIsInZhciBlbW9qaXMgPSBbXG4gICAgXCLwn5C6XCIsXG4gICAgXCLwn5CxXCIsXG4gICAgXCLwn5CtXCIsXG4gICAgXCLwn5C5XCIsXG4gICAgXCLwn5CwXCIsXG4gICAgXCLwn5C4XCIsXG4gICAgXCLwn5CvXCIsXG4gICAgXCLwn5CoXCIsXG4gICAgXCLwn5C7XCIsXG4gICAgXCLwn5C3XCIsXG4gICAgXCLwn5C9XCIsXG4gICAgXCLwn5CuXCIsXG4gICAgXCLwn5CXXCIsXG4gICAgXCLwn5C1XCIsXG4gICAgXCLwn5CSXCIsXG4gICAgXCLwn5C0XCIsXG4gICAgXCLwn5CRXCIsXG4gICAgXCLwn5CYXCIsXG4gICAgXCLwn5C8XCIsXG4gICAgXCLwn5CnXCIsXG4gICAgXCLwn5CmXCIsXG4gICAgXCLwn5CkXCIsXG4gICAgXCLwn5ClXCIsXG4gICAgXCLwn5CjXCIsXG4gICAgXCLwn5CUXCIsXG4gICAgXCLwn5CNXCIsXG4gICAgXCLwn5CiXCIsXG4gICAgXCLwn5CbXCIsXG4gICAgXCLwn5CdXCIsXG4gICAgXCLwn5CcXCIsXG4gICAgXCLwn5CeXCIsXG4gICAgXCLwn5CMXCIsXG4gICAgXCLwn5CZXCIsXG4gICAgXCLwn5CaXCIsXG4gICAgXCLwn5CgXCIsXG4gICAgXCLwn5CfXCIsXG4gICAgXCLwn5CsXCIsXG4gICAgXCLwn5CzXCIsXG4gICAgXCLwn5CLXCIsXG4gICAgXCLwn5CEXCIsXG4gICAgXCLwn5CPXCIsXG4gICAgXCLwn5CAXCIsXG4gICAgXCLwn5CDXCIsXG4gICAgXCLwn5CFXCIsXG4gICAgXCLwn5CHXCIsXG4gICAgXCLwn5CJXCIsXG4gICAgXCLwn5COXCIsXG4gICAgXCLwn5CQXCIsXG4gICAgXCLwn5CTXCIsXG4gICAgXCLwn5CVXCIsXG4gICAgXCLwn5CWXCIsXG4gICAgXCLwn5CBXCIsXG4gICAgXCLwn5CCXCIsXG4gICAgXCLwn5CyXCIsXG4gICAgXCLwn5ChXCIsXG4gICAgXCLwn5CKXCIsXG4gICAgXCLwn5CrXCIsXG4gICAgXCLwn5CqXCIsXG4gICAgXCLwn5CGXCIsXG4gICAgXCLwn5CIXCIsXG4gICAgXCLwn5CpXCIsXG4gICAgXCLwn5C+XCIsXG4gICAgXCLwn5KQXCIsXG4gICAgXCLwn4y4XCIsXG4gICAgXCLwn4y3XCIsXG4gICAgXCLwn42AXCIsXG4gICAgXCLwn4y5XCIsXG4gICAgXCLwn4y7XCIsXG4gICAgXCLwn4y6XCIsXG4gICAgXCLwn42BXCIsXG4gICAgXCLwn42DXCIsXG4gICAgXCLwn42CXCIsXG4gICAgXCLwn4y/XCIsXG4gICAgXCLwn4y+XCIsXG4gICAgXCLwn42EXCIsXG4gICAgXCLwn4y1XCIsXG4gICAgXCLwn4y0XCIsXG4gICAgXCLwn4yyXCIsXG4gICAgXCLwn4yzXCIsXG4gICAgXCLwn4+IXCIsXG4gICAgXCLwn4+AXCIsXG4gICAgXCLimr1cIixcbiAgICBcIuKavlwiLFxuICAgIFwi8J+OvlwiLFxuICAgIFwi8J+OsVwiLFxuICAgIFwi8J+NulwiLFxuICAgIFwi8J+Nu1wiLFxuICAgIFwi8J+NuFwiLFxuICAgIFwi8J+NuVwiLFxuICAgIFwi8J+Nt1wiLFxuICAgIFwi8J+NtFwiLFxuICAgIFwi8J+NlVwiLFxuICAgIFwi8J+NlFwiLFxuICAgIFwi8J+Nn1wiLFxuICAgIFwi8J+Nl1wiLFxuICAgIFwi8J+NllwiLFxuICAgIFwi8J+NnVwiLFxuICAgIFwi8J+Nm1wiLFxuICAgIFwi8J+NpFwiLFxuICAgIFwi8J+NsVwiLFxuICAgIFwi8J+No1wiLFxuICAgIFwi8J+NpVwiLFxuICAgIFwi8J+NmVwiLFxuICAgIFwi8J+NmFwiLFxuICAgIFwi8J+NmlwiLFxuICAgIFwi8J+NnFwiLFxuICAgIFwi8J+NslwiLFxuICAgIFwi8J+NolwiLFxuICAgIFwi8J+NoVwiLFxuICAgIFwi8J+Ns1wiLFxuICAgIFwi8J+NnlwiLFxuICAgIFwi8J+NqVwiLFxuICAgIFwi8J+NrlwiLFxuICAgIFwi8J+NplwiLFxuICAgIFwi8J+NqFwiLFxuICAgIFwi8J+Np1wiLFxuICAgIFwi8J+OglwiLFxuICAgIFwi8J+NsFwiLFxuICAgIFwi8J+NqlwiLFxuICAgIFwi8J+Nq1wiLFxuICAgIFwi8J+NrFwiLFxuICAgIFwi8J+NrVwiLFxuICAgIFwi8J+Nr1wiLFxuICAgIFwi8J+NjlwiLFxuICAgIFwi8J+Nj1wiLFxuICAgIFwi8J+NilwiLFxuICAgIFwi8J+Ni1wiLFxuICAgIFwi8J+NklwiLFxuICAgIFwi8J+Nh1wiLFxuICAgIFwi8J+NiVwiLFxuICAgIFwi8J+Nk1wiLFxuICAgIFwi8J+NkVwiLFxuICAgIFwi8J+NiFwiLFxuICAgIFwi8J+NjFwiLFxuICAgIFwi8J+NkFwiLFxuICAgIFwi8J+NjVwiLFxuICAgIFwi8J+NoFwiLFxuICAgIFwi8J+NhlwiLFxuICAgIFwi8J+NhVwiLFxuICAgIFwi8J+MvVwiXG5dO1xuY29uc3QgZ2VuZXJhdGVSYW5kb21JRCA9ICgpID0+IHtcbiAgICBsZXQgcmFuZG9tRW1vamkgPSBlbW9qaXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1vamlzLmxlbmd0aCldO1xuICAgIGxldCByYW5kb21JRCA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAuc2xpY2UoLTQpO1xuICAgIHJldHVybiBgJHtyYW5kb21FbW9qaX0ke3JhbmRvbUlEfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVSYW5kb21JRDtcbiIsImNvbnN0IGdldEJlZm9yZVN1ZmZpeCA9IChzdHIsIGNoZWNrU3ltYm9sKSA9PiB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgc3RyLmluZGV4T2YoY2hlY2tTeW1ib2wpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRCZWZvcmVTdWZmaXg7XG4iLCJjb25zdCBnZXRSYW5kb21LZXkgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tS2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwKS50b1N0cmluZygpO1xuICAgIHJldHVybiByYW5kb21LZXk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0UmFuZG9tS2V5O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuL3NvcnROb2Rlc0J5UG9zaXRpb25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0QmVmb3JlU3VmZml4IH0gZnJvbSBcIi4vZ2V0QmVmb3JlU3VmZml4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdlbmVyYXRlUmFuZG9tSUQgfSBmcm9tIFwiLi9nZW5lcmF0ZVJhbmRvbUlEXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGRvd25sb2FkSlNPTiB9IGZyb20gXCIuL2Rvd25sb2FkSlNPTlwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRSYW5kb21LZXkgfSBmcm9tIFwiLi9nZXRSYW5kb21LZXlcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY2hlY2tBbmRVcGRhdGVTdHJ1Y3R1cmUgfSBmcm9tIFwiLi9jaGVja0FuZFVwZGF0ZVN0cnVjdHVyZVwiO1xuIiwibGV0IGxvZ1N0eWxlcyA9IFwiYm9yZGVyLXJhZGl1czogNHB4OyBwYWRkaW5nOiAycHggNHB4O1wiO1xubGV0IGxvZ1RpbWUgPSA4MDA7XG5jb25zdCBsb2cgPSB7XG4gICAgc3VjY2VzczogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMCwgMjU1LCAxMzYsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYPCfjokgJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2hlY2s6ICh0ZXh0LCBzaG93ID0gdHJ1ZSwgdGltZXIgPSBsb2dUaW1lKSA9PiB7XG4gICAgICAgIHNob3dcbiAgICAgICAgICAgID8gY29uc29sZS5sb2coYCVjJHt0ZXh0fWAsIGBiYWNrZ3JvdW5kOiByZ2JhKDAsIDIwNCwgMjU1LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDinIUgJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgbmV1dHJhbDogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShgJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgd2FybjogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxMjMsIDAsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKYou+4jyAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMjU1LDAsMCwwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGDim5TvuI8gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY3VzdG9tOiAoZW1vamksIHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShgJHtlbW9qaX0gJHt0ZXh0fWAsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVyXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBsb2c7XG4iLCJjb25zdCBzb3J0Tm9kZXNCeVBvc2l0aW9uID0gbm9kZXMgPT4ge1xuICAgIHZhciByZXN1bHQgPSBub2Rlcy5tYXAoeCA9PiB4KTtcbiAgICByZXN1bHQuc29ydCgoY3VycmVudCwgbmV4dCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudC54IC0gbmV4dC54O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQuc29ydCgoY3VycmVudCwgbmV4dCkgPT4gY3VycmVudC55IC0gbmV4dC55KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb3J0Tm9kZXNCeVBvc2l0aW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2csIHNvcnROb2Rlc0J5UG9zaXRpb24gfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IGNvbmZpZ1N0b3JhZ2VLZXksIHN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vc2hhcmVhYmxlL3ZhcmlhYmxlc1wiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzNTAsIGhlaWdodDogNTQwIH0pO1xuZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGU6IGNvbmZpZ1N0b3JhZ2VLZXksXG4gICAgZGF0YTogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGNvbmZpZ1N0b3JhZ2VLZXkpXG59KTtcbmNvbnN0IHNldExheW91dFByb3BzID0gKGZyYW1lLCBkYXRhLCBza2lwQXhpc01vZGUgPSBmYWxzZSwgcmVuYW1lID0gdHJ1ZSkgPT4ge1xuICAgIGZyYW1lLm5hbWUgPSByZW5hbWUgPyBkYXRhLm5hbWUgOiBmcmFtZS5uYW1lO1xuICAgIGZyYW1lLnNldFNoYXJlZFBsdWdpbkRhdGEoc3RvcmFnZUtleSwgXCJob29rTmFtZVwiLCBkYXRhLmhvb2tOYW1lKTtcbiAgICBpZiAoIXNraXBBeGlzTW9kZSkge1xuICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPVxuICAgICAgICAgICAgZGF0YS5kaXJlY3Rpb24gPT09IFwiSE9SSVpPTlRBTFwiID8gZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlIDogXCJBVVRPXCI7XG4gICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbiA9PT0gXCJWRVJUSUNBTFwiID8gZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlIDogXCJBVVRPXCI7XG4gICAgfVxuICAgIGZyYW1lLmxheW91dE1vZGUgPSBkYXRhLmRpcmVjdGlvbjtcbiAgICBmcmFtZS5wYWRkaW5nVG9wID0gZGF0YS5zcGFjZS50b3A7XG4gICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gZGF0YS5zcGFjZS5yaWdodDtcbiAgICBmcmFtZS5wYWRkaW5nQm90dG9tID0gZGF0YS5zcGFjZS5ib3R0b207XG4gICAgZnJhbWUucGFkZGluZ0xlZnQgPSBkYXRhLnNwYWNlLmxlZnQ7XG4gICAgZnJhbWUuaXRlbVNwYWNpbmcgPSBkYXRhLnNwYWNlLmJldHdlZW47XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gYXN5bmMgKG1zZykgPT4ge1xuICAgIGxldCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJjbGVhci1zdG9vcmFnZVwiKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWdTdG9yYWdlS2V5LCBcIlwiKTtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwi8J+RuyBTdG9yYWdlIGNsZWFyZWRcIik7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJyZWNvcmQtY29uZmlnXCIpIHtcbiAgICAgICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGNvbmZpZ1N0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KG1zZy5kYXRhKSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJhcHBseS1sYXlvdXRcIikge1xuICAgICAgICBpZiAobm9kZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50Q29udGVpbmVyID0gbm9kZVswXS5wYXJlbnQ7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChub2RlLCBwYXJlbnRDb250ZWluZXIpO1xuICAgICAgICAgICAgZnJhbWUueCA9IGdyb3VwLng7XG4gICAgICAgICAgICBmcmFtZS55ID0gZ3JvdXAueTtcbiAgICAgICAgICAgIGZyYW1lLmJhY2tncm91bmRzID0gW107XG4gICAgICAgICAgICBmcmFtZS5yZXNpemUoZ3JvdXAud2lkdGgsIGdyb3VwLmhlaWdodCk7XG4gICAgICAgICAgICBzZXRMYXlvdXRQcm9wcyhmcmFtZSwgbXNnLmRhdGEpO1xuICAgICAgICAgICAgbGV0IHNvcnRlZE5vZGVzID0gc29ydE5vZGVzQnlQb3NpdGlvbihub2RlKTtcbiAgICAgICAgICAgIHNvcnRlZE5vZGVzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGZyYW1lLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXJlbnRDb250ZWluZXIuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW2ZyYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIkZSQU1FXCIpIHx8XG4gICAgICAgICAgICAobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIkNPTVBPTkVOVFwiKSkge1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gbm9kZVswXTtcbiAgICAgICAgICAgIHNldExheW91dFByb3BzKGZyYW1lLCBtc2cuZGF0YSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXS50eXBlID09PSBcIklOU1RBTkNFXCIpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKFwiUGxlYXNlIHNlbGVjdCB0aGUgbWFzdGVyIGNvbXBvbmVudFwiLCB0cnVlLCA0MDAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihcIlBsZWFzZSBzZWxlY3QgYXQgbGVhc3QgdHdvIGJsb2Nrc1wiLCB0cnVlLCA0MDAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwidXBkYXRlLWFsbFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXSk7XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==