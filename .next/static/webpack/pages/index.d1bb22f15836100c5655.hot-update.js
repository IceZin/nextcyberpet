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
/* harmony import */ var _components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/BoxHrefButton */ "./src/components/BoxHrefButton/index.tsx");

var _jsxFileName = "C:\\Users\\victo\\Documents\\GitHub\\nextcyberpet\\src\\pages\\index.tsx";



function Home() {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: _index_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.content,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Monitoramento & Controle",
      displayType: "grid",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_3__["BoxHrefButton"], {
        src: "/lightbulb-solid.svg",
        title: "Iluminacao",
        href: "/monitor/light"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 9,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_3__["BoxHrefButton"], {
        src: "/bone-solid.svg",
        title: "Alimentacao",
        href: "/monitor/light"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_3__["BoxHrefButton"], {
        src: "/video-solid.svg",
        title: "Camera",
        href: "/monitor/light"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_3__["BoxHrefButton"], {
        src: "/thermometer-half-solid.svg",
        title: "Temperatura",
        href: "/monitor/light"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2luZGV4LnRzeCJdLCJuYW1lcyI6WyJIb21lIiwic3R5bGVzIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFZSxTQUFTQSxJQUFULEdBQWdCO0FBQzdCLHNCQUNFO0FBQUssYUFBUyxFQUFFQyx5REFBTSxDQUFDQyxPQUF2QjtBQUFBLDRCQUNFLHFFQUFDLG1EQUFEO0FBQUssVUFBSSxFQUFDLDBCQUFWO0FBQXFDLGlCQUFXLEVBQUMsTUFBakQ7QUFBQSw4QkFDRSxxRUFBQyx1RUFBRDtBQUFlLFdBQUcsRUFBQyxzQkFBbkI7QUFBMEMsYUFBSyxFQUFDLFlBQWhEO0FBQTZELFlBQUksRUFBQztBQUFsRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsZUFFRSxxRUFBQyx1RUFBRDtBQUFlLFdBQUcsRUFBQyxpQkFBbkI7QUFBcUMsYUFBSyxFQUFDLGFBQTNDO0FBQXlELFlBQUksRUFBQztBQUE5RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBRkYsZUFHRSxxRUFBQyx1RUFBRDtBQUFlLFdBQUcsRUFBQyxrQkFBbkI7QUFBc0MsYUFBSyxFQUFDLFFBQTVDO0FBQXFELFlBQUksRUFBQztBQUExRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSEYsZUFJRSxxRUFBQyx1RUFBRDtBQUFlLFdBQUcsRUFBQyw2QkFBbkI7QUFBaUQsYUFBSyxFQUFDLGFBQXZEO0FBQXFFLFlBQUksRUFBQztBQUExRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFRRSxxRUFBQyxtREFBRDtBQUFLLFVBQUksRUFBQyxpQkFBVjtBQUE0QixpQkFBVyxFQUFDO0FBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFSRixlQVlFLHFFQUFDLG1EQUFEO0FBQUssVUFBSSxFQUFDLGdCQUFWO0FBQTJCLGlCQUFXLEVBQUM7QUFBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBa0JEO0tBbkJ1QkYsSSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9pbmRleC5kMWJiMjJmMTU4MzYxMDBjNTY1NS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlcyBmcm9tICcuL2luZGV4Lm1vZHVsZS5zY3NzJ1xuaW1wb3J0IHtCb3h9IGZyb20gJy4uL2NvbXBvbmVudHMvQm94J1xuaW1wb3J0IHtCb3hIcmVmQnV0dG9ufSBmcm9tICcuLi9jb21wb25lbnRzL0JveEhyZWZCdXR0b24nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250ZW50fT5cbiAgICAgIDxCb3ggbmFtZT1cIk1vbml0b3JhbWVudG8gJiBDb250cm9sZVwiIGRpc3BsYXlUeXBlPVwiZ3JpZFwiPlxuICAgICAgICA8Qm94SHJlZkJ1dHRvbiBzcmM9XCIvbGlnaHRidWxiLXNvbGlkLnN2Z1wiIHRpdGxlPVwiSWx1bWluYWNhb1wiIGhyZWY9XCIvbW9uaXRvci9saWdodFwiPjwvQm94SHJlZkJ1dHRvbj5cbiAgICAgICAgPEJveEhyZWZCdXR0b24gc3JjPVwiL2JvbmUtc29saWQuc3ZnXCIgdGl0bGU9XCJBbGltZW50YWNhb1wiIGhyZWY9XCIvbW9uaXRvci9saWdodFwiPjwvQm94SHJlZkJ1dHRvbj5cbiAgICAgICAgPEJveEhyZWZCdXR0b24gc3JjPVwiL3ZpZGVvLXNvbGlkLnN2Z1wiIHRpdGxlPVwiQ2FtZXJhXCIgaHJlZj1cIi9tb25pdG9yL2xpZ2h0XCI+PC9Cb3hIcmVmQnV0dG9uPlxuICAgICAgICA8Qm94SHJlZkJ1dHRvbiBzcmM9XCIvdGhlcm1vbWV0ZXItaGFsZi1zb2xpZC5zdmdcIiB0aXRsZT1cIlRlbXBlcmF0dXJhXCIgaHJlZj1cIi9tb25pdG9yL2xpZ2h0XCI+PC9Cb3hIcmVmQnV0dG9uPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3ggbmFtZT1cIkNvbnRyb2xlIFJhcGlkb1wiIGRpc3BsYXlUeXBlPVwiZmxleFwiPlxuXG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBuYW1lPVwiQ2FtZXJhIGludGVybmFcIiBkaXNwbGF5VHlwZT1cImZsZXhcIj5cblxuICAgICAgPC9Cb3g+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=