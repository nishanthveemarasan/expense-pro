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
import MainNav from "../ContentNav/MainNav";
import ShowCategoryWiseBox from "../../showCategoryWiseBox/showCategoryWiseBox";
let expense;
const ExpenseSummary = ({ data, change }) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [content, setContent] = useState("datewise");
    const [showCategory, setShowCategory] = useState(false);
    const [categoryKey, setCategoryKey] = useState("");
    const [filteredData, setFilteredData] = useState({
        data: [],
        total: 0,
        category: [],
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
            category: expense.category,
        });
    }, [data]);
    const mapStateToProps = (state) => {
        return {
            date: state.expenseStore.dateGroup,
        };
    };

    const state = useSelector(mapStateToProps);

    const onCategoryChange = (type) => {
        if (expense.data.length == 0) {
            return;
        }
        const date = state.date[type];
        let filterData = {};
        setIndex(0);
        setSelectedDate(date);
        if (type == "thisWeek") {
            const dateArray = getWeeklyArrayDetails(
                expense.data[expense.data.length - 1].date
            );

            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(expense.data, dateArray[0]);
        } else if (type == "thisMonth") {
            const dateArray = getMonthlyArrayDetails(
                expense.data[expense.data.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(expense.data, dateArray[0]);
        } else if (type == "thisYear") {
            const dateArray = getYearlyArrayDetails(
                expense.data[expense.data.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(expense.data, dateArray[0]);
        } else {
            filterData = { ...expense };
            console.log(filterData);
            setSelectedDateGroup([]);
        }

        setFilteredData({
            data: filterData.data,
            total: filterData.total,
            category: filterData.category,
        });
    };

    const onDateCategoryChange = (i) => {
        setSelectedDate(selectedDateGroup[i]);
        setIndex(i);

        const data = filterDataByDateGroup(expense.data, selectedDateGroup[i]);
        setFilteredData({
            data: data.data,
            total: data.total,
            category: data.category,
        });
    };

    const onContentChangeHandler = (content) => {
        setContent(content);
    };
    const onChangeIndexHandler = (index) => {
        setCurrentIndex(currentIndex == index ? -1 : index);
    };
    return (
        <>
            <Category change={onCategoryChange} />
            {selectedDateGroup.length > 0 && (
                <DateCategory
                    data={selectedDateGroup}
                    change={onDateCategoryChange}
                    index={index}
                />
            )}
            {filteredData.data.length > 0 && (
                <ShowSummary
                    type="Total Expense"
                    amount={filteredData.total}
                    viewType="expense"
                />
            )}

            <MainNav content={content} change={onContentChangeHandler} />

            {filteredData.data.length == 0 && (
                <div className={classes.emptyData}>
                    {"No Expense made "}
                    {selectedDate?.dateStart &&
                        `between ${selectedDate.dateStart} - ${selectedDate.dateEnd}`}
                </div>
            )}

            {content == "datewise" && filteredData.data.length > 0 && (
                <>
                    {filteredData.data.map((el, i) => {
                        return (
                            <ShowSingleBox
                                data={el}
                                key={i}
                                index={i}
                                currentIndex={currentIndex}
                                changeIndex={onChangeIndexHandler}
                            />
                        );
                    })}
                </>
            )}

            {content == "categorywise" && filteredData.data.length > 0 && (
                <ShowCategoryWiseBox
                    data={filteredData.category}
                    balance={filteredData.total}
                    income={0}
                />
            )}
        </>
    );
};

export default ExpenseSummary;
