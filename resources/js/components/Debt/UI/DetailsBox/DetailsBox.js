import React from "react";
import { useDispatch } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";
import Avatar from "../../../Expense/UI/Avatar/Avatar";
import {
    colorArray,
    getFirstLetterUpper,
    getIndex,
} from "../../../Helper/Helper";
import classes from "./Details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";
const DetailsBox = (props) => {
    const dispatch = useDispatch();
    const balance = props.lendTotal - props.borrowTotal;
    const onOpenIndividualData = () => {
        // console.log(props);
        dispatch(debtStoreAction.updateIndividualData({ data: props }));
        const data = {
            page: "individual",
            mainPage: "showindividual",
            action: "both",
            type: "mainpage",
        };
        dispatch(debtStoreAction.updatePage(data));
    };
    return (
        <div className={classes.outline} onClick={onOpenIndividualData}>
            <div className={classes.details}>
                <div>
                    <Avatar
                        size="lg"
                        color={colorArray[getIndex(6, 0)]}
                        align="3"
                    >
                        {getFirstLetterUpper(props.name)}
                    </Avatar>
                </div>
                <div>
                    <div className={classes.name}>{props.name}</div>
                    <div>
                        <span className={classes.date}>Total Lend : </span>
                        <span className={classes.lend}>{props.lendTotal}</span>
                    </div>
                    <div>
                        <span className={classes.date}>Total Borrow : </span>
                        <span className={classes.borrow}>
                            {props.borrowTotal}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className={`${classes.amount} ${
                    balance >= 0 ? classes.lend : classes.borrow
                }`}
            >
                <FontAwesomeIcon icon={faSterlingSign} />
                {balance}
            </div>
        </div>
    );
};
export default DetailsBox;
