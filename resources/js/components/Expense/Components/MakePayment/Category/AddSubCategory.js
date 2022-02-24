import React from "react";
import EInput from "../../../UI/Input/EInput";
import classes from "./Category.module.css";
const AddSubCategory = (props) => {
    const onChangeHandler = (event, i) => {
        const value = event.target.value;
        props.onChangeSub(value, i);
    };
    return (
        <>
            {props.items.map((element, i) => {
                return (
                    <div
                        className={`row ${classes.AddCategoryMainInput}`}
                        key={i}
                    >
                        <div className="col-8">
                            <EInput
                                onChange={(e) => onChangeHandler(e, i)}
                                value={element}
                            />
                        </div>
                        <div className={`col-2 ${classes.adSubCategoryIcon}`}>
                            <i
                                className="bi bi-dash-circle-fill"
                                onClick={() => props.onRemoveSub(i)}
                            ></i>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
export default AddSubCategory;
