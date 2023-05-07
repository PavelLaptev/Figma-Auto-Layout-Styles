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
/* harmony export */   "configStorageKey": () => (/* binding */ configStorageKey)
/* harmony export */ });
const configStorageKey = "last-config-record";


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
            _utils__WEBPACK_IMPORTED_MODULE_0__.log.warn("Please select the master component", true, 4000);
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__.log.error("Please select at least two blocks", true, 4000);
        }
    }
    if (msg.type === "update-all") {
        let page = figma.currentPage;
        _utils__WEBPACK_IMPORTED_MODULE_0__.log.custom("🥁", "Updating all layouts", true, 2000);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPOzs7Ozs7Ozs7Ozs7Ozs7QUNBUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDUnZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNUeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS1hdXRvLWxheW91dC1zdHlsZXMvLi9zcmMvc2hhcmVhYmxlL3ZhcmlhYmxlcy50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2NoZWNrQW5kVXBkYXRlU3RydWN0dXJlLnRzeCIsIndlYnBhY2s6Ly9maWdtYS1hdXRvLWxheW91dC1zdHlsZXMvLi9zcmMvdXRpbHMvZG93bmxvYWRKU09OLnRzeCIsIndlYnBhY2s6Ly9maWdtYS1hdXRvLWxheW91dC1zdHlsZXMvLi9zcmMvdXRpbHMvZ2VuZXJhdGVSYW5kb21JRC50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2dldEJlZm9yZVN1ZmZpeC50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2dldFJhbmRvbUtleS50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3V0aWxzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9maWdtYS1hdXRvLWxheW91dC1zdHlsZXMvLi9zcmMvdXRpbHMvbG9nLnRzeCIsIndlYnBhY2s6Ly9maWdtYS1hdXRvLWxheW91dC1zdHlsZXMvLi9zcmMvdXRpbHMvc29ydE5vZGVzQnlQb3NpdGlvbi50c3giLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpZ21hLWF1dG8tbGF5b3V0LXN0eWxlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmlnbWEtYXV0by1sYXlvdXQtc3R5bGVzLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjb25maWdTdG9yYWdlS2V5ID0gXCJsYXN0LWNvbmZpZy1yZWNvcmRcIjtcbiIsImNvbnN0IGNoZWNrQW5kVXBkYXRlU3RydWN0dXJlID0gZmlsZSA9PiB7XG4gICAgZmlsZS5sYXlvdXRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtLmhhc093blByb3BlcnR5KFwiZm9sZFwiKSkge1xuICAgICAgICAgICAgaXRlbS5mb2xkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZTtcbn07XG5leHBvcnQgZGVmYXVsdCBjaGVja0FuZFVwZGF0ZVN0cnVjdHVyZTtcbiIsImNvbnN0IGRvd25sb2FkID0gKGNvbnRlbnQsIGZpbGVOYW1lLCBjb250ZW50VHlwZSkgPT4ge1xuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgMildLCB7XG4gICAgICAgIHR5cGU6IGNvbnRlbnRUeXBlXG4gICAgfSk7XG4gICAgYS5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICBhLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gICAgYS5jbGljaygpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRvd25sb2FkO1xuIiwidmFyIGVtb2ppcyA9IFtcbiAgICBcIvCfkLpcIixcbiAgICBcIvCfkLFcIixcbiAgICBcIvCfkK1cIixcbiAgICBcIvCfkLlcIixcbiAgICBcIvCfkLBcIixcbiAgICBcIvCfkLhcIixcbiAgICBcIvCfkK9cIixcbiAgICBcIvCfkKhcIixcbiAgICBcIvCfkLtcIixcbiAgICBcIvCfkLdcIixcbiAgICBcIvCfkL1cIixcbiAgICBcIvCfkK5cIixcbiAgICBcIvCfkJdcIixcbiAgICBcIvCfkLVcIixcbiAgICBcIvCfkJJcIixcbiAgICBcIvCfkLRcIixcbiAgICBcIvCfkJFcIixcbiAgICBcIvCfkJhcIixcbiAgICBcIvCfkLxcIixcbiAgICBcIvCfkKdcIixcbiAgICBcIvCfkKZcIixcbiAgICBcIvCfkKRcIixcbiAgICBcIvCfkKVcIixcbiAgICBcIvCfkKNcIixcbiAgICBcIvCfkJRcIixcbiAgICBcIvCfkI1cIixcbiAgICBcIvCfkKJcIixcbiAgICBcIvCfkJtcIixcbiAgICBcIvCfkJ1cIixcbiAgICBcIvCfkJxcIixcbiAgICBcIvCfkJ5cIixcbiAgICBcIvCfkIxcIixcbiAgICBcIvCfkJlcIixcbiAgICBcIvCfkJpcIixcbiAgICBcIvCfkKBcIixcbiAgICBcIvCfkJ9cIixcbiAgICBcIvCfkKxcIixcbiAgICBcIvCfkLNcIixcbiAgICBcIvCfkItcIixcbiAgICBcIvCfkIRcIixcbiAgICBcIvCfkI9cIixcbiAgICBcIvCfkIBcIixcbiAgICBcIvCfkINcIixcbiAgICBcIvCfkIVcIixcbiAgICBcIvCfkIdcIixcbiAgICBcIvCfkIlcIixcbiAgICBcIvCfkI5cIixcbiAgICBcIvCfkJBcIixcbiAgICBcIvCfkJNcIixcbiAgICBcIvCfkJVcIixcbiAgICBcIvCfkJZcIixcbiAgICBcIvCfkIFcIixcbiAgICBcIvCfkIJcIixcbiAgICBcIvCfkLJcIixcbiAgICBcIvCfkKFcIixcbiAgICBcIvCfkIpcIixcbiAgICBcIvCfkKtcIixcbiAgICBcIvCfkKpcIixcbiAgICBcIvCfkIZcIixcbiAgICBcIvCfkIhcIixcbiAgICBcIvCfkKlcIixcbiAgICBcIvCfkL5cIixcbiAgICBcIvCfkpBcIixcbiAgICBcIvCfjLhcIixcbiAgICBcIvCfjLdcIixcbiAgICBcIvCfjYBcIixcbiAgICBcIvCfjLlcIixcbiAgICBcIvCfjLtcIixcbiAgICBcIvCfjLpcIixcbiAgICBcIvCfjYFcIixcbiAgICBcIvCfjYNcIixcbiAgICBcIvCfjYJcIixcbiAgICBcIvCfjL9cIixcbiAgICBcIvCfjL5cIixcbiAgICBcIvCfjYRcIixcbiAgICBcIvCfjLVcIixcbiAgICBcIvCfjLRcIixcbiAgICBcIvCfjLJcIixcbiAgICBcIvCfjLNcIixcbiAgICBcIvCfj4hcIixcbiAgICBcIvCfj4BcIixcbiAgICBcIuKavVwiLFxuICAgIFwi4pq+XCIsXG4gICAgXCLwn46+XCIsXG4gICAgXCLwn46xXCIsXG4gICAgXCLwn426XCIsXG4gICAgXCLwn427XCIsXG4gICAgXCLwn424XCIsXG4gICAgXCLwn425XCIsXG4gICAgXCLwn423XCIsXG4gICAgXCLwn420XCIsXG4gICAgXCLwn42VXCIsXG4gICAgXCLwn42UXCIsXG4gICAgXCLwn42fXCIsXG4gICAgXCLwn42XXCIsXG4gICAgXCLwn42WXCIsXG4gICAgXCLwn42dXCIsXG4gICAgXCLwn42bXCIsXG4gICAgXCLwn42kXCIsXG4gICAgXCLwn42xXCIsXG4gICAgXCLwn42jXCIsXG4gICAgXCLwn42lXCIsXG4gICAgXCLwn42ZXCIsXG4gICAgXCLwn42YXCIsXG4gICAgXCLwn42aXCIsXG4gICAgXCLwn42cXCIsXG4gICAgXCLwn42yXCIsXG4gICAgXCLwn42iXCIsXG4gICAgXCLwn42hXCIsXG4gICAgXCLwn42zXCIsXG4gICAgXCLwn42eXCIsXG4gICAgXCLwn42pXCIsXG4gICAgXCLwn42uXCIsXG4gICAgXCLwn42mXCIsXG4gICAgXCLwn42oXCIsXG4gICAgXCLwn42nXCIsXG4gICAgXCLwn46CXCIsXG4gICAgXCLwn42wXCIsXG4gICAgXCLwn42qXCIsXG4gICAgXCLwn42rXCIsXG4gICAgXCLwn42sXCIsXG4gICAgXCLwn42tXCIsXG4gICAgXCLwn42vXCIsXG4gICAgXCLwn42OXCIsXG4gICAgXCLwn42PXCIsXG4gICAgXCLwn42KXCIsXG4gICAgXCLwn42LXCIsXG4gICAgXCLwn42SXCIsXG4gICAgXCLwn42HXCIsXG4gICAgXCLwn42JXCIsXG4gICAgXCLwn42TXCIsXG4gICAgXCLwn42RXCIsXG4gICAgXCLwn42IXCIsXG4gICAgXCLwn42MXCIsXG4gICAgXCLwn42QXCIsXG4gICAgXCLwn42NXCIsXG4gICAgXCLwn42gXCIsXG4gICAgXCLwn42GXCIsXG4gICAgXCLwn42FXCIsXG4gICAgXCLwn4y9XCJcbl07XG5jb25zdCBnZW5lcmF0ZVJhbmRvbUlEID0gKCkgPT4ge1xuICAgIGxldCByYW5kb21FbW9qaSA9IGVtb2ppc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbW9qaXMubGVuZ3RoKV07XG4gICAgbGV0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKVxuICAgICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAgIC5zbGljZSgtNCk7XG4gICAgcmV0dXJuIGAke3JhbmRvbUVtb2ppfSR7cmFuZG9tSUR9YDtcbn07XG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVJhbmRvbUlEO1xuIiwiY29uc3QgZ2V0QmVmb3JlU3VmZml4ID0gKHN0ciwgY2hlY2tTeW1ib2wpID0+IHtcbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBzdHIuaW5kZXhPZihjaGVja1N5bWJvbCkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdldEJlZm9yZVN1ZmZpeDtcbiIsImNvbnN0IGdldFJhbmRvbUtleSA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21LZXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHJhbmRvbUtleTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRSYW5kb21LZXk7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzb3J0Tm9kZXNCeVBvc2l0aW9uIH0gZnJvbSBcIi4vc29ydE5vZGVzQnlQb3NpdGlvblwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRCZWZvcmVTdWZmaXggfSBmcm9tIFwiLi9nZXRCZWZvcmVTdWZmaXhcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2VuZXJhdGVSYW5kb21JRCB9IGZyb20gXCIuL2dlbmVyYXRlUmFuZG9tSURcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZG93bmxvYWRKU09OIH0gZnJvbSBcIi4vZG93bmxvYWRKU09OXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdldFJhbmRvbUtleSB9IGZyb20gXCIuL2dldFJhbmRvbUtleVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBjaGVja0FuZFVwZGF0ZVN0cnVjdHVyZSB9IGZyb20gXCIuL2NoZWNrQW5kVXBkYXRlU3RydWN0dXJlXCI7XG4iLCJsZXQgbG9nU3R5bGVzID0gXCJib3JkZXItcmFkaXVzOiA0cHg7IHBhZGRpbmc6IDJweCA0cHg7XCI7XG5sZXQgbG9nVGltZSA9IDgwMDtcbmNvbnN0IGxvZyA9IHtcbiAgICBzdWNjZXNzOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyNTUsIDEzNiwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg8J+OiSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGVjazogKHRleHQsIHNob3cgPSB0cnVlLCB0aW1lciA9IGxvZ1RpbWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMCwgMjA0LCAyNTUsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKchSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBuZXV0cmFsOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXJuOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgyNTUsIDEyMywgMCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pii77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yOiAodGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgyNTUsMCwwLDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKblO+4jyAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjdXN0b206IChlbW9qaSwgdGV4dCwgc2hvdyA9IHRydWUsIHRpbWVyID0gbG9nVGltZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGAke2Vtb2ppfSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogdGltZXJcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvZztcbiIsImNvbnN0IHNvcnROb2Rlc0J5UG9zaXRpb24gPSBub2RlcyA9PiB7XG4gICAgdmFyIHJlc3VsdCA9IG5vZGVzLm1hcCh4ID0+IHgpO1xuICAgIHJlc3VsdC5zb3J0KChjdXJyZW50LCBuZXh0KSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50LnggLSBuZXh0Lng7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdC5zb3J0KChjdXJyZW50LCBuZXh0KSA9PiBjdXJyZW50LnkgLSBuZXh0LnkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHNvcnROb2Rlc0J5UG9zaXRpb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvZywgc29ydE5vZGVzQnlQb3NpdGlvbiB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgY29uZmlnU3RvcmFnZUtleSB9IGZyb20gXCIuLi9zaGFyZWFibGUvdmFyaWFibGVzXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDM1MCwgaGVpZ2h0OiA1NDAgfSk7XG5maWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgdHlwZTogY29uZmlnU3RvcmFnZUtleSxcbiAgICBkYXRhOiBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoY29uZmlnU3RvcmFnZUtleSlcbn0pO1xuY29uc3Qgc2V0TGF5b3V0UHJvcHMgPSAoZnJhbWUsIGRhdGEsIHNraXBBeGlzTW9kZSA9IGZhbHNlLCByZW5hbWUgPSB0cnVlKSA9PiB7XG4gICAgZnJhbWUubmFtZSA9IHJlbmFtZSA/IGAke2RhdGEuaG9va05hbWV9YCA6IGZyYW1lLm5hbWU7XG4gICAgZnJhbWUubGF5b3V0TW9kZSA9IGRhdGEuZGlyZWN0aW9uO1xuICAgIGlmICghc2tpcEF4aXNNb2RlKSB7XG4gICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbiA9PT0gXCJIT1JJWk9OVEFMXCIgPyBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgOiBcIkFVVE9cIjtcbiAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID1cbiAgICAgICAgICAgIGRhdGEuZGlyZWN0aW9uID09PSBcIlZFUlRJQ0FMXCIgPyBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgOiBcIkFVVE9cIjtcbiAgICB9XG4gICAgZnJhbWUucGFkZGluZ1RvcCA9IGRhdGEuc3BhY2UudG9wO1xuICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IGRhdGEuc3BhY2UucmlnaHQ7XG4gICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IGRhdGEuc3BhY2UuYm90dG9tO1xuICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gZGF0YS5zcGFjZS5sZWZ0O1xuICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gZGF0YS5zcGFjZS5iZXR3ZWVuO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IGFzeW5jIChtc2cpID0+IHtcbiAgICBsZXQgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY2xlYXItc3Rvb3JhZ2VcIikge1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoY29uZmlnU3RvcmFnZUtleSwgXCJcIik7XG4gICAgICAgIGZpZ21hLm5vdGlmeShcIvCfkbsgU3RvcmFnZSBjbGVhcmVkXCIpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVjb3JkLWNvbmZpZ1wiKSB7XG4gICAgICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShjb25maWdTdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShtc2cuZGF0YSkpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiYXBwbHktbGF5b3V0XCIpIHtcbiAgICAgICAgaWYgKG5vZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudENvbnRlaW5lciA9IG5vZGVbMF0ucGFyZW50O1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAobm9kZSwgcGFyZW50Q29udGVpbmVyKTtcbiAgICAgICAgICAgIGZyYW1lLnggPSBncm91cC54O1xuICAgICAgICAgICAgZnJhbWUueSA9IGdyb3VwLnk7XG4gICAgICAgICAgICBmcmFtZS5iYWNrZ3JvdW5kcyA9IFtdO1xuICAgICAgICAgICAgZnJhbWUucmVzaXplKGdyb3VwLndpZHRoLCBncm91cC5oZWlnaHQpO1xuICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoZnJhbWUsIG1zZy5kYXRhKTtcbiAgICAgICAgICAgIGxldCBzb3J0ZWROb2RlcyA9IHNvcnROb2Rlc0J5UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzb3J0ZWROb2Rlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhcmVudENvbnRlaW5lci5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbZnJhbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09IFwiRlJBTUVcIikgfHxcbiAgICAgICAgICAgIChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09IFwiQ09NUE9ORU5UXCIpKSB7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBub2RlWzBdO1xuICAgICAgICAgICAgc2V0TGF5b3V0UHJvcHMoZnJhbWUsIG1zZy5kYXRhLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlLmxlbmd0aCA9PT0gMSAmJiBub2RlWzBdLnR5cGUgPT09IFwiSU5TVEFOQ0VcIikge1xuICAgICAgICAgICAgbG9nLndhcm4oXCJQbGVhc2Ugc2VsZWN0IHRoZSBtYXN0ZXIgY29tcG9uZW50XCIsIHRydWUsIDQwMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKFwiUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCB0d28gYmxvY2tzXCIsIHRydWUsIDQwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJ1cGRhdGUtYWxsXCIpIHtcbiAgICAgICAgbGV0IHBhZ2UgPSBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICAgICAgbG9nLmN1c3RvbShcIvCfpYFcIiwgXCJVcGRhdGluZyBhbGwgbGF5b3V0c1wiLCB0cnVlLCAyMDAwKTtcbiAgICAgICAgbXNnLmRhdGEubGF5b3V0cy5tYXAoTGF5b3V0RGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgbGF5b3V0cyA9IHBhZ2UuZmluZEFsbChuID0+IG4ubmFtZS5pbmNsdWRlcyhMYXlvdXREYXRhLmhvb2tOYW1lKSk7XG4gICAgICAgICAgICBpZiAobGF5b3V0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRzLm1hcChMYXlvdXRGcmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldExheW91dFByb3BzKExheW91dEZyYW1lLCBMYXlvdXREYXRhLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9