webpackHotUpdate_N_E("pages/index",{

/***/ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./node_modules/next/dist/compiled/resolve-url-loader/index.js?!./node_modules/next/dist/compiled/sass-loader/cjs.js?!./src/components/BoxButton/styles.module.scss":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** (webpack)/css-loader/cjs.js??ref--5-oneOf-3-1!(webpack)/postcss-loader/cjs.js??ref--5-oneOf-3-2!(webpack)/resolve-url-loader??ref--5-oneOf-3-3!(webpack)/sass-loader/cjs.js??ref--5-oneOf-3-4!./src/components/BoxButton/styles.module.scss ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/next/dist/compiled/css-loader/api.js */ "./node_modules/next/dist/compiled/css-loader/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".styles_boxButton__36EFo {\n  width: 100%;\n  height: 3rem;\n  background-color: var(--red-100);\n  display: flex;\n  align-items: center;\n  border-radius: 0.3rem;\n  text-decoration: none;\n}\n.styles_boxButton__36EFo img {\n  width: 1.5rem;\n  height: 1.5rem;\n  margin: 0.75rem;\n  color: #fff;\n}", "",{"version":3,"sources":["webpack://styles.module.scss"],"names":[],"mappings":"AAAA;EACI,WAAA;EACA,YAAA;EAEA,gCAAA;EAEA,aAAA;EACA,mBAAA;EAEA,qBAAA;EAEA,qBAAA;AAHJ;AAKI;EACI,aAAA;EACA,cAAA;EAEA,eAAA;EAEA,WAAA;AALR","sourcesContent":[".boxButton {\r\n    width: 100%;\r\n    height: 3rem;\r\n\r\n    background-color: var(--red-100);\r\n\r\n    display: flex;\r\n    align-items: center;\r\n\r\n    border-radius: 0.3rem;\r\n\r\n    text-decoration: none;\r\n\r\n    img {\r\n        width: 1.5rem;\r\n        height: 1.5rem;\r\n\r\n        margin: 0.75rem;\r\n\r\n        color: #fff;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"boxButton": "styles_boxButton__36EFo"
};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./src/components/BoxButton/index.tsx":
/*!********************************************!*\
  !*** ./src/components/BoxButton/index.tsx ***!
  \********************************************/
/*! exports provided: BoxButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxButton", function() { return BoxButton; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/BoxButton/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\victo\\Documents\\GitHub\\nextcyberpet\\src\\components\\BoxButton\\index.tsx";

function BoxButton(props) {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.boxButton,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
      src: props.src,
      alt: ""
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 13
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h3", {
      children: props.title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 9
  }, this);
}
_c = BoxButton;

var _c;

$RefreshReg$(_c, "BoxButton");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ }),

/***/ "./src/components/BoxButton/styles.module.scss":
/*!*****************************************************!*\
  !*** ./src/components/BoxButton/styles.module.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/next/dist/build/webpack/loaders/next-style-loader/runtime/injectStylesIntoStyleTag.js */ "./node_modules/next/dist/build/webpack/loaders/next-style-loader/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/next/dist/compiled/css-loader/cjs.js??ref--5-oneOf-3-1!../../../node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-3-2!../../../node_modules/next/dist/compiled/resolve-url-loader??ref--5-oneOf-3-3!../../../node_modules/next/dist/compiled/sass-loader/cjs.js??ref--5-oneOf-3-4!./styles.module.scss */ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./node_modules/next/dist/compiled/resolve-url-loader/index.js?!./node_modules/next/dist/compiled/sass-loader/cjs.js?!./src/components/BoxButton/styles.module.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = function(element){// These elements should always exist. If they do not,
// this code should fail.
var anchorElement=document.querySelector('#__next_css__DO_NOT_USE__');var parentNode=anchorElement.parentNode;// Normally <head>
// Each style tag should be placed right before our
// anchor. By inserting before and not after, we do not
// need to track the last inserted element.
parentNode.insertBefore(element,anchorElement);};
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a,b,isNamedExport){if(!a&&b||a&&!b){return false;}let p;for(p in a){if(isNamedExport&&p==='default'){// eslint-disable-next-line no-continue
continue;}if(a[p]!==b[p]){return false;}}for(p in b){if(isNamedExport&&p==='default'){// eslint-disable-next-line no-continue
continue;}if(!a[p]){return false;}}return true;};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../../../node_modules/next/dist/compiled/css-loader/cjs.js??ref--5-oneOf-3-1!../../../node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-3-2!../../../node_modules/next/dist/compiled/resolve-url-loader??ref--5-oneOf-3-3!../../../node_modules/next/dist/compiled/sass-loader/cjs.js??ref--5-oneOf-3-4!./styles.module.scss */ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./node_modules/next/dist/compiled/resolve-url-loader/index.js?!./node_modules/next/dist/compiled/sass-loader/cjs.js?!./src/components/BoxButton/styles.module.scss",
      function () {
        content = __webpack_require__(/*! !../../../node_modules/next/dist/compiled/css-loader/cjs.js??ref--5-oneOf-3-1!../../../node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-3-2!../../../node_modules/next/dist/compiled/resolve-url-loader??ref--5-oneOf-3-3!../../../node_modules/next/dist/compiled/sass-loader/cjs.js??ref--5-oneOf-3-4!./styles.module.scss */ "./node_modules/next/dist/compiled/css-loader/cjs.js?!./node_modules/next/dist/compiled/postcss-loader/cjs.js?!./node_modules/next/dist/compiled/resolve-url-loader/index.js?!./node_modules/next/dist/compiled/sass-loader/cjs.js?!./src/components/BoxButton/styles.module.scss");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

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
/* harmony import */ var _components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/BoxHrefButton */ "./src/components/BoxHrefButton/index.tsx");

var _jsxFileName = "C:\\Users\\victo\\Documents\\GitHub\\nextcyberpet\\src\\pages\\index.tsx";




function Home() {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: _index_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.content,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Monitoramento & Controle",
      displayType: "grid",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_4__["BoxHrefButton"], {
        src: "/lightbulb-solid.svg",
        title: "Iluminacao",
        href: "/monitor/light"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_4__["BoxHrefButton"], {
        src: "/bone-solid.svg",
        title: "Alimentacao",
        href: "/monitor/food"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_4__["BoxHrefButton"], {
        src: "/video-solid.svg",
        title: "Camera",
        href: "/monitor/camera"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxHrefButton__WEBPACK_IMPORTED_MODULE_4__["BoxHrefButton"], {
        src: "/thermometer-half-solid.svg",
        title: "Temperatura",
        href: "/monitor/temperature"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Controle Rapido",
      displayType: "flex",
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_BoxButton__WEBPACK_IMPORTED_MODULE_3__["BoxButton"], {
        src: "/moon-solid.svg",
        title: "Modo noturno"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_components_Box__WEBPACK_IMPORTED_MODULE_2__["Box"], {
      name: "Camera interna",
      displayType: "flex"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 8,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQm94QnV0dG9uL3N0eWxlcy5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQm94QnV0dG9uL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQm94QnV0dG9uL3N0eWxlcy5tb2R1bGUuc2Nzcz9mYzUyIiwid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4Il0sIm5hbWVzIjpbIkJveEJ1dHRvbiIsInByb3BzIiwic3R5bGVzIiwiYm94QnV0dG9uIiwic3JjIiwidGl0bGUiLCJIb21lIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxrQ0FBa0MsbUJBQU8sQ0FBQyx1SEFBNEQ7QUFDdEc7QUFDQTtBQUNBLDhCQUE4QixRQUFTLDZCQUE2QixnQkFBZ0IsaUJBQWlCLHFDQUFxQyxrQkFBa0Isd0JBQXdCLDBCQUEwQiwwQkFBMEIsR0FBRyxnQ0FBZ0Msa0JBQWtCLG1CQUFtQixvQkFBb0IsZ0JBQWdCLEdBQUcsT0FBTyxtRkFBbUYsVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxxQ0FBcUMsb0JBQW9CLHFCQUFxQiw2Q0FBNkMsMEJBQTBCLDRCQUE0QixrQ0FBa0Msa0NBQWtDLGlCQUFpQiwwQkFBMEIsMkJBQTJCLGdDQUFnQyw0QkFBNEIsU0FBUyxLQUFLLG1CQUFtQjtBQUNyOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFHTyxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUM3QixzQkFDSTtBQUFRLGFBQVMsRUFBRUMsMERBQU0sQ0FBQ0MsU0FBMUI7QUFBQSw0QkFDSTtBQUFLLFNBQUcsRUFBRUYsS0FBSyxDQUFDRyxHQUFoQjtBQUFxQixTQUFHLEVBQUM7QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURKLGVBRUk7QUFBQSxnQkFBS0gsS0FBSyxDQUFDSTtBQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFESjtBQU1IO0tBUGVMLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hoQixVQUFVLG1CQUFPLENBQUMseU5BQThHO0FBQ2hJLDBCQUEwQixtQkFBTyxDQUFDLHltQkFBMlY7O0FBRTdYOztBQUVBO0FBQ0EsMEJBQTBCLFFBQVM7QUFDbkM7O0FBRUE7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0Esc0VBQXNFLHdDQUF3QztBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSxJQUFJLElBQVU7QUFDZDtBQUNBLGtFQUFrRSxpQkFBaUIsY0FBYyxNQUFNLFlBQVksaUNBQWlDO0FBQ3BKLFVBQVUsZ0JBQWdCLGVBQWUsWUFBWSxpQ0FBaUM7QUFDdEYsVUFBVSxVQUFVLGVBQWU7QUFDbkM7O0FBRUE7QUFDQSxNQUFNLHltQkFBMlY7QUFDalc7QUFDQSxrQkFBa0IsbUJBQU8sQ0FBQyx5bUJBQTJWOztBQUVyWDs7QUFFQTtBQUNBLDRCQUE0QixRQUFTO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLHNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLFNBQVNNLElBQVQsR0FBZ0I7QUFDN0Isc0JBQ0U7QUFBSyxhQUFTLEVBQUVKLHlEQUFNLENBQUNLLE9BQXZCO0FBQUEsNEJBQ0UscUVBQUMsbURBQUQ7QUFBSyxVQUFJLEVBQUMsMEJBQVY7QUFBcUMsaUJBQVcsRUFBQyxNQUFqRDtBQUFBLDhCQUNFLHFFQUFDLHVFQUFEO0FBQWUsV0FBRyxFQUFDLHNCQUFuQjtBQUEwQyxhQUFLLEVBQUMsWUFBaEQ7QUFBNkQsWUFBSSxFQUFDO0FBQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixlQUVFLHFFQUFDLHVFQUFEO0FBQWUsV0FBRyxFQUFDLGlCQUFuQjtBQUFxQyxhQUFLLEVBQUMsYUFBM0M7QUFBeUQsWUFBSSxFQUFDO0FBQTlEO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FGRixlQUdFLHFFQUFDLHVFQUFEO0FBQWUsV0FBRyxFQUFDLGtCQUFuQjtBQUFzQyxhQUFLLEVBQUMsUUFBNUM7QUFBcUQsWUFBSSxFQUFDO0FBQTFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FIRixlQUlFLHFFQUFDLHVFQUFEO0FBQWUsV0FBRyxFQUFDLDZCQUFuQjtBQUFpRCxhQUFLLEVBQUMsYUFBdkQ7QUFBcUUsWUFBSSxFQUFDO0FBQTFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQVFFLHFFQUFDLG1EQUFEO0FBQUssVUFBSSxFQUFDLGlCQUFWO0FBQTRCLGlCQUFXLEVBQUMsTUFBeEM7QUFBQSw2QkFDRSxxRUFBQywrREFBRDtBQUFXLFdBQUcsRUFBQyxpQkFBZjtBQUFpQyxhQUFLLEVBQUM7QUFBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFSRixlQVlFLHFFQUFDLG1EQUFEO0FBQUssVUFBSSxFQUFDLGdCQUFWO0FBQTJCLGlCQUFXLEVBQUM7QUFBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBa0JEO0tBbkJ1QkQsSSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9pbmRleC43MDI3ZDliODYxYjA0MGIxZjAyYi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL2Nzcy1sb2FkZXIvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKHRydWUpO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLnN0eWxlc19ib3hCdXR0b25fXzM2RUZvIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLTEwMCk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuLnN0eWxlc19ib3hCdXR0b25fXzM2RUZvIGltZyB7XFxuICB3aWR0aDogMS41cmVtO1xcbiAgaGVpZ2h0OiAxLjVyZW07XFxuICBtYXJnaW46IDAuNzVyZW07XFxuICBjb2xvcjogI2ZmZjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovL3N0eWxlcy5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBRUEsZ0NBQUE7RUFFQSxhQUFBO0VBQ0EsbUJBQUE7RUFFQSxxQkFBQTtFQUVBLHFCQUFBO0FBSEo7QUFLSTtFQUNJLGFBQUE7RUFDQSxjQUFBO0VBRUEsZUFBQTtFQUVBLFdBQUE7QUFMUlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuYm94QnV0dG9uIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogM3JlbTtcXHJcXG5cXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLTEwMCk7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXHJcXG5cXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcblxcclxcbiAgICBpbWcge1xcclxcbiAgICAgICAgd2lkdGg6IDEuNXJlbTtcXHJcXG4gICAgICAgIGhlaWdodDogMS41cmVtO1xcclxcblxcclxcbiAgICAgICAgbWFyZ2luOiAwLjc1cmVtO1xcclxcblxcclxcbiAgICAgICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5sb2NhbHMgPSB7XG5cdFwiYm94QnV0dG9uXCI6IFwic3R5bGVzX2JveEJ1dHRvbl9fMzZFRm9cIlxufTtcbm1vZHVsZS5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJpbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEJveEJ1dHRvbihwcm9wcykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmJveEJ1dHRvbn0+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPXtwcm9wcy5zcmN9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgPGgzPntwcm9wcy50aXRsZX08L2gzPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgKVxyXG59IiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1zdHlsZS1sb2FkZXIvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvY3NzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0zLTEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9wb3N0Y3NzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0zLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanM/P3JlZi0tNS1vbmVPZi0zLTMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9zYXNzLWxvYWRlci9janMuanM/P3JlZi0tNS1vbmVPZi0zLTQhLi9zdHlsZXMubW9kdWxlLnNjc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBmdW5jdGlvbihlbGVtZW50KXsvLyBUaGVzZSBlbGVtZW50cyBzaG91bGQgYWx3YXlzIGV4aXN0LiBJZiB0aGV5IGRvIG5vdCxcbi8vIHRoaXMgY29kZSBzaG91bGQgZmFpbC5cbnZhciBhbmNob3JFbGVtZW50PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNfX25leHRfY3NzX19ET19OT1RfVVNFX18nKTt2YXIgcGFyZW50Tm9kZT1hbmNob3JFbGVtZW50LnBhcmVudE5vZGU7Ly8gTm9ybWFsbHkgPGhlYWQ+XG4vLyBFYWNoIHN0eWxlIHRhZyBzaG91bGQgYmUgcGxhY2VkIHJpZ2h0IGJlZm9yZSBvdXJcbi8vIGFuY2hvci4gQnkgaW5zZXJ0aW5nIGJlZm9yZSBhbmQgbm90IGFmdGVyLCB3ZSBkbyBub3Rcbi8vIG5lZWQgdG8gdHJhY2sgdGhlIGxhc3QgaW5zZXJ0ZWQgZWxlbWVudC5cbnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsYW5jaG9yRWxlbWVudCk7fTtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgaWYgKCFjb250ZW50LmxvY2FscyB8fCBtb2R1bGUuaG90LmludmFsaWRhdGUpIHtcbiAgICB2YXIgaXNFcXVhbExvY2FscyA9IGZ1bmN0aW9uIGlzRXF1YWxMb2NhbHMoYSxiLGlzTmFtZWRFeHBvcnQpe2lmKCFhJiZifHxhJiYhYil7cmV0dXJuIGZhbHNlO31sZXQgcDtmb3IocCBpbiBhKXtpZihpc05hbWVkRXhwb3J0JiZwPT09J2RlZmF1bHQnKXsvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbmNvbnRpbnVlO31pZihhW3BdIT09YltwXSl7cmV0dXJuIGZhbHNlO319Zm9yKHAgaW4gYil7aWYoaXNOYW1lZEV4cG9ydCYmcD09PSdkZWZhdWx0Jyl7Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG5jb250aW51ZTt9aWYoIWFbcF0pe3JldHVybiBmYWxzZTt9fXJldHVybiB0cnVlO307XG4gICAgdmFyIG9sZExvY2FscyA9IGNvbnRlbnQubG9jYWxzO1xuXG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXG4gICAgICBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9jc3MtbG9hZGVyL2Nqcy5qcz8/cmVmLS01LW9uZU9mLTMtMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL3Bvc3Rjc3MtbG9hZGVyL2Nqcy5qcz8/cmVmLS01LW9uZU9mLTMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LW9uZU9mLTMtMyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL3Nhc3MtbG9hZGVyL2Nqcy5qcz8/cmVmLS01LW9uZU9mLTMtNCEuL3N0eWxlcy5tb2R1bGUuc2Nzc1wiLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jb21waWxlZC9jc3MtbG9hZGVyL2Nqcy5qcz8/cmVmLS01LW9uZU9mLTMtMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL3Bvc3Rjc3MtbG9hZGVyL2Nqcy5qcz8/cmVmLS01LW9uZU9mLTMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LW9uZU9mLTMtMyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NvbXBpbGVkL3Nhc3MtbG9hZGVyL2Nqcy5qcz8/cmVmLS01LW9uZU9mLTMtNCEuL3N0eWxlcy5tb2R1bGUuc2Nzc1wiKTtcblxuICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsTG9jYWxzKG9sZExvY2FscywgY29udGVudC5sb2NhbHMpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvbGRMb2NhbHMgPSBjb250ZW50LmxvY2FscztcblxuICAgICAgICAgICAgICB1cGRhdGUoY29udGVudCk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgc3R5bGVzIGZyb20gJy4vaW5kZXgubW9kdWxlLnNjc3MnXG5pbXBvcnQge0JveH0gZnJvbSAnLi4vY29tcG9uZW50cy9Cb3gnXG5pbXBvcnQge0JveEJ1dHRvbn0gZnJvbSAnLi4vY29tcG9uZW50cy9Cb3hCdXR0b24nXG5pbXBvcnQge0JveEhyZWZCdXR0b259IGZyb20gJy4uL2NvbXBvbmVudHMvQm94SHJlZkJ1dHRvbidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRlbnR9PlxuICAgICAgPEJveCBuYW1lPVwiTW9uaXRvcmFtZW50byAmIENvbnRyb2xlXCIgZGlzcGxheVR5cGU9XCJncmlkXCI+XG4gICAgICAgIDxCb3hIcmVmQnV0dG9uIHNyYz1cIi9saWdodGJ1bGItc29saWQuc3ZnXCIgdGl0bGU9XCJJbHVtaW5hY2FvXCIgaHJlZj1cIi9tb25pdG9yL2xpZ2h0XCI+PC9Cb3hIcmVmQnV0dG9uPlxuICAgICAgICA8Qm94SHJlZkJ1dHRvbiBzcmM9XCIvYm9uZS1zb2xpZC5zdmdcIiB0aXRsZT1cIkFsaW1lbnRhY2FvXCIgaHJlZj1cIi9tb25pdG9yL2Zvb2RcIj48L0JveEhyZWZCdXR0b24+XG4gICAgICAgIDxCb3hIcmVmQnV0dG9uIHNyYz1cIi92aWRlby1zb2xpZC5zdmdcIiB0aXRsZT1cIkNhbWVyYVwiIGhyZWY9XCIvbW9uaXRvci9jYW1lcmFcIj48L0JveEhyZWZCdXR0b24+XG4gICAgICAgIDxCb3hIcmVmQnV0dG9uIHNyYz1cIi90aGVybW9tZXRlci1oYWxmLXNvbGlkLnN2Z1wiIHRpdGxlPVwiVGVtcGVyYXR1cmFcIiBocmVmPVwiL21vbml0b3IvdGVtcGVyYXR1cmVcIj48L0JveEhyZWZCdXR0b24+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBuYW1lPVwiQ29udHJvbGUgUmFwaWRvXCIgZGlzcGxheVR5cGU9XCJmbGV4XCI+XG4gICAgICAgIDxCb3hCdXR0b24gc3JjPVwiL21vb24tc29saWQuc3ZnXCIgdGl0bGU9XCJNb2RvIG5vdHVybm9cIj48L0JveEJ1dHRvbj5cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG5hbWU9XCJDYW1lcmEgaW50ZXJuYVwiIGRpc3BsYXlUeXBlPVwiZmxleFwiPlxuXG4gICAgICA8L0JveD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==