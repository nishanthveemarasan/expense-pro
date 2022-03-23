import React, { useEffect, useState } from "react";
import classes from "./Category.module.css";

const DateCategory = ({ data, change, index }) => {
    const onChangeIndexHandler = (num) => {
        change(num);
    };

    return (
        <div className={classes.dateRange}>
            {data.map((el, i) => {
                return (
                    <div
                        key={i}
                        className={classes.dateItem}
                        style={{
                            borderBottom: i == index ? "2px solid green" : "",
                            left: i == 1 ? "40px" : "",
                        }}
                        onClick={onChangeIndexHandler.bind(this, i)}
                    >{`${el.dateStart} - ${el.dateEnd}`}</div>
                );
            })}
        </div>
    );
};
export default DateCategory;
