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
import SModel from "../../../../UI/Model/SModel";

let summary;
const AllSummary = ({ data }) => {
    // console.log(data);
    const [content, setContent] = useState("datewise");
    const [categoryStyleNo, setCategoryStyleNo] = useState(1);
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
            expense: parseFloat(summary.expense, 2),
            income: parseFloat(summary.income, 2),
            balance: parseFloat(summary.expense + summary.income, 2),
            category: summary.category,
        });
    }, []);
    // console.log(filteredData);
    const onCategoryChange = (type, num) => {
        setContent("datewise");
        setType(type);
        setCategoryStyleNo(num);
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
            mainData,
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
            setCurrentIndex(-1);
        }

        copyCategoryObject[singleData.category].total += updatedAmount;
        if (copyCategoryObject[singleData.category].data.length == 0) {
            delete copyCategoryObject[singleData.category];
        }

        const newExpense =
            singleData.type == "expense"
                ? copyFilterData.expense + updatedAmount
                : copyFilterData.expense;
        const newIncome =
            singleData.type == "income"
                ? copyFilterData.income + updatedAmount
                : copyFilterData.income;
        const newBalance = copyFilterData.balance + updatedAmount;

        setFilteredData({
            data: copyFilterDataArray,
            expense: parseFloat(newExpense, 2),
            income: parseFloat(newIncome, 2),
            balance: parseFloat(newBalance, 2),
            category: copyCategoryObject,
        });
    };

    const showCategoryContent = (key) => {
        setShowCategory(true);
        setCurrentIndex(-1);
        setCategoryKey(key);
    };

    const onGoBackCategoryHandler = () => {
        setShowCategory(false);
        setCurrentIndex(-1);
    };

    const onUpdateExpenseHandler = (requestData) => {
        setMainData((prevState) => {
            const copyArray = prevState.slice();
            const findDataIndex = copyArray.findIndex(
                (el) => el.uuid == requestData.data.uuid
            );
            copyArray[findDataIndex] = {
                ...copyArray[findDataIndex],
                amount: requestData.newValue,
            };
            return [...copyArray];
        });

        const copyFilterData = { ...filteredData };
        const copyFilterDataArray = copyFilterData.data.slice();
        const findFilterDataIndex = copyFilterDataArray.findIndex(
            (el) => el.uuid == requestData.data.uuid
        );
        copyFilterDataArray[findFilterDataIndex] = {
            ...copyFilterDataArray[findFilterDataIndex],
            amount: requestData.newValue,
        };

        const copyCategoryObject = copyFilterData.category;

        const findCategoryIndex = copyCategoryObject[
            requestData.data.category
        ].data.findIndex((el) => el.uuid == requestData.data.uuid);

        copyCategoryObject[requestData.data.category].data[findCategoryIndex] =
            {
                ...copyCategoryObject[requestData.data.category].data[
                    findCategoryIndex
                ],
                amount: requestData.newValue,
            };

        let updatedAmount =
            requestData.data.type == "expense"
                ? Math.abs(requestData.data.amount) + requestData.newValue
                : requestData.newValue - requestData.data.amount;

        copyCategoryObject[requestData.data.category].total += updatedAmount;

        const newExpense =
            requestData.data.type == "expense"
                ? parseFloat(copyFilterData.expense, 2) + updatedAmount
                : copyFilterData.expense;

        const newIncome =
            requestData.data.type == "income"
                ? parseFloat(copyFilterData.income, 2) + updatedAmount
                : copyFilterData.income;
        const newBalance = copyFilterData.balance + updatedAmount;

        setFilteredData({
            data: copyFilterDataArray,
            expense: parseFloat(newExpense, 2),
            income: parseFloat(newIncome, 2),
            balance: parseFloat(newBalance, 2),
            category: copyCategoryObject,
        });
    };
    // console.log(filteredData.category);
    return (
        <>
            <SModel />
            {!showCategory && (
                <>
                    <Category
                        change={onCategoryChange}
                        styleNum={categoryStyleNo}
                    />

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
                        <div style={{ marginTop: "20px" }}>
                            {filteredData.data.map((el, i) => {
                                return (
                                    <ShowSingleBox
                                        data={el}
                                        key={i}
                                        index={i}
                                        currentIndex={currentIndex}
                                        changeIndex={onChangeIndexHandler}
                                        removeItem={removeItemFromFilteredData}
                                        update={onUpdateExpenseHandler}
                                    />
                                );
                            })}
                        </div>
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
                        update={onUpdateExpenseHandler}
                    />
                </>
            )}
        </>
    );
};

export default AllSummary;
