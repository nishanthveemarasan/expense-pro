import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";

import classes from "./Category.module.css";
import MainCategory from "./MainCategory";
import AddCategory from "./AddCategory";
const Category = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            data: state.expenseStore.payment.category,
            selectedCategory: state.expenseStore.selectedCategory,
            page: state.expenseStore.page,
            subCategoryPage: state.expenseStore.subCategoryPage,
        };
    };
    const state = useSelector(mapStateToProps);
    const onUpdatePageHandler = () => {
        if (state.subCategoryPage == "maincategory") {
            dispatch(expenseStoreAction.updatePage({ mainPage: "payment" }));
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
                <i
                    className={`bi bi-arrow-left-circle-fill ${classes.CategoryIcons}`}
                    onClick={onUpdatePageHandler}
                ></i>
                <span className={classes.CategoryIcons}>
                    {state.subCategoryPage == "maincategory"
                        ? "Categories"
                        : "Add Main and Sub Category"}
                </span>
                {state.subCategoryPage == "maincategory" && (
                    <i
                        className={`bi bi-plus-circle-dotted ${classes.CategoryIcons}`}
                        onClick={onAddCategoryHandler}
                    ></i>
                )}
            </div>
            <div style={{ padding: "0% 3% 5% 3%" }}>
                {state.subCategoryPage == "maincategory" && <MainCategory />}
                {state.subCategoryPage == "addcategory" && <AddCategory />}
            </div>
        </>
    );
};

export default Category;
