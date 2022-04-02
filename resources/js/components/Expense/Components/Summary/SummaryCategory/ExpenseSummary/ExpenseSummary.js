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
import ShowCategoryContent from "../AllSummary/ShowCategoryContent";
let expense;
const ExpenseSummary = ({ data, change }) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [categoryStyleNo, setCategoryStyleNo] = useState(1);
    const [content, setContent] = useState("datewise");
    const [showCategory, setShowCategory] = useState(false);
    const [categoryKey, setCategoryKey] = useState("");
    const [mainData, setMainData] = useState(-1);
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
        setMainData(expense.data);
        setFilteredData({
            data: expense.data,
            total: parseFloat(expense.total, 2),
            category: expense.category,
        });
    }, []);
    // const mapStateToProps = (state) => {
    //     return {
    //         date: state.expenseStore.dateGroup,
    //     };
    // };

    // const state = useSelector(mapStateToProps);

    const onCategoryChange = (type, num) => {
        setContent("datewise");
        if (mainData.length == 0) {
            return;
        }
        // const date = state.date[type];
        let filterData = {};
        setCategoryStyleNo(num);
        setIndex(0);

        if (type == "thisWeek") {
            const dateArray = getWeeklyArrayDetails(
                mainData[mainData.length - 1].date
            );

            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(mainData, dateArray[0]);
        } else if (type == "thisMonth") {
            const dateArray = getMonthlyArrayDetails(
                mainData[mainData.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(mainData, dateArray[0]);
        } else if (type == "thisYear") {
            const dateArray = getYearlyArrayDetails(
                mainData[mainData.length - 1].date
            );
            setSelectedDateGroup(dateArray);
            setSelectedDate(dateArray[0]);
            filterData = filterDataByDateGroup(mainData, dateArray[0]);
        } else {
            filterData = filterDataByType(mainData, "expense");
            setSelectedDateGroup([]);
        }

        setFilteredData({
            data: filterData.data,
            total: parseFloat(filterData.total, 2),
            category: filterData.category,
        });
    };

    const onDateCategoryChange = (i) => {
        setSelectedDate(selectedDateGroup[i]);
        setIndex(i);

        const data = filterDataByDateGroup(mainData, selectedDateGroup[i]);
        setFilteredData({
            data: data.data,
            total: parseFloat(data.total, 2),
            category: data.category,
        });
    };

    const onContentChangeHandler = (content) => {
        setContent(content);
    };
    const onChangeIndexHandler = (index) => {
        setCurrentIndex(currentIndex == index ? -1 : index);
    };

    const showCategoryContent = (key) => {
        setShowCategory(true);
        setCurrentIndex(-1);
        setCategoryKey(key);
        // console.log(filteredData.category[key]);
    };

    const onGoBackCategoryHandler = () => {
        setShowCategory(false);
        setCurrentIndex(-1);
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

        const newTotal = copyFilterData.total + updatedAmount;

        setFilteredData({
            data: copyFilterDataArray,
            total: parseFloat(newTotal, 2),
            category: copyCategoryObject,
        });
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
            Math.abs(requestData.data.amount) +
            parseFloat(requestData.newValue, 2);

        copyCategoryObject[requestData.data.category].total += updatedAmount;

        const newTotal = copyFilterData.total + updatedAmount;

        setFilteredData({
            data: copyFilterDataArray,
            total: parseFloat(newTotal, 2),
            category: copyCategoryObject,
        });
    };
    return (
        <>
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
                        <ShowSummary
                            type="Total Expense"
                            amount={filteredData.total}
                            viewType="expense"
                        />
                    )}

                    <MainNav
                        content={content}
                        change={onContentChangeHandler}
                    />

                    {filteredData.data.length == 0 && (
                        <div className={classes.emptyData}>
                            {"No Expense made "}
                            {selectedDate?.dateStart &&
                                `between ${selectedDate.dateStart} - ${selectedDate.dateEnd}`}
                        </div>
                    )}

                    {content == "datewise" && filteredData.data.length > 0 && (
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

                    {content == "categorywise" && filteredData.data.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                            <ShowCategoryWiseBox
                                data={filteredData.category}
                                balance={filteredData.total}
                                income={0}
                                showCategoryContent={showCategoryContent}
                                update={onUpdateExpenseHandler}
                            />
                        </div>
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

export default ExpenseSummary;
