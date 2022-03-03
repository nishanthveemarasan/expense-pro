"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Debt_DebtCategory_DebtCategory_js"],{

/***/ "./resources/js/components/Debt/DebtCategory/Borrow/Borrow.js":
/*!********************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Borrow/Borrow.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Expense/Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var _UI_DetailsBox_SingbleBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../UI/DetailsBox/SingbleBox */ "./resources/js/components/Debt/UI/DetailsBox/SingbleBox.js");
/* harmony import */ var _UI_NavItem_AddCircle_Add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../UI/NavItem/AddCircle/Add */ "./resources/js/components/Debt/UI/NavItem/AddCircle/Add.js");
/* harmony import */ var _Borrow_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Borrow.module.css */ "./resources/js/components/Debt/DebtCategory/Borrow/Borrow.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Borrow = function Borrow(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var mapStateToProps = function mapStateToProps(state) {
    return {
      data: state.debtStore.borrowData
    };
  };

  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(mapStateToProps);

  var onEditBorrowMoney = function onEditBorrowMoney(id) {
    var formData = _objectSpread(_objectSpread({}, state.data[id]), {}, {
      id: id
    });

    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.createFormData({
      formData: formData
    }));
    var data = {
      page: "borrowfrom",
      mainPage: "adddebt",
      action: "borrow",
      type: "mainpage"
    };
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.updatePage(data));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [state.data && state.data.map(function (element, i) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_UI_DetailsBox_SingbleBox__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread(_objectSpread({}, element), {}, {
        editDebt: onEditBorrowMoney.bind(_this, i)
      }), i);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: _Borrow_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].add,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_UI_NavItem_AddCircle_Add__WEBPACK_IMPORTED_MODULE_4__["default"], {
        mainPage: "adddebt",
        page: "borrowfrom",
        type: "mainpage",
        action: "borrow",
        create: "create"
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Borrow);

/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/DebtCategory.js":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/DebtCategory.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var _UI_NavItem_NavItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UI/NavItem/NavItem */ "./resources/js/components/Debt/UI/NavItem/NavItem.js");
/* harmony import */ var _Lend_Lend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lend/Lend */ "./resources/js/components/Debt/DebtCategory/Lend/Lend.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Borrow_Borrow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Borrow/Borrow */ "./resources/js/components/Debt/DebtCategory/Borrow/Borrow.js");
/* harmony import */ var _Individual_Individual__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Individual/Individual */ "./resources/js/components/Debt/DebtCategory/Individual/Individual.js");
/* harmony import */ var _Head_Head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Head/Head */ "./resources/js/components/Debt/DebtCategory/Head/Head.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");












var DebtCategory = function DebtCategory(props) {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      page: state.debtStore.page
    };
  };

  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(mapStateToProps);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Head_Head__WEBPACK_IMPORTED_MODULE_6__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["default"], {
      justify: true,
      variant: "tabs",
      defaultActiveKey: state.page,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_UI_NavItem_NavItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: "giveto",
        type: "subpage",
        mainPage: "debtcategory",
        eventKey: "giveto",
        link: "LEND"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_UI_NavItem_NavItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: "borrowfrom",
        type: "subpage",
        mainPage: "debtcategory",
        eventKey: "borrowfrom",
        link: "BORROW"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_UI_NavItem_NavItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: "individual",
        mainPage: "debtcategory",
        type: "subpage",
        eventKey: "individual",
        link: "INDIVIDUALS"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("main", {
      style: {
        padding: "2% 4%"
      },
      children: [state.page == "giveto" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Lend_Lend__WEBPACK_IMPORTED_MODULE_2__["default"], {}), state.page == "borrowfrom" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Borrow_Borrow__WEBPACK_IMPORTED_MODULE_4__["default"], {}), state.page == "individual" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Individual_Individual__WEBPACK_IMPORTED_MODULE_5__["default"], {})]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DebtCategory);

/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/Head/Head.js":
/*!****************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Head/Head.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Expense/Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var _Head_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Head.module.css */ "./resources/js/components/Debt/DebtCategory/Head/Head.module.css");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









