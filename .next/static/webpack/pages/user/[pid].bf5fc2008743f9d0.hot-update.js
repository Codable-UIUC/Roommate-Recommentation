"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/user/[pid]",{

/***/ "./components/NavBar.tsx":
/*!*******************************!*\
  !*** ./components/NavBar.tsx ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NavBar; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _NavBar_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavBar.module.css */ \"./components/NavBar.module.css\");\n/* harmony import */ var _NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\n\nlet audioPlayer = null;\nif (true) {\n    audioPlayer = new Audio(\"/sample_audio.mp3\");\n    audioPlayer.volume = 0.4;\n}\nfunction NavBar(param) {\n    let { children  } = param;\n    _s();\n    const [clientPos, setClientPos] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        0,\n        0\n    ]);\n    const [displayPointer, setDisplayPointer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isPending, transition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();\n    const pointer = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            position: \"fixed\",\n            left: clientPos[0],\n            top: clientPos[1]\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n            src: \"/alien.ico\"\n        }, void 0, false, {\n            fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n            lineNumber: 20,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default().navbar),\n        children: [\n            displayPointer ? pointer : null,\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default().one)\n            }, void 0, false, {\n                fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default().two),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: (_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default().title),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        href: \"/\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: \"/roomie.png\",\n                            alt: \"roomie\",\n                            className: (_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default().image)\n                        }, void 0, false, {\n                            fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n                            lineNumber: 34,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_NavBar_module_css__WEBPACK_IMPORTED_MODULE_2___default().three),\n                onMouseOver: (e)=>{\n                    transition(()=>{\n                        setClientPos([\n                            e.clientX,\n                            e.clientY\n                        ]);\n                    });\n                    setDisplayPointer(true);\n                },\n                onMouseOut: ()=>{\n                    setDisplayPointer(false);\n                },\n                onTouchStart: ()=>{\n                    if (audioPlayer) {\n                        audioPlayer.play();\n                    }\n                },\n                onMouseDown: ()=>{\n                    if (audioPlayer) {\n                        audioPlayer.play();\n                    }\n                }\n            }, void 0, false, {\n                fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/chaehoonkim/Projects/prod/Roommate-Recommentation/components/NavBar.tsx\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this);\n}\n_s(NavBar, \"o693P6nCpD3dyBWdG9uPT7XTAFk=\", false, function() {\n    return [\n        react__WEBPACK_IMPORTED_MODULE_1__.useTransition\n    ];\n});\n_c = NavBar;\nvar _c;\n$RefreshReg$(_c, \"NavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdkJhci50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUF5QztBQUNLO0FBRTlDLElBQUlHLGNBQWtCLElBQUk7QUFFMUIsSUFBSSxJQUE2QixFQUFFO0lBQ2pDQSxjQUFjLElBQUlDLE1BQU07SUFDeEJELFlBQVlFLE1BQU0sR0FBRztBQUN2QixDQUFDO0FBSWMsU0FBU0MsT0FBTyxLQUFpQixFQUFFO1FBQW5CLEVBQUVDLFNBQVEsRUFBTyxHQUFqQjs7SUFDN0IsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdSLCtDQUFRQSxDQUFXO1FBQUM7UUFBRztLQUFFO0lBQzNELE1BQU0sQ0FBQ1MsZ0JBQWdCQyxrQkFBa0IsR0FBR1YsK0NBQVFBLENBQVUsS0FBSztJQUNuRSxNQUFNLENBQUNXLFdBQVdDLFdBQVcsR0FBR1gsb0RBQWFBO0lBRTdDLE1BQU1ZLHdCQUNKLDhEQUFDQztRQUFJQyxPQUFPO1lBQUVDLFVBQVU7WUFBU0MsTUFBTVYsU0FBUyxDQUFDLEVBQUU7WUFBRVcsS0FBS1gsU0FBUyxDQUFDLEVBQUU7UUFBQztrQkFDckUsNEVBQUNZO1lBQUlDLEtBQUk7Ozs7Ozs7Ozs7O0lBSWIscUJBQ0UsOERBQUNOO1FBQUlPLFdBQVd0QixrRUFBYTs7WUFDMUJVLGlCQUFpQkksVUFBVSxJQUFJOzBCQUVoQyw4REFBQ0M7Z0JBQUlPLFdBQVd0QiwrREFBVTs7Ozs7OzBCQUcxQiw4REFBQ2U7Z0JBQUlPLFdBQVd0QiwrREFBVTswQkFDeEIsNEVBQUMwQjtvQkFBR0osV0FBV3RCLGlFQUFZOzhCQUMzQiw0RUFBQzRCO3dCQUFFQyxNQUFLO2tDQUNOLDRFQUFDVDs0QkFDQ0MsS0FBSTs0QkFDSlMsS0FBSTs0QkFDSlIsV0FBV3RCLGlFQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSzdCLDhEQUFDZTtnQkFDQ08sV0FBV3RCLGlFQUFZO2dCQUV2QmlDLGFBQWEsQ0FBQ0MsSUFBTTtvQkFDbEJyQixXQUFXLElBQU07d0JBQ2ZKLGFBQWE7NEJBQUN5QixFQUFFQyxPQUFPOzRCQUFFRCxFQUFFRSxPQUFPO3lCQUFDO29CQUNyQztvQkFDQXpCLGtCQUFrQixJQUFJO2dCQUN4QjtnQkFDQTBCLFlBQVksSUFBTTtvQkFDaEIxQixrQkFBa0IsS0FBSztnQkFDekI7Z0JBRUEyQixjQUFlLElBQU07b0JBQ25CLElBQUluQyxhQUFhO3dCQUNmQSxZQUFZb0MsSUFBSTtvQkFDbEIsQ0FBQztnQkFDSDtnQkFFQUMsYUFBYyxJQUFLO29CQUNqQixJQUFJckMsYUFBYTt3QkFDZkEsWUFBWW9DLElBQUk7b0JBQ2xCLENBQUM7Z0JBR0g7Ozs7Ozs7Ozs7OztBQU1SLENBQUM7R0E1RHVCakM7O1FBR1VKLGdEQUFhQTs7O0tBSHZCSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL05hdkJhci50c3g/MzAyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVzIGZyb20gXCIuL05hdkJhci5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSx1c2VUcmFuc2l0aW9ufSBmcm9tIFwicmVhY3RcIjtcblxubGV0IGF1ZGlvUGxheWVyOmFueSA9IG51bGxcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgYXVkaW9QbGF5ZXIgPSBuZXcgQXVkaW8oXCIvc2FtcGxlX2F1ZGlvLm1wM1wiKVxuICBhdWRpb1BsYXllci52b2x1bWUgPSAwLjRcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdkJhcih7IGNoaWxkcmVuIH06IGFueSkge1xuICBjb25zdCBbY2xpZW50UG9zLCBzZXRDbGllbnRQb3NdID0gdXNlU3RhdGU8bnVtYmVyW10+KFswLCAwXSk7XG4gIGNvbnN0IFtkaXNwbGF5UG9pbnRlciwgc2V0RGlzcGxheVBvaW50ZXJdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbaXNQZW5kaW5nLCB0cmFuc2l0aW9uXSA9IHVzZVRyYW5zaXRpb24oKVxuXG4gIGNvbnN0IHBvaW50ZXIgPSAoXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogXCJmaXhlZFwiLCBsZWZ0OiBjbGllbnRQb3NbMF0sIHRvcDogY2xpZW50UG9zWzFdIH19PlxuICAgICAgPGltZyBzcmM9XCIvYWxpZW4uaWNvXCIgLz5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubmF2YmFyfT5cbiAgICAgIHtkaXNwbGF5UG9pbnRlciA/IHBvaW50ZXIgOiBudWxsfVxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm9uZX0+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50d299PlxuICAgICAgICA8aDEgY2xhc3NOYW1lPXtzdHlsZXMudGl0bGV9PlxuICAgICAgICA8YSBocmVmPVwiL1wiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi9yb29taWUucG5nXCJcbiAgICAgICAgICAgIGFsdD1cInJvb21pZVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5pbWFnZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIDwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMudGhyZWV9XG5cbiAgICAgICAgb25Nb3VzZU92ZXI9eyhlKSA9PiB7XG4gICAgICAgICAgdHJhbnNpdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBzZXRDbGllbnRQb3MoW2UuY2xpZW50WCwgZS5jbGllbnRZXSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZXREaXNwbGF5UG9pbnRlcih0cnVlKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZU91dD17KCkgPT4ge1xuICAgICAgICAgIHNldERpc3BsYXlQb2ludGVyKGZhbHNlKTtcbiAgICAgICAgfX1cblxuICAgICAgICBvblRvdWNoU3RhcnQgPXsoKSA9PiB7XG4gICAgICAgICAgaWYgKGF1ZGlvUGxheWVyKSB7XG4gICAgICAgICAgICBhdWRpb1BsYXllci5wbGF5KClcbiAgICAgICAgICB9XG4gICAgICAgIH19XG5cbiAgICAgICAgb25Nb3VzZURvd24gPXsoKT0+IHtcbiAgICAgICAgICBpZiAoYXVkaW9QbGF5ZXIpIHtcbiAgICAgICAgICAgIGF1ZGlvUGxheWVyLnBsYXkoKVxuICAgICAgICAgIH1cblxuXG4gICAgICAgIH19XG5cblxuICAgICAgPjwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInN0eWxlcyIsInVzZVN0YXRlIiwidXNlVHJhbnNpdGlvbiIsImF1ZGlvUGxheWVyIiwiQXVkaW8iLCJ2b2x1bWUiLCJOYXZCYXIiLCJjaGlsZHJlbiIsImNsaWVudFBvcyIsInNldENsaWVudFBvcyIsImRpc3BsYXlQb2ludGVyIiwic2V0RGlzcGxheVBvaW50ZXIiLCJpc1BlbmRpbmciLCJ0cmFuc2l0aW9uIiwicG9pbnRlciIsImRpdiIsInN0eWxlIiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiaW1nIiwic3JjIiwiY2xhc3NOYW1lIiwibmF2YmFyIiwib25lIiwidHdvIiwiaDEiLCJ0aXRsZSIsImEiLCJocmVmIiwiYWx0IiwiaW1hZ2UiLCJ0aHJlZSIsIm9uTW91c2VPdmVyIiwiZSIsImNsaWVudFgiLCJjbGllbnRZIiwib25Nb3VzZU91dCIsIm9uVG91Y2hTdGFydCIsInBsYXkiLCJvbk1vdXNlRG93biJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/NavBar.tsx\n"));

/***/ })

});