import React, { useState } from "react";
import classes from "./Category.module.css";

const Category = ({ styleNum, change }) => {
    const changeStyleNumber = (num, dateType) => {
        change(dateType, num);
    };

    return (
        <div className={classes.category}>
            <span
                className={classes.boxOne}
                style={{
                    color: styleNum == 1 ? "white" : "",
                    backgroundColor: styleNum == 1 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 1, "All")}
            >
                All
            </span>
            <span
                className={classes.boxTwo}
                style={{
                    color: styleNum == 2 ? "white" : "",
                    backgroundColor: styleNum == 2 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 2, "thisWeek")}
            >
                Weekly
            </span>
            <span
                className={classes.boxThree}
                style={{
                    color: styleNum == 3 ? "white" : "",
                    backgroundColor: styleNum == 3 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 3, "thisMonth")}
            >
                Monthly
            </span>
            <span
                className={classes.boxFour}
                style={{
                    color: styleNum == 4 ? "white" : "",
                    backgroundColor: styleNum == 4 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 4, "thisYear")}
            >
                Yearly
            </span>
        </div>
    );
};
export default Category;
