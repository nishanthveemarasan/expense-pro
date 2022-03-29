import React, { useState } from "react";
import {
    colorArray,
    getFirstLetterUpper,
    getIndex,
    toLower,
} from "../../../../Helper/Helper";
import Avatar from "../../../UI/Avatar/Avatar";
import ShowSingleBox from "../showSingleBox/ShowSingleBox";
import classes from "./ShowCategoryWiseBox.module.css";
const ShowCategoryWiseBox = ({
    data,
    balance,
    income,
    showCategoryContent,
}) => {
    const [cIndex, setCIndex] = useState(-1);
    const getPercentage = (total, key) => {
        if (toLower(key) == "income") {
            const persentage = (
                (Math.abs(total) / Math.abs(income)) *
                100
            ).toFixed(2);
            return `£${Math.abs(total)} / ${persentage}%`;
        } else {
            const persentage = (
                (Math.abs(total) / Math.abs(balance)) *
                100
            ).toFixed(2);
            return `-£${Math.abs(total)} / ${persentage}%`;
        }
    };

    const onIndexChangeHandler = (index) => {
        setCIndex(cIndex == index ? -1 : index);
    };

    const removeItemHandler = (singleData, updatedAmount) => {
        removeItem(singleData, updatedAmount);
    };

    return (
        <>
            {Object.keys(data).map((el, i) => {
                return (
                    <div
                        className={classes.NavbarItem}
                        key={i}
                        onClick={() => showCategoryContent(el)}
                    >
                        <div
                            className={classes.HomeButton}
                            onClick={onIndexChangeHandler.bind(this, i)}
                        >
                            <div className={classes.headingGroup}>
                                <Avatar
                                    size="lg"
                                    color={colorArray[getIndex(0, 6)]}
                                    align="3"
                                >
                                    {getFirstLetterUpper(el)}
                                </Avatar>
                                <div className={classes.Heading}>{el}</div>
                            </div>
                            <div
                                className={
                                    toLower(el) == "income"
                                        ? classes.iPercentage
                                        : classes.ePercentage
                                }
                            >
                                {getPercentage(data[el].total, el)}
                            </div>
                            <div className={classes.HeadingArrow}>
                                <div>
                                    <i
                                        className={`bi bi-caret-right-square ${classes.HeadingArrayIcon}`}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
export default ShowCategoryWiseBox;
