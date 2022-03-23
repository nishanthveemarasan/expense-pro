import React, { useState } from "react";
import classes from "./Category.module.css";

const Category = (props) => {
    const [style, setStyle] = useState(1);
    const changeStyleNumber = (num, dateType) => {
        setStyle(num);
        props.change(dateType);
    };

    return (
        <div className={classes.category}>
            <span
                className={classes.boxOne}
                style={{
                    color: style == 1 ? "white" : "",
                    backgroundColor: style == 1 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 1, "All")}
            >
                All
            </span>
            <span
                className={classes.boxTwo}
                style={{
                    color: style == 2 ? "white" : "",
                    backgroundColor: style == 2 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 2, "thisWeek")}
            >
                Weekly
            </span>
            <span
                className={classes.boxThree}
                style={{
                    color: style == 3 ? "white" : "",
                    backgroundColor: style == 3 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 3, "thisMonth")}
            >
                Monthly
            </span>
            <span
                className={classes.boxFour}
                style={{
                    color: style == 4 ? "white" : "",
                    backgroundColor: style == 4 ? "blue" : "",
                }}
                onClick={changeStyleNumber.bind(this, 4, "thisYear")}
            >
                Yearly
            </span>
        </div>
    );
};
export default Category;
