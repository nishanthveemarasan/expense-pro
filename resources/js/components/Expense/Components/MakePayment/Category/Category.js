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
                    {state.subCategoryPage == "maincategory"
                        ? "Categories"
                        : "Add Main and Sub Category"}
                </span>
                {state.subCategoryPage == "maincategory" && (
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className={classes.icon}
                        onClick={onAddCategoryHandler}
                    />
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
