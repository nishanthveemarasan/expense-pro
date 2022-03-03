"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Expense_Components_ExpenseCategory_ExpenseCategory_js"],{

/***/ "./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.js":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Helper_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Helper/Helper */ "./resources/js/components/Helper/Helper.js");
/* harmony import */ var _Store_Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var _UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../UI/Avatar/Avatar */ "./resources/js/components/Expense/UI/Avatar/Avatar.js");
/* harmony import */ var _UI_head_Head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../UI/head/Head */ "./resources/js/components/Expense/UI/head/Head.js");
/* harmony import */ var _UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../UI/Nav/NavItem */ "./resources/js/components/Expense/UI/Nav/NavItem.js");
/* harmony import */ var _ExpenseCategory_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ExpenseCategory.module.css */ "./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");












var Dashboard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.lazy(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_components_Expense_Components_DashBoard_DashBoard_js").then(__webpack_require__.bind(__webpack_require__, /*! ../DashBoard/DashBoard */ "./resources/js/components/Expense/Components/DashBoard/DashBoard.js"));
});
var Summary = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.lazy(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_components_Expense_Components_Summary_Summary_js").then(__webpack_require__.bind(__webpack_require__, /*! ../Summary/Summary */ "./resources/js/components/Expense/Components/Summary/Summary.js"));
});

var ExpenseCategory = function ExpenseCategory(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var dateGroup = (0,_Helper_Helper__WEBPACK_IMPORTED_MODULE_2__.getDate)();
    dispatch(_Store_Store__WEBPACK_IMPORTED_MODULE_3__.expenseStoreAction.setDate({
      dateGroup: dateGroup
    }));
  }, []);

  var mapStateToProps = function mapStateToProps(state) {
    return {
      data: state.expenseStore.data,
      payment: state.expenseStore.data.showPayment,
      page: state.expenseStore.page
    };
  };

  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(mapStateToProps);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UI_head_Head__WEBPACK_IMPORTED_MODULE_5__["default"], {
      type: "middle",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: _ExpenseCategory_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].heading,
        children: "Expense Manager"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: "",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["default"], {
        justify: true,
        variant: "tabs",
        defaultActiveKey: "dashboard",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
          page: "dashboard",
          mainPage: "expenseCategory",
          eventKey: "dashboard",
          link: "DashBoard"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
          page: "summary",
          mainPage: "expenseCategory",
          eventKey: "summary",
          link: "Summary"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
          page: "recurring",
          mainPage: "expenseCategory",
          eventKey: "recurring",
          link: "Recurring"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("main", {
        style: {
          margin: "3% 0 5% 0"
        },
        children: [state.page == "dashboard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Dashboard, {}), state.page == "summary" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Summary, {}), state.page == "dashboard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: _ExpenseCategory_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].add,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_4__["default"], {
            size: "xl",
            color: "primary",
            align: "5",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
              mainPage: "payment",
              page: "dashboard",
              link: "+",
              style: {
                color: "white",
                textDecoration: "none"
              }
            })
          })
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExpenseCategory);

/***/ }),

/***/ "./resources/js/components/Expense/UI/Nav/NavItem.js":
/*!***********************************************************!*\
  !*** ./resources/js/components/Expense/UI/Nav/NavItem.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var NavItem = function NavItem(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var onPageHandler = function onPageHandler(mainPage, page) {
    dispatch(_Store_Store__WEBPACK_IMPORTED_MODULE_2__.expenseStoreAction.updatePage({
      mainPage: mainPage,
      page: page
    }));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Link, {
      onClick: function onClick() {
        return onPageHandler(props.mainPage, props.page);
      },
      eventKey: props.eventKey,
      style: props.style,
      children: props.link
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavItem);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.module.css":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".TZy0jFQ-3b1WZLLJcfAE5Q\\=\\= ._2np4yNrvEPlnibBJtDQrLg\\=\\= a.N3rxUuyI9FOvKhy2w8xivg\\=\\= {\r\n    background-color: blue;\r\n}\r\n\r\n.dyrk5pmkptOhYgZsFzfAcQ\\=\\= {\r\n    position: fixed;\r\n    bottom: 80px;\r\n    right: 0;\r\n}\r\n\r\n.Knk2PnhiiRiiMnMjoEheOg\\=\\= {\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 1.5rem;\r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"nav-item": "TZy0jFQ-3b1WZLLJcfAE5Q==",
	"nav-link": "_2np4yNrvEPlnibBJtDQrLg==",
	"active": "N3rxUuyI9FOvKhy2w8xivg==",
	"add": "dyrk5pmkptOhYgZsFzfAcQ==",
	"heading": "Knk2PnhiiRiiMnMjoEheOg=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.module.css":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.module.css ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_ExpenseCategory_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./ExpenseCategory.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Expense/Components/ExpenseCategory/ExpenseCategory.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_ExpenseCategory_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_ExpenseCategory_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);