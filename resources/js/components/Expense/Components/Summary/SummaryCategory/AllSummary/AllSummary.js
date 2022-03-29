import React, { useEffect, useState } from "react";
import ShowSingleBox from "../../showSingleBox/ShowSingleBox";

import classes from "./AllSummary.module.css";
import {
    filterAllSummaryDataByDateGroup,
    getMonthlyArrayDetails,
    getTtotalExpenseIncome,
    getWeeklyArrayDetails,
    getYearlyArrayDetails,
} from "../../../../../Helper/Helper";
import ShowTotalSummary from "../../ShowTotalSummary/ShowTotalSummary";
import Category from "../Category/Category";
import DateCategory from "../Category/DateCategory";
import { Nav } from "react-bootstrap";
import NavItem from "../../../../UI/Nav/NavItem";
import ContentNav from "../ContentNav/ContentNav";
import ShowCategoryWiseBox from "../../showCategoryWiseBox/showCategoryWiseBox";
import MainNav from "../ContentNav/MainNav";
import ShowCategorySummary from "../../ShowCategorySummary/ShowCategorySummary";
import ShowCategoryContent from "./ShowCategoryContent";

let summary;
const AllSummary = ({ data }) => {
    // console.log(data);
    const [content, setContent] = useState("datewise");
    const [showCategory, setShowCategory] = useState(false);
    const [categoryKey, setCategoryKey] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [mainData, setMainData] = useState(-1);
    const [filteredData, setFilteredData] = useState({
        data: [],
        expense: 0,
        income: 0,
        balance: 0,
        category: [],
    });

    const [selectedDateGroup, setSelectedDateGroup] = useState([]);
    const [type, setType] = useState("All");
    const [selectedDate, setSelectedDate] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setMainData(data);
        summary = getTtotalExpenseIncome(data);
        setFilteredData({
            data,
            expense: summary.expense,
            income: summary.income,
            balance: summary.expense + summary.income,
            category: summary.category,
        });
    }, []);
    // console.log(filteredData);
    const onCategoryChange = (type) => {
        setType(type);
        setIndex(0);

        if (mainData.length == 0) {
            return;
        }
        if (type == "thisWeek") {
            const dateArray = getWeeklyArrayDetails(
                mainData[mainData.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            const filter = filterAllSummaryDataByDateGroup(
                mainData,
                dateArray[0]
            );
            setFilteredData(filter);
        } else if (type == "thisMonth") {
            const dateArray = getMonthlyArrayDetails(
                mainData[mainData.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            const filter = filterAllSummaryDataByDateGroup(
                mainData,
                dateArray[0]
            );
            setFilteredData(filter);
        } else if (type == "thisYear") {
            const dateArray = getYearlyArrayDetails(
                mainData[mainData.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            const filter = filterAllSummaryDataByDateGroup(
                mainData,
                dateArray[0]
            );
            setFilteredData(filter);
        } else {
            setSelectedDateGroup([]);
            const filter = getTtotalExpenseIncome(mainData);
            setFilteredData({
                mainData,
                expense: filter.expense,
                income: filter.income,
                balance: filter.expense + filter.income,
                category: filter.category,
            });
        }
    };

    const onDateCategoryChange = (i) => {
        setSelectedDate(selectedDateGroup[i]);
        const filter = filterAllSummaryDataByDateGroup(
            data,
            selectedDateGroup[i]
        );
        setIndex(i);
        setFilteredData(filter);
    };

    const onContentChangeHandler = (content) => {
        setContent(content);
    };

    const onChangeIndexHandler = (index) => {
        setCurrentIndex(currentIndex == index ? -1 : index);
    };
    const removeItemFromFilteredData = (singleData, updatedAmount) => {
        setMainData((prevState) => {
            const copyArray = prevState.slice();
            const findDataIndex = copyArray.findIndex(
                (el) => el.uuid == singleData.uuid
            );
            copyArray.splice(findDataIndex, 1);
            return [...copyArray];
        });

        const copyFilterData = { ...filteredData };
        const copyFilterDataArray = copyFilterData.data.slice();
        const findFilterDataIndex = copyFilterDataArray.findIndex(
            (el) => el.uuid == singleData.uuid
        );
        copyFilterDataArray.splice(findFilterDataIndex, 1);

        const copyCategoryObject = copyFilterData.category;

        const findCategoryIndex = copyCategoryObject[
            singleData.category
        ].data.findIndex((el) => el.uuid == singleData.uuid);

        copyCategoryObject[singleData.category].data.splice(
            findCategoryIndex,
            1
        );

        if (copyCategoryObject[singleData.category].data.length == 0) {
            setShowCategory(false);
            setCategoryKey("");
        }

        copyCategoryObject[singleData.category].total += updatedAmount;
        if (copyCategoryObject[singleData.category].data.length == 0) {
            delete copyCategoryObject[singleData.category];
        }

        const newExpense =
            singleData.type == "expense"
                ? parseFloat(copyFilterData.expense, 2) +
                  parseFloat(updatedAmount, 2)
                : copyFilterData.expense;
        const newIncome =
            singleData.type == "income"
                ? parseFloat(copyFilterData.income, 2) +
                  parseFloat(updatedAmount, 2)
                : copyFilterData.income;
        const newBalance =
            parseFloat(copyFilterData.balance, 2) +
            parseFloat(updatedAmount, 2);

        setFilteredData({
            data: copyFilterDataArray,
            expense: newExpense,
            income: newIncome,
            balance: newBalance,
            category: copyCategoryObject,
        });
    };

    const showCategoryContent = (key) => {
        setShowCategory(true);
        setCategoryKey(key);
        // console.log(filteredData.category[key]);
    };

    const onGoBackCategoryHandler = () => {
        setShowCategory(false);
        setCurrentIndex(-1);
    };

    return (
        <>
            {!showCategory && (
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
                        <ShowTotalSummary
                            income={filteredData.income}
                            expense={filteredData.expense}
                            balance={filteredData.balance}
                        />
                    )}
                    <MainNav
                        content={content}
                        change={onContentChangeHandler}
                    />

                    {filteredData.data.length == 0 && (
                        <div className={classes.emptyData}>
                            {"There is no Income/Expense "}
                            {selectedDate?.dateStart &&
                                `between ${selectedDate.dateStart} - ${selectedDate.dateEnd}`}
                        </div>
                    )}
                    {content == "datewise" && (
                        <>
                            {filteredData.data.map((el, i) => {
                                return (
                                    <ShowSingleBox
                                        data={el}
                                        key={i}
                                        index={i}
                                        currentIndex={currentIndex}
                                        changeIndex={onChangeIndexHandler}
                                        removeItem={removeItemFromFilteredData}
                                    />
                                );
                            })}
                        </>
                    )}
                    {content == "categorywise" && (
                        <ShowCategoryWiseBox
                            data={filteredData.category}
                            balance={filteredData.expense}
                            income={filteredData.income}
                            showCategoryContent={showCategoryContent}
                        />
                    )}
                </>
            )}
            {showCategory && (
                <>
                    <ShowCategoryContent
                        goBack={onGoBackCategoryHandler}
                        categoryData={filteredData.category[categoryKey]}
                        categoryKey={categoryKey}
                        currentIndex={currentIndex}
                        changeIndex={onChangeIndexHandler}
                        removeItem={removeItemFromFilteredData}
                    />
                </>
            )}
        </>
    );
};

export default AllSummary;
