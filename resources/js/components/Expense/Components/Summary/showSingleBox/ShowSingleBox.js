import React, { useEffect, useState } from "react";
import { getFirstLetterUpperWord } from "../../../../Helper/Helper";
import classes from "./ShowSingleBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeExpenseSummaryAndData } from "../../../Store/reducers/expense-reducer";
const ShowSingleBox = ({
    data,
    index,
    currentIndex,
    changeIndex,
    removeItem,
}) => {
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            token: state.expenseStore.appToken,
        };
    };
    const state = useSelector(mapStateToProps);
    const onDeleteHandler = () => {
        const prepareData = {
            data,
            updatedAmount:
                data.type == "expense" ? Math.abs(data.amount) : -data.amount,
        };
        dispatch(removeExpenseSummaryAndData(prepareData));
        removeItem(prepareData.data, prepareData.updatedAmount);
    };

    return (
        <div
            className={
                data.type == "expense"
                    ? `${classes.outlineExpense} ${
                          clicked ? classes.showactions : ""
                      }`
                    : `${classes.outlineIncome} ${
                          clicked ? classes.showactions : ""
                      }`
            }
            onClick={() => changeIndex(index)}
        >
            <div className={classes.details}>
                <div>{getFirstLetterUpperWord(data.subCategory)}</div>
            </div>
            <div>
                <span className={classes.date}>{data.date}</span>
            </div>
            <div
                className={classes.amount}
                style={{ color: data.amount > 0 ? "green" : "red" }}
            >
                {data.amount > 0
                    ? `£${data.amount}`
                    : `-£${Math.abs(data.amount)}`}
            </div>
            {index == currentIndex && (
                <div className={classes.actionIconsShow}>
                    <FontAwesomeIcon
                        icon={faFileSignature}
                        className={classes.edit}
                    />
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        className={classes.delete}
                        onClick={onDeleteHandler}
                    />
                </div>
            )}
        </div>
    );
};
export default ShowSingleBox;
