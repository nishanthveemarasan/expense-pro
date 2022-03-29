import React, { useEffect, useState } from "react";
import ShowSingleBox from "../../showSingleBox/ShowSingleBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./IncomeSummary.module.css";
import Category from "../Category/Category";
import { useSelector } from "react-redux";
import {
    filterDataByDateGroup,
    filterDataByType,
    getMonthlyArrayDetails,
    getWeeklyArrayDetails,
    getYearlyArrayDetails,
} from "../../../../../Helper/Helper";
import DateCategory from "../Category/DateCategory";
import ShowSummary from "../../showSummary/showSummary";
import MainNav from "../ContentNav/MainNav";
import ShowCategoryWiseBox from "../../showCategoryWiseBox/showCategoryWiseBox";
let income;

const IncomeSummary = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [content, setContent] = useState("datewise");
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
        income = filterDataByType(data, "income");
        setFilteredData({
            data: income.data,
            total: income.total,
            category: income.category,
        });
    }, [data]);
    const mapStateToProps = (state) => {
        return {
            date: state.expenseStore.dateGroup,
        };
    };

    const state = useSelector(mapStateToProps);

    const onCategoryChange = (type) => {
        setType(type);
        setIndex(0);
        let filterData = {};
        if (income.data.length == 0) {
            return;
        }
        if (type == "thisWeek") {
            const dateArray = getWeeklyArrayDetails(
                income.data[income.data.length - 1].date
            );

            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(income.data, dateArray[0]);
        } else if (type == "thisMonth") {
            const dateArray = getMonthlyArrayDetails(
                income.data[income.data.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(income.data, dateArray[0]);
        } else if (type == "thisYear") {
            const dateArray = getYearlyArrayDetails(
                income.data[income.data.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(income.data, dateArray[0]);
        } else {
            setSelectedDateGroup([]);
            filterData = income;
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

        const data = filterDataByDateGroup(income.data, selectedDateGroup[i]);
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
                    type="Total Income"
                    amount={filteredData.total}
                    viewType="income"
                />
            )}
            <MainNav content={content} change={onContentChangeHandler} />

            {filteredData.data.length == 0 && (
                <div className={classes.emptyData}>
                    {"No Income made "}
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
                    balance={0}
                    income={filteredData.total}
                />
            )}
        </>
    );
};

export default IncomeSummary;