var Head = function Head(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var onPageChangeHandler = function onPageChangeHandler() {
    var data = {
      page: "giveto",
      mainPage: "debtsummary",
      action: "",
      type: "mainpage"
    };
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.updatePage(data));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: _Head_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].head,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: _Head_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].heading,
      children: "Debt Manager"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: _Head_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].heading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faTimesCircle,
        className: _Head_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].icon,
        onClick: onPageChangeHandler
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Head);

/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/Individual/Individual.js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Individual/Individual.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _UI_DetailsBox_DetailsBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../UI/DetailsBox/DetailsBox */ "./resources/js/components/Debt/UI/DetailsBox/DetailsBox.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Individual = function Individual(props) {
  var mapStateToProps = function mapStateToProps(state) {
    return {
      data: state.debtStore.debtData
    };
  };

  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(mapStateToProps);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: state.data && state.data.map(function (element, id) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UI_DetailsBox_DetailsBox__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({}, element), id);
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Individual);

/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/Lend/Lend.js":
/*!****************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Lend/Lend.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Expense/Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var _UI_DetailsBox_SingbleBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../UI/DetailsBox/SingbleBox */ "./resources/js/components/Debt/UI/DetailsBox/SingbleBox.js");
/* harmony import */ var _UI_NavItem_AddCircle_Add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../UI/NavItem/AddCircle/Add */ "./resources/js/components/Debt/UI/NavItem/AddCircle/Add.js");
/* harmony import */ var _Lend_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Lend.module.css */ "./resources/js/components/Debt/DebtCategory/Lend/Lend.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _this = undefined;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Lend = function Lend(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var mapStateToProps = function mapStateToProps(state) {
    return {
      data: state.debtStore.lendData
    };
  };

  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(mapStateToProps);

  var onEditLendMoney = function onEditLendMoney(id) {
    var formData = _objectSpread(_objectSpread({}, state.data[id]), {}, {
      id: id
    });

    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.createFormData({
      formData: formData
    }));
    var data = {
      page: "giveto",
      mainPage: "adddebt",
      action: "lend",
      type: "mainpage"
    };
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.updatePage(data));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [state.data && state.data.map(function (element, i) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_UI_DetailsBox_SingbleBox__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread(_objectSpread({}, element), {}, {
        id: i,
        editDebt: onEditLendMoney.bind(_this, i)
      }), i);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: _Lend_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].add,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_UI_NavItem_AddCircle_Add__WEBPACK_IMPORTED_MODULE_4__["default"], {
        mainPage: "adddebt",
        page: "giveto",
        type: "mainpage",
        action: "lend",
        create: "create"
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lend);

/***/ }),

/***/ "./resources/js/components/Debt/UI/DetailsBox/DetailsBox.js":
/*!******************************************************************!*\
  !*** ./resources/js/components/Debt/UI/DetailsBox/DetailsBox.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Expense/Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var _Expense_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Expense/UI/Avatar/Avatar */ "./resources/js/components/Expense/UI/Avatar/Avatar.js");
/* harmony import */ var _Helper_Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Helper/Helper */ "./resources/js/components/Helper/Helper.js");
/* harmony import */ var _Details_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Details.module.css */ "./resources/js/components/Debt/UI/DetailsBox/Details.module.css");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");











var DetailsBox = function DetailsBox(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var balance = props.lendTotal - props.borrowTotal;

  var onOpenIndividualData = function onOpenIndividualData() {
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.updateIndividualData({
      data: props
    }));
    var data = {
      page: "individual",
      mainPage: "showindividual",
      action: "both",
      type: "mainpage"
    };
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.updatePage(data));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].outline,
    onClick: onOpenIndividualData,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].details,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Expense_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_3__["default"], {
          size: "lg",
          color: _Helper_Helper__WEBPACK_IMPORTED_MODULE_4__.colorArray[(0,_Helper_Helper__WEBPACK_IMPORTED_MODULE_4__.getIndex)(6, 0)],
          align: "3",
          children: (0,_Helper_Helper__WEBPACK_IMPORTED_MODULE_4__.getFirstLetterUpper)(props.name)
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].name,
          children: props.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].date,
            children: "Total Lend : "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].lend,
            children: props.lendTotal
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].date,
            children: "Total Borrow : "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            className: _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].borrow,
            children: props.borrowTotal
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "".concat(_Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].amount, " ").concat(balance >= 0 ? _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].lend : _Details_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].borrow),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__.faSterlingSign
      }), balance]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailsBox);

/***/ }),

/***/ "./resources/js/components/Debt/UI/DetailsBox/SingbleBox.js":
/*!******************************************************************!*\
  !*** ./resources/js/components/Debt/UI/DetailsBox/SingbleBox.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingbleBox.module.css */ "./resources/js/components/Debt/UI/DetailsBox/SingbleBox.module.css");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var SingbleBox = function SingbleBox(props) {
  var _props$description;

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: _SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].outline,
    onClick: props.editDebt,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: _SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].details,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: _SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].name,
        children: props.name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        children: (_props$description = props.description) !== null && _props$description !== void 0 ? _props$description : "No Description"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
          className: _SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].date,
          children: [props.type == "lend" ? "lent " : "borrowed ", "Date : ", props.date]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: _SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].amount,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faSterlingSign
      }), props.amount]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SingbleBox);

/***/ }),

/***/ "./resources/js/components/Debt/UI/NavItem/AddCircle/Add.js":
/*!******************************************************************!*\
  !*** ./resources/js/components/Debt/UI/NavItem/AddCircle/Add.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Expense_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Expense/UI/Avatar/Avatar */ "./resources/js/components/Expense/UI/Avatar/Avatar.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NavItem */ "./resources/js/components/Debt/UI/NavItem/NavItem.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var Add = function Add(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Expense_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "xl",
    color: "primary",
    align: "5",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_NavItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      page: props.page,
      type: props.type,
      action: props.action,
      mainPage: props.mainPage,
      create: props.create,
      link: "+",
      style: {
        color: "white",
        textDecoration: "none"
      }
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Add);

/***/ }),

/***/ "./resources/js/components/Debt/UI/NavItem/NavItem.js":
/*!************************************************************!*\
  !*** ./resources/js/components/Debt/UI/NavItem/NavItem.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Nav.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Expense/Store/Store */ "./resources/js/components/Expense/Store/Store.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var NavItem = function NavItem(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var onPageHandler = function onPageHandler(page, mainPage, type) {
    var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var create = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var formData = {
      name: "",
      amount: "",
      description: "",
      date: "",
      id: null
    };
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.createFormData({
      formData: formData
    }));
    dispatch(_Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.debtStoreAction.updatePage({
      page: page,
      mainPage: mainPage,
      type: type,
      action: action,
      create: create
    }));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Item, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Link, {
      onClick: function onClick() {
        return onPageHandler(props.page, props.mainPage, props.type, props.action, props.create);
      },
      eventKey: props.eventKey,
      style: props.style,
      "aria-selected": true,
      children: props.link
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavItem);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Borrow/Borrow.module.css":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Borrow/Borrow.module.css ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".NjJfCdF\\+Hs1AnTNe4RCPug\\=\\= {\r\n    position: fixed;\r\n    bottom: 80px;\r\n    right: 0;\r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"add": "NjJfCdF+Hs1AnTNe4RCPug=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Head/Head.module.css":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Head/Head.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n    box-sizing: border-box;\r\n}\r\n\r\n.qAJCvMJ8S-xEbmbRGlDPpA\\=\\= {\r\n    background-color: blue;\r\n    height: 50px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 4%;\r\n    padding: 2.4% 2% 6% 2.5%;\r\n}\r\n\r\n.F9NK20ZQ1bqr7LmF46ssQg\\=\\= {\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 1.3rem;\r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"head": "qAJCvMJ8S-xEbmbRGlDPpA==",
	"heading": "F9NK20ZQ1bqr7LmF46ssQg=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Lend/Lend.module.css":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Lend/Lend.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".HGr64R7w5xA3Xq9LxvW4Pw\\=\\= {\r\n    position: fixed;\r\n    bottom: 80px;\r\n    right: 0;\r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"add": "HGr64R7w5xA3Xq9LxvW4Pw=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/UI/DetailsBox/Details.module.css":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/UI/DetailsBox/Details.module.css ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".CllJJLO0z\\+U6FaPwdUOGpA\\=\\= {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin: 3% 0;\r\n    padding: 0 10px;\r\n    height: 70px;\r\n    border-bottom: 1px lightgray solid;\r\n}\r\n\r\n.nPOrJLqZ5tpq4zpTkJiCbQ\\=\\= {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n}\r\n\r\n.nPOrJLqZ5tpq4zpTkJiCbQ\\=\\= .IVQsbado8zH5tz1V2Ezv2w\\=\\= {\r\n    font-weight: bold;\r\n}\r\n\r\n.nPOrJLqZ5tpq4zpTkJiCbQ\\=\\= .U7WN6LJTFqKmRm1bwe76WQ\\=\\= {\r\n    color: rgb(190, 186, 186);\r\n}\r\n\r\n.cT5pQi6KB9xQ\\+iGS8sCj2A\\=\\= {\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n}\r\n.v2yamMneCcow\\+CI4TAYedg\\=\\= {\r\n    color: blue;\r\n}\r\n.N-xDZR1wbkqG0jdwNiPEyA\\=\\= {\r\n    color: red;\r\n}\r\n.zpZ5Rj0\\+V5ogdV96a8nHwQ\\=\\= {\r\n    font-weight: bold;\r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"outline": "CllJJLO0z+U6FaPwdUOGpA==",
	"details": "nPOrJLqZ5tpq4zpTkJiCbQ==",
	"name": "IVQsbado8zH5tz1V2Ezv2w==",
	"date": "U7WN6LJTFqKmRm1bwe76WQ==",
	"amount": "cT5pQi6KB9xQ+iGS8sCj2A==",
	"lend": "v2yamMneCcow+CI4TAYedg==",
	"borrow": "N-xDZR1wbkqG0jdwNiPEyA==",
	"bold": "zpZ5Rj0+V5ogdV96a8nHwQ=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/UI/DetailsBox/SingbleBox.module.css":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/UI/DetailsBox/SingbleBox.module.css ***!
  \************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".mb0QsxGxsQrUqRiAGrC9qg\\=\\= {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin: 3% 0;\r\n    padding: 0 10px;\r\n    height: 70px;\r\n    border-bottom: 1px lightgray solid;\r\n}\r\n\r\n.E9aohXYKWFZIVp4aDE8hnQ\\=\\= {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.E9aohXYKWFZIVp4aDE8hnQ\\=\\= ._1uTCt1t\\+twuWKi\\+k6icB1A\\=\\= {\r\n    font-weight: bold;\r\n}\r\n\r\n.E9aohXYKWFZIVp4aDE8hnQ\\=\\= .dWv7GMgpro9RxDVK1nRRXQ\\=\\= {\r\n    color: lightgray;\r\n}\r\n\r\n._6rIQdAoPclfeoI5nNjYtTg\\=\\= {\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n}\r\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"outline": "mb0QsxGxsQrUqRiAGrC9qg==",
	"details": "E9aohXYKWFZIVp4aDE8hnQ==",
	"name": "_1uTCt1t+twuWKi+k6icB1A==",
	"date": "dWv7GMgpro9RxDVK1nRRXQ==",
	"amount": "_6rIQdAoPclfeoI5nNjYtTg=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/Borrow/Borrow.module.css":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Borrow/Borrow.module.css ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Borrow_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./Borrow.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Borrow/Borrow.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Borrow_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Borrow_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/Head/Head.module.css":
/*!************************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Head/Head.module.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Head_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./Head.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Head/Head.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Head_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Head_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Debt/DebtCategory/Lend/Lend.module.css":
/*!************************************************************************!*\
  !*** ./resources/js/components/Debt/DebtCategory/Lend/Lend.module.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Lend_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./Lend.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/DebtCategory/Lend/Lend.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Lend_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Lend_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Debt/UI/DetailsBox/Details.module.css":
/*!***********************************************************************!*\
  !*** ./resources/js/components/Debt/UI/DetailsBox/Details.module.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Details_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./Details.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/UI/DetailsBox/Details.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Details_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_Details_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Debt/UI/DetailsBox/SingbleBox.module.css":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Debt/UI/DetailsBox/SingbleBox.module.css ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./SingbleBox.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Debt/UI/DetailsBox/SingbleBox.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_SingbleBox_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);