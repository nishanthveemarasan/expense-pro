import React, { useState } from "react";
import EInput from "../../../UI/Input/EInput";
import AddSubCategory from "./AddSubCategory";
import classes from "./Category.module.css";
import Ebutton from "../../../UI/Button/Ebutton";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import { addNewCategory } from "../../../Store/reducers/expense-reducer";
import SModel from "../../../UI/Model/SModel";
import {
    colorArray,
    getFirstLetterUpperWord,
    getIndex,
} from "../../../../Helper/Helper";
import DSelect from "../../../../Debt/UI/Select/DSelect";
const AddCategory = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            token: state.expenseStore.appToken,
            categoryNames: state.expenseStore.payment.categoryNames,
        };
    };
    const state = useSelector(mapStateToProps);

    const [category, setCategory] = useState({
        category: "",
        items: [],
        color: colorArray[getIndex(6, 0)],
    });
    const onChangeHandler = (value, type) => {
        setCategory((preState) => {
            return {
                ...preState,
                category: getFirstLetterUpperWord(value),
            };
        });
    };
    const onAddSubItemHandler = () => {
        if (category.category.length === 0) {
            alert("Please Enter a main category/subCategory");
            return;
        }
        const array = category.items.slice();
        array.push("");
        setCategory((preState) => {
            return {
                ...preState,
                items: [...array],
            };
        });
    };

    const onUpdateSubItemArray = (value, i) => {
        const array = category.items.slice();
        array[i] = getFirstLetterUpperWord(value);
        setCategory((preState) => {
            return {
                ...preState,
                items: [...array],
            };
        });
    };

    const onRemoveSubCategoryHandler = (i) => {
        const array = category.items.slice();
        array.splice(i, 1);
        setCategory((preState) => {
            return {
                ...preState,
                items: [...array],
            };
        });
    };

    const onCreateCategoryHandler = () => {
        dispatch(expenseStoreAction.showModal());
        dispatch(addNewCategory(category, state.token));
    };
    return (
        <>
            <SModel />
            <div className={`row ${classes.AddCategoryMainInput}`}>
                <div className="col-10">
                    {/* <EInput
                        onChange={(e) => onChangeHandler(e)}
                        value={category.category}
                    /> */}
                    <DSelect
                        options={state.categoryNames}
                        placeholder="Main Category Name.."
                        type="category"
                        change={onChangeHandler}
                    />
                </div>
                <div className={`col-2 ${classes.adMainCategoryIcon}`}>
                    <i
                        className="bi bi-plus-circle-fill"
                        onClick={onAddSubItemHandler}
                    ></i>
                </div>
            </div>
            <AddSubCategory
                items={category.items}
                onChangeSub={onUpdateSubItemArray}
                onRemoveSub={onRemoveSubCategoryHandler}
            />
            <div style={{ marginTop: "6%" }}>
                <Ebutton
                    variant="primary"
                    size="md"
                    name="Save Category"
                    style={{ width: "100%" }}
                    disabled={
                        category.category.length == 0 ||
                        category.items.length == 0 ||
                        (category.items.length > 0 &&
                            category.items[0].length == 0)
                    }
                    onClick={onCreateCategoryHandler}
                />
            </div>
        </>
    );
};
export default AddCategory;
