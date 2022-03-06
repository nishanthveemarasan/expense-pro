"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([
    ["resources_js_components_Saving_SavingCategory_SavingCategory_js"],
    {
        /***/ "./resources/js/components/Saving/SavingCategory/SavingCategory.js":
            /*!*************************************************************************!*\
  !*** ./resources/js/components/Saving/SavingCategory/SavingCategory.js ***!
  \*************************************************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ default: () =>
                            __WEBPACK_DEFAULT_EXPORT__,
                        /* harmony export */
                    }
                );
                /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! react */ "./node_modules/react/index.js"
                    );
                /* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ =
                    __webpack_require__(
                        /*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Nav.js"
                    );
                /* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! react-redux */ "./node_modules/react-redux/es/index.js"
                    );
                /* harmony import */ var _Expense_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__ =
                    __webpack_require__(
                        /*! ../../Expense/UI/Avatar/Avatar */ "./resources/js/components/Expense/UI/Avatar/Avatar.js"
                    );
                /* harmony import */ var _Expense_UI_head_Head__WEBPACK_IMPORTED_MODULE_3__ =
                    __webpack_require__(
                        /*! ../../Expense/UI/head/Head */ "./resources/js/components/Expense/UI/head/Head.js"
                    );
                /* harmony import */ var _UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_4__ =
                    __webpack_require__(
                        /*! ../UI/Nav/NavItem */ "./resources/js/components/Saving/UI/Nav/NavItem.js"
                    );
                /* harmony import */ var _SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_5__ =
                    __webpack_require__(
                        /*! ./SavingCategory.module.css */ "./resources/js/components/Saving/SavingCategory/SavingCategory.module.css"
                    );
                /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ =
                    __webpack_require__(
                        /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"
                    );

                var Summary =
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.lazy(
                        function () {
                            return __webpack_require__
                                .e(
                                    /*! import() */ "resources_js_components_Saving_SavingCategory_Summary_Summary_js"
                                )
                                .then(
                                    __webpack_require__.bind(
                                        __webpack_require__,
                                        /*! ./Summary/Summary */ "./resources/js/components/Saving/SavingCategory/Summary/Summary.js"
                                    )
                                );
                        }
                    );
                var History =
                    /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.lazy(
                        function () {
                            return __webpack_require__
                                .e(
                                    /*! import() */ "resources_js_components_Saving_SavingCategory_History_History_js"
                                )
                                .then(
                                    __webpack_require__.bind(
                                        __webpack_require__,
                                        /*! ./History/History */ "./resources/js/components/Saving/SavingCategory/History/History.js"
                                    )
                                );
                        }
                    );

                var SavingCategory = function SavingCategory() {
                    var mapStateToProps = function mapStateToProps(state) {
                        return {
                            mainPage: state.savingStore.mainPage,
                            page: state.savingStore.page,
                        };
                    };

                    var state = (0,
                    react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(
                        mapStateToProps
                    );
                    console.log(state.page);
                    return /*#__PURE__*/ (0,
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,
                        {
                            children: [
                                /*#__PURE__*/ (0,
                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                    _Expense_UI_head_Head__WEBPACK_IMPORTED_MODULE_3__[
                                        "default"
                                    ],
                                    {
                                        type: "middle",
                                        children: /*#__PURE__*/ (0,
                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                            "div",
                                            {
                                                className:
                                                    _SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_5__[
                                                        "default"
                                                    ].heading,
                                                children: "Saving",
                                            }
                                        ),
                                    }
                                ),
                                /*#__PURE__*/ (0,
                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(
                                    react__WEBPACK_IMPORTED_MODULE_0__.Suspense,
                                    {
                                        fallback: "",
                                        children: [
                                            /*#__PURE__*/ (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(
                                                react_bootstrap__WEBPACK_IMPORTED_MODULE_7__[
                                                    "default"
                                                ],
                                                {
                                                    justify: true,
                                                    variant: "tabs",
                                                    defaultActiveKey:
                                                        state.page,
                                                    children: [
                                                        /*#__PURE__*/ (0,
                                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                                            _UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_4__[
                                                                "default"
                                                            ],
                                                            {
                                                                mainPage:
                                                                    "savingCategory",
                                                                page: "summary",
                                                                eventKey:
                                                                    "summary",
                                                                link: "summary",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                                            _UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_4__[
                                                                "default"
                                                            ],
                                                            {
                                                                mainPage:
                                                                    "savingCategory",
                                                                page: "history",
                                                                eventKey:
                                                                    "history",
                                                                link: "history",
                                                            }
                                                        ),
                                                    ],
                                                }
                                            ),
                                            /*#__PURE__*/ (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(
                                                "main",
                                                {
                                                    className:
                                                        _SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_5__[
                                                            "default"
                                                        ].main,
                                                    children: [
                                                        state.page ==
                                                            "summary" &&
                                                            /*#__PURE__*/ (0,
                                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                                                Summary,
                                                                {}
                                                            ),
                                                        state.page ==
                                                            "history" &&
                                                            /*#__PURE__*/ (0,
                                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                                                History,
                                                                {}
                                                            ),
                                                    ],
                                                }
                                            ),
                                        ],
                                    }
                                ),
                                /*#__PURE__*/ (0,
                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                    "div",
                                    {
                                        className:
                                            _SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_5__[
                                                "default"
                                            ].add,
                                        children: /*#__PURE__*/ (0,
                                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                            _Expense_UI_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__[
                                                "default"
                                            ],
                                            {
                                                size: "xl",
                                                color: "primary",
                                                align: "5",
                                                children: /*#__PURE__*/ (0,
                                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                                                    _UI_Nav_NavItem__WEBPACK_IMPORTED_MODULE_4__[
                                                        "default"
                                                    ],
                                                    {
                                                        mainPage:
                                                            "createSaving",
                                                        page: state.page,
                                                        link: "+",
                                                        style: {
                                                            color: "white",
                                                            textDecoration:
                                                                "none",
                                                        },
                                                    }
                                                ),
                                            }
                                        ),
                                    }
                                ),
                            ],
                        }
                    );
                };

                /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
                    SavingCategory;

                /***/
            },

        /***/ "./resources/js/components/Saving/UI/Nav/NavItem.js":
            /*!**********************************************************!*\
  !*** ./resources/js/components/Saving/UI/Nav/NavItem.js ***!
  \**********************************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ default: () =>
                            __WEBPACK_DEFAULT_EXPORT__,
                        /* harmony export */
                    }
                );
                /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! react */ "./node_modules/react/index.js"
                    );
                /* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ =
                    __webpack_require__(
                        /*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Nav.js"
                    );
                /* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! react-redux */ "./node_modules/react-redux/es/index.js"
                    );
                /* harmony import */ var _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__ =
                    __webpack_require__(
                        /*! ../../../Expense/Store/Store */ "./resources/js/components/Expense/Store/Store.js"
                    );
                /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
                    __webpack_require__(
                        /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js"
                    );

                var NavItem = function NavItem(props) {
                    var dispatch = (0,
                    react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

                    var onPageHandler = function onPageHandler(mainPage, page) {
                        dispatch(
                            _Expense_Store_Store__WEBPACK_IMPORTED_MODULE_2__.savingStoreAction.updatePage(
                                {
                                    mainPage: mainPage,
                                    page: page,
                                }
                            )
                        );
                    };

                    return /*#__PURE__*/ (0,
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"]
                            .Item,
                        {
                            children: /*#__PURE__*/ (0,
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
                                react_bootstrap__WEBPACK_IMPORTED_MODULE_4__[
                                    "default"
                                ].Link,
                                {
                                    onClick: function onClick() {
                                        return onPageHandler(
                                            props.mainPage,
                                            props.page
                                        );
                                    },
                                    eventKey: props.eventKey,
                                    style: props.style,
                                    children: props.link,
                                }
                            ),
                        }
                    );
                };

                /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
                    NavItem;

                /***/
            },

        /***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Saving/SavingCategory/SavingCategory.module.css":
            /*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Saving/SavingCategory/SavingCategory.module.css ***!
  \*******************************************************************************************************************************************************************************************************************************************/
            /***/ (module, __webpack_exports__, __webpack_require__) => {
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ default: () =>
                            __WEBPACK_DEFAULT_EXPORT__,
                        /* harmony export */
                    }
                );
                /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js"
                    );
                /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__
                    );
                // Imports

                var ___CSS_LOADER_EXPORT___ =
                    _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(
                        function (i) {
                            return i[1];
                        }
                    );
                // Module
                ___CSS_LOADER_EXPORT___.push([
                    module.id,
                    ".CghLcNObNmYjGj\\+4FQhbTQ\\=\\= {\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 1.5rem;\r\n}\r\n\r\n.P7BPkGtkuQ2j81mVFOFZYA\\=\\= {\r\n    position: fixed;\r\n    bottom: 80px;\r\n    right: 0;\r\n}\r\n\r\n.\\+rDRHourrLsCvpSfUGBf3w\\=\\= {\r\n    margin: 3% 1%;\r\n}\r\n",
                    "",
                ]);
                // Exports
                ___CSS_LOADER_EXPORT___.locals = {
                    heading: "CghLcNObNmYjGj+4FQhbTQ==",
                    add: "P7BPkGtkuQ2j81mVFOFZYA==",
                    main: "+rDRHourrLsCvpSfUGBf3w==",
                };
                /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
                    ___CSS_LOADER_EXPORT___;

                /***/
            },

        /***/ "./resources/js/components/Saving/SavingCategory/SavingCategory.module.css":
            /*!*********************************************************************************!*\
  !*** ./resources/js/components/Saving/SavingCategory/SavingCategory.module.css ***!
  \*********************************************************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ default: () =>
                            __WEBPACK_DEFAULT_EXPORT__,
                        /* harmony export */
                    }
                );
                /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
                    );
                /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__
                    );
                /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./SavingCategory.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].oneOf[1].use[2]!./resources/js/components/Saving/SavingCategory/SavingCategory.module.css"
                    );

                var options = {};

                options.insert = "head";
                options.singleton = false;

                var update =
                    _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
                        _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_1__[
                            "default"
                        ],
                        options
                    );

                /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
                    _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_6_oneOf_1_use_2_SavingCategory_module_css__WEBPACK_IMPORTED_MODULE_1__[
                        "default"
                    ].locals || {};

                /***/
            },
    },
]);
