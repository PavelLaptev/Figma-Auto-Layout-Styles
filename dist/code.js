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

figma.showUI(__html__, { width: 340, height: 640 });
figma.ui.onmessage = async (msg) => {
    let node = figma.currentPage.selection;
    if (msg.type === "apply-composition") {
        if (node.length > 1) {
            let parentConteiner = node[0].parent;
            let frame = figma.createFrame();
            frame.name = `${msg.data.hookName}`;
            const group = figma.group(node, parentConteiner);
            frame.x = group.x;
            frame.y = group.y;
            frame.layoutMode = "VERTICAL";
            frame.resize(group.width, group.height);
            frame.primaryAxisSizingMode = "AUTO";
            frame.paddingTop = msg.data.space.top;
            frame.paddingRight = msg.data.space.right;
            frame.paddingBottom = msg.data.space.bottom;
            frame.paddingLeft = msg.data.space.left;
            frame.itemSpacing = msg.data.space.between;
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
                frame.name = `${msg.data.hookName}`;
                frame.paddingTop = msg.data.space.top;
                frame.paddingRight = msg.data.space.right;
                frame.paddingBottom = msg.data.space.bottom;
                frame.paddingLeft = msg.data.space.left;
                frame.itemSpacing = msg.data.space.between;
            }
        }
        else {
            _utils__WEBPACK_IMPORTED_MODULE_0__["log"].error("Please select at least two blocks");
        }
    }
};


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

/***/ "./src/utils/index.tsx":
/*!*****************************!*\
  !*** ./src/utils/index.tsx ***!
  \*****************************/
/*! exports provided: log, sortNodesByPosition, getBeforeSuffix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "./src/utils/log.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "log", function() { return _log__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _sortNodesByPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sortNodesByPosition */ "./src/utils/sortNodesByPosition.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortNodesByPosition", function() { return _sortNodesByPosition__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _getBeforeSuffix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getBeforeSuffix */ "./src/utils/getBeforeSuffix.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBeforeSuffix", function() { return _getBeforeSuffix__WEBPACK_IMPORTED_MODULE_2__["default"]; });






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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZXRCZWZvcmVTdWZmaXgudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2xvZy50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3NvcnROb2Rlc0J5UG9zaXRpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFvRDtBQUNwRCx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQkFBa0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrRUFBbUI7QUFDakQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrQkFBa0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQUc7QUFDZjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDZSw4RUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDSC9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVDO0FBQ2dDO0FBQ1I7Ozs7Ozs7Ozs7Ozs7QUNGL0Q7QUFBQSxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDBCQUEwQixLQUFLO0FBQy9CO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssMENBQTBDLEVBQUUsVUFBVTtBQUMxRjtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssd0NBQXdDLEVBQUUsVUFBVTtBQUN4RjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0JBQStCLEtBQUssbUNBQW1DLEVBQUUsVUFBVTtBQUNuRjtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDZSxrRUFBRyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDNUNuQjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDZSxrRkFBbUIsRUFBQyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGx1Z2luL2NvbnRyb2xsZXIudHNcIik7XG4iLCJpbXBvcnQgeyBsb2csIHNvcnROb2Rlc0J5UG9zaXRpb24gfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB3aWR0aDogMzQwLCBoZWlnaHQ6IDY0MCB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IGFzeW5jIChtc2cpID0+IHtcbiAgICBsZXQgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiYXBwbHktY29tcG9zaXRpb25cIikge1xuICAgICAgICBpZiAobm9kZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50Q29udGVpbmVyID0gbm9kZVswXS5wYXJlbnQ7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgZnJhbWUubmFtZSA9IGAke21zZy5kYXRhLmhvb2tOYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKG5vZGUsIHBhcmVudENvbnRlaW5lcik7XG4gICAgICAgICAgICBmcmFtZS54ID0gZ3JvdXAueDtcbiAgICAgICAgICAgIGZyYW1lLnkgPSBncm91cC55O1xuICAgICAgICAgICAgZnJhbWUubGF5b3V0TW9kZSA9IFwiVkVSVElDQUxcIjtcbiAgICAgICAgICAgIGZyYW1lLnJlc2l6ZShncm91cC53aWR0aCwgZ3JvdXAuaGVpZ2h0KTtcbiAgICAgICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IG1zZy5kYXRhLnNwYWNlLnRvcDtcbiAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IG1zZy5kYXRhLnNwYWNlLnJpZ2h0O1xuICAgICAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IG1zZy5kYXRhLnNwYWNlLmJvdHRvbTtcbiAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gbXNnLmRhdGEuc3BhY2UubGVmdDtcbiAgICAgICAgICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gbXNnLmRhdGEuc3BhY2UuYmV0d2VlbjtcbiAgICAgICAgICAgIGxldCBzb3J0ZWROb2RlcyA9IHNvcnROb2Rlc0J5UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzb3J0ZWROb2Rlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhcmVudENvbnRlaW5lci5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbZnJhbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUubGVuZ3RoID09PSAxICYmIG5vZGVbMF0udHlwZSA9PT0gXCJGUkFNRVwiKSB7XG4gICAgICAgICAgICBpZiAobm9kZVswXS5sYXlvdXRNb2RlID09PSBcIlZFUlRJQ0FMXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWUgPSBub2RlWzBdO1xuICAgICAgICAgICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgICAgIGZyYW1lLm5hbWUgPSBgJHttc2cuZGF0YS5ob29rTmFtZX1gO1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdUb3AgPSBtc2cuZGF0YS5zcGFjZS50b3A7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gbXNnLmRhdGEuc3BhY2UucmlnaHQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IG1zZy5kYXRhLnNwYWNlLmJvdHRvbTtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nTGVmdCA9IG1zZy5kYXRhLnNwYWNlLmxlZnQ7XG4gICAgICAgICAgICAgICAgZnJhbWUuaXRlbVNwYWNpbmcgPSBtc2cuZGF0YS5zcGFjZS5iZXR3ZWVuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKFwiUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCB0d28gYmxvY2tzXCIpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsImNvbnN0IGdldEJlZm9yZVN1ZmZpeCA9IChzdHIsIGNoZWNrU3ltYm9sKSA9PiB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgc3RyLmluZGV4T2YoY2hlY2tTeW1ib2wpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZXRCZWZvcmVTdWZmaXg7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzb3J0Tm9kZXNCeVBvc2l0aW9uIH0gZnJvbSBcIi4vc29ydE5vZGVzQnlQb3NpdGlvblwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBnZXRCZWZvcmVTdWZmaXggfSBmcm9tIFwiLi9nZXRCZWZvcmVTdWZmaXhcIjtcbiIsImxldCBsb2dTdHlsZXMgPSBcImJvcmRlci1yYWRpdXM6IDRweDsgcGFkZGluZzogMnB4IDRweDtcIjtcbmxldCBsb2dUaW1lID0gODAwO1xuY29uc3QgbG9nID0ge1xuICAgIHN1Y2Nlc3M6ICh0ZXh0LCBzaG93ID0gdHJ1ZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgwLCAyNTUsIDEzNiwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg8J+OiSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogbG9nVGltZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrOiAodGV4dCwgc2hvdyA9IHRydWUpID0+IHtcbiAgICAgICAgc2hvd1xuICAgICAgICAgICAgPyBjb25zb2xlLmxvZyhgJWMke3RleHR9YCwgYGJhY2tncm91bmQ6IHJnYmEoMCwgMjA0LCAyNTUsIDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKchSAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogbG9nVGltZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG5ldXRyYWw6ICh0ZXh0LCBzaG93ID0gdHJ1ZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE0KTske2xvZ1N0eWxlc31gKVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogbG9nVGltZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHdhcm46ICh0ZXh0LCBzaG93ID0gdHJ1ZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgyNTUsIDEyMywgMCwgMC4xNCk7JHtsb2dTdHlsZXN9YClcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIGZpZ21hLm5vdGlmeShg4pii77iPICR7dGV4dH1gLCB7XG4gICAgICAgICAgICB0aW1lb3V0OiBsb2dUaW1lXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3I6ICh0ZXh0LCBzaG93ID0gdHJ1ZSkgPT4ge1xuICAgICAgICBzaG93XG4gICAgICAgICAgICA/IGNvbnNvbGUubG9nKGAlYyR7dGV4dH1gLCBgYmFja2dyb3VuZDogcmdiYSgyNTUsMCwwLDAuMTQpOyR7bG9nU3R5bGVzfWApXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYOKblO+4jyAke3RleHR9YCwge1xuICAgICAgICAgICAgdGltZW91dDogbG9nVGltZVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9nO1xuIiwiY29uc3Qgc29ydE5vZGVzQnlQb3NpdGlvbiA9IG5vZGVzID0+IHtcbiAgICB2YXIgcmVzdWx0ID0gbm9kZXMubWFwKHggPT4geCk7XG4gICAgcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQueCAtIG5leHQueDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoKGN1cnJlbnQsIG5leHQpID0+IGN1cnJlbnQueSAtIG5leHQueSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ydE5vZGVzQnlQb3NpdGlvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=