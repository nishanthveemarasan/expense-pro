import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleLeft,
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Category.module.css";
import MainCategory from "./MainCategory";
import AddCategory from "./AddCategory";
import { SwitchTransition, Transition } from "react-transition-group";
import { defaultStyle, duration, findStyles } from "../../style";
const Category = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.category,
            selectedCategory: state.expenseStore.selectedCategory,
            page: state.expenseStore.page,
            subCategoryPage: state.expenseStore.subCategoryPage,
            prevMainPage: state.expenseStore.prevMainPage,
        };
    };
    const states = useSelector(mapStateToProps);
    const onUpdatePageHandler = () => {
        if (states.subCategoryPage == "maincategory") {
            dispatch(
                expenseStoreAction.updatePage({
                    mainPage: states.prevMainPage,
                    page: states.page,
                })
            );
        } else {
            dispatch(
                expenseStoreAction.updateSubPage({ page: "maincategory" })
            );
        }
    };

    const onAddCategoryHandler = () => {
        const data = {
            page: "addcategory",
        };
        dispatch(expenseStoreAction.updateSubPage(data));
    };

    return (
        <>
            <div className={classes.AddCategory}>
                {/* <i
                    className={`bi bi-arrow-left-circle-fill ${classes.CategoryIcons}`}
                    onClick={onUpdatePageHandler}
                ></i> */}
                <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    className={classes.icon}
                    onClick={onUpdatePageHandler}
                />
                <span className={classes.CategoryIcons}>
                    {states.subCategoryPage == "maincategory"
                        ? "Categories"
                        : "Add Main and Sub Category"}
                </span>
                {states.subCategoryPage == "maincategory" && (
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className={classes.icon}
                        onClick={onAddCategoryHandler}
                    />
                )}
            </div>
            <div style={{ padding: "2% 3%" }}>
                <SwitchTransition>
                    <Transition key={states.subCategoryPage} timeout={duration}>
                        {(state) => (
                            <div
                                style={{
                                    ...defaultStyle,
                                    ...findStyles(
                                        state,
                                        states.subCategoryPage
                                    ),
                                }}
                            >
                                {states.subCategoryPage == "maincategory" ? (
                                    <MainCategory />
                                ) : states.subCategoryPage == "addcategory" ? (
                                    <AddCategory />
                                ) : null}
                            </div>
                        )}
                    </Transition>
                </SwitchTransition>
                {/* {state.subCategoryPage == "maincategory" && <MainCategory />}
                {state.subCategoryPage == "addcategory" && <AddCategory />} */}
            </div>
        </>
    );
};

export default Category;
