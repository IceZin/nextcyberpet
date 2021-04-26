webpackHotUpdate_N_E("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.module.scss */ "./src/pages/index.module.scss");
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Box */ "./src/components/Box/index.tsx");
/* harmony import */ var _components_BoxButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/BoxButton */ "./src/components/BoxButton/index.tsx");

var _jsxFileName = "C:\\Users\\victo\\Documents\\GitHub\\nextcyberpet\\src\\pages\\index.tsx";



function Home() {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: _index_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.content,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Monitoramento & Controle",
      displayType: "grid",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxButton__WEBPACK_IMPORTED_MODULE_3__["BoxButton"], {
        src: "/lightbulb-solid.svg",
        title: "Iluminacao"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 9,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxButton__WEBPACK_IMPORTED_MODULE_3__["BoxButton"], {
        src: "/bone-solid.svg",
        title: "Alimentacao"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxButton__WEBPACK_IMPORTED_MODULE_3__["BoxButton"], {
        src: "/video-solid.svg",
        title: "Camera"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxButton__WEBPACK_IMPORTED_MODULE_3__["BoxButton"], {
        src: "/thermometer-half-solid.svg",
        title: "Temperatura"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Controle Rapido",
      displayType: "flex"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Camera interna",
      displayType: "flex"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
_c = Home;

var _c;

$RefreshReg$(_c, "Home");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2luZGV4LnRzeCJdLCJuYW1lcyI6WyJIb21lIiwic3R5bGVzIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFZSxTQUFTQSxJQUFULEdBQWdCO0FBQzdCLHNCQUNFO0FBQUssYUFBUyxFQUFFQyx5REFBTSxDQUFDQyxPQUF2QjtBQUFBLDRCQUNFLHFFQUFDLG1EQUFEO0FBQUssVUFBSSxFQUFDLDBCQUFWO0FBQXFDLGlCQUFXLEVBQUMsTUFBakQ7QUFBQSw4QkFDRSxxRUFBQywrREFBRDtBQUFXLFdBQUcsRUFBQyxzQkFBZjtBQUFzQyxhQUFLLEVBQUM7QUFBNUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQURGLGVBRUUscUVBQUMsK0RBQUQ7QUFBVyxXQUFHLEVBQUMsaUJBQWY7QUFBaUMsYUFBSyxFQUFDO0FBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FGRixlQUdFLHFFQUFDLCtEQUFEO0FBQVcsV0FBRyxFQUFDLGtCQUFmO0FBQWtDLGFBQUssRUFBQztBQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSEYsZUFJRSxxRUFBQywrREFBRDtBQUFXLFdBQUcsRUFBQyw2QkFBZjtBQUE2QyxhQUFLLEVBQUM7QUFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLGVBUUUscUVBQUMsbURBQUQ7QUFBSyxVQUFJLEVBQUMsaUJBQVY7QUFBNEIsaUJBQVcsRUFBQztBQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBUkYsZUFZRSxxRUFBQyxtREFBRDtBQUFLLFVBQUksRUFBQyxnQkFBVjtBQUEyQixpQkFBVyxFQUFDO0FBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFaRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWtCRDtLQW5CdUJGLEkiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguYzQxMzEzNDE1MGIyMGFmZjgzYWUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZXMgZnJvbSAnLi9pbmRleC5tb2R1bGUuc2NzcydcbmltcG9ydCB7Qm94fSBmcm9tICcuLi9jb21wb25lbnRzL0JveCdcbmltcG9ydCB7Qm94QnV0dG9ufSBmcm9tICcuLi9jb21wb25lbnRzL0JveEJ1dHRvbidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PlxuICAgICAgPEJveCBuYW1lPVwiTW9uaXRvcmFtZW50byAmIENvbnRyb2xlXCIgZGlzcGxheVR5cGU9XCJncmlkXCI+XG4gICAgICAgIDxCb3hCdXR0b24gc3JjPVwiL2xpZ2h0YnVsYi1zb2xpZC5zdmdcIiB0aXRsZT1cIklsdW1pbmFjYW9cIj48L0JveEJ1dHRvbj5cbiAgICAgICAgPEJveEJ1dHRvbiBzcmM9XCIvYm9uZS1zb2xpZC5zdmdcIiB0aXRsZT1cIkFsaW1lbnRhY2FvXCI+PC9Cb3hCdXR0b24+XG4gICAgICAgIDxCb3hCdXR0b24gc3JjPVwiL3ZpZGVvLXNvbGlkLnN2Z1wiIHRpdGxlPVwiQ2FtZXJhXCI+PC9Cb3hCdXR0b24+XG4gICAgICAgIDxCb3hCdXR0b24gc3JjPVwiL3RoZXJtb21ldGVyLWhhbGYtc29saWQuc3ZnXCIgdGl0bGU9XCJUZW1wZXJhdHVyYVwiPjwvQm94QnV0dG9uPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3ggbmFtZT1cIkNvbnRyb2xlIFJhcGlkb1wiIGRpc3BsYXlUeXBlPVwiZmxleFwiPlxuXG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBuYW1lPVwiQ2FtZXJhIGludGVybmFcIiBkaXNwbGF5VHlwZT1cImZsZXhcIj5cblxuICAgICAgPC9Cb3g+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=