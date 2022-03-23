import React, { useEffect, useState } from "react";
import ShowSingleBox from "../../showSingleBox/ShowSingleBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./ExpenseSummary.module.css";
import Category from "../Category/Category";
import { useSelector } from "react-redux";
import DateCategory from "../Category/DateCategory";
import {
    filterDataByDateGroup,
    filterDataByType,
    getMonthlyArrayDetails,
    getWeeklyArrayDetails,
    getYearlyArrayDetails,
} from "../../../../../Helper/Helper";
import ShowSummary from "../../showSummary/showSummary";
let expense;
const ExpenseSummary = ({ data, change }) => {
    const [filteredData, setFilteredData] = useState({
        data: [],
        total: 0,
    });
    const [selectedDateGroup, setSelectedDateGroup] = useState([]);
    const [type, setType] = useState("All");
    const [selectedDate, setSelectedDate] = useState({});
    const [index, setIndex] = useState(0);
    useEffect(() => {
        expense = filterDataByType(data, "expense");
        setFilteredData({
            data: expense.data,
            total: expense.total,
        });
    }, []);
    const mapStateToProps = (state) => {
        return {
            date: state.expenseStore.dateGroup,
        };
    };

    const state = useSelector(mapStateToProps);

    const onCategoryChange = (type) => {
        const date = state.date[type];
        setIndex(0);
        setSelectedDate(date);
        if (type == "thisWeek") {
            const dateArray = getWeeklyArrayDetails(
                expense.data[expense.data.length - 1].date
            );

            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            const data = filterDataByDateGroup(expense.data, dateArray[0]);
            setFilteredData({ data: data.data, total: data.total });
        } else if (type == "thisMonth") {
            const dateArray = getMonthlyArrayDetails(
                expense.data[expense.data.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            const data = filterDataByDateGroup(expense.data, dateArray[0]);
            setFilteredData({ data: data.data, total: data.total });
        } else if (type == "thisYear") {
            const dateArray = getYearlyArrayDetails(
                expense.data[expense.data.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            const data = filterDataByDateGroup(expense.data, dateArray[0]);
            setFilteredData({ data: data.data, total: data.total });
        } else {
            setSelectedDateGroup([]);
            setFilteredData({
                data: expense.data,
                total: expense.total,
            });
        }
    };

    const onDateCategoryChange = (i) => {
        setSelectedDate(selectedDateGroup[i]);
        const data = filterDataByDateGroup(expense.data, selectedDateGroup[i]);
        setIndex(i);
        setFilteredData({
            data: data.data,
            total: data.total,
        });
    };
    return (
        <>
            <div className={classes.heading}>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => change("summary")}
                />
            </div>
            <Category change={onCategoryChange} />
            {selectedDateGroup.length > 0 && (
                <DateCategory
                    data={selectedDateGroup}
                    change={onDateCategoryChange}
                    index={index}
                />
            )}
            {filteredData.data.length > 0 && (
                <ShowSummary type="Total Expense" amount={filteredData.total} />
            )}
            {filteredData.data.length == 0 && (
                <div className={classes.emptyData}>
                    {"No Income made between "}
                    {`${selectedDate.dateStart} - ${selectedDate.dateEnd}`}
                </div>
            )}
            {filteredData.data.map((el, i) => {
                return <ShowSingleBox {...el} key={i} />;
            })}
        </>
    );
};

export default ExpenseSummary;
