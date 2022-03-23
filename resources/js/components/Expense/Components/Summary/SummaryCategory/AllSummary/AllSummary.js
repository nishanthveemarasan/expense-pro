import React, { useEffect, useState } from "react";
import ShowSingleBox from "../../showSingleBox/ShowSingleBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./AllSummary.module.css";
import { getTtotalExpenseIncome } from "../../../../../Helper/Helper";
import ShowTotalSummary from "../../ShowTotalSummary/ShowTotalSummary";
const AllSummary = ({ data, change }) => {
    const [filteredData, setFilteredData] = useState({
        data: [],
        expense: 0,
        income: 0,
        balance: 0,
    });
    useEffect(() => {
        const total = getTtotalExpenseIncome(data);
        setFilteredData({
            data,
            expense: total.expense,
            income: total.income,
            balance: total.expense + total.income,
        });
    }, []);
    console.log(filteredData.data);
    return (
        <>
            <div className={classes.heading}>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => change("summary")}
                />
            </div>
            {filteredData.data.length > 0 && (
                <ShowTotalSummary
                    income={filteredData.income}
                    expense={filteredData.expense}
                    balance={filteredData.balance}
                />
            )}
            {filteredData.data.length == 0 && (
                <div className={classes.emptyData}>
                    {"There is no Income/Expense yet!!"}
                </div>
            )}
            {filteredData.data.map((el, i) => {
                return <ShowSingleBox {...el} key={i} />;
            })}
        </>
    );
};

export default AllSummary;
