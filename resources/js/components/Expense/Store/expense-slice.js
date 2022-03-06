import { createSlice } from "@reduxjs/toolkit";
import { getDate, getExpenseSummary } from "../../Helper/Helper";

const initialState = {
    showModal: false,
    appToken: null,
    summary: {
        today: {
            income: 0,
            expense: 0,
            balance: 0,
            chart: {},
        },
        week: {
            income: 0,
            expense: 0,
            balance: 0,
            chart: {},
        },
        month: {
            income: 0,
            expense: 0,
            balance: 0,
            chart: {},
        },
        year: {
            income: 0,
            expense: 0,
            balance: 0,
            chart: {},
        },
        balance: 0,
    },
    changeSummary: true,
    chartKey: "year",
    page: "dashboard",
    subCategoryPage: "maincategory",
    mainPage: "expenseCategory",
    action: "",
    createDebt: "",
    dateGroup: getDate(),
    heading: "Expense Manager",
    payDate: null,
    data: {
        showPayment: true,
    },
    model: false,
    payment: {
        type: "",
        add: { selectedCategory: "", amount: "" },
        transData: [],
        data: {
            expense: [],
            category: [],
        },
    },

    selectedCategory: [
        {
            id: -1,
            show: false,
        },
    ],
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        chageChartFilterKey(state, action) {
            state.chartKey = action.payload.chartKey;
        },
        showPayment(state, action) {
            state.data.showPayment = action.payload.showPayment;
        },
        setDate(state, action) {
            state.dateGroup = action.payload.dateGroup;
            state.payDate = action.payload.dateGroup.today.date;
        },
        setPayDate(state, action) {
            state.payDate = action.payload.date;
            state.model = !state.model;
        },
        showModel(state, action) {
            state.model = !state.model;
        },
        setPaymentType(state, action) {
            state.payment.type = action.payload.type;
        },
        removeTransactionItem(state, action) {
            const id = action.payload.id;
            const copyData = [...state.payment.transData];

            copyData.splice(id, 1);
            state.payment = {
                ...state.payment,
                transData: [...copyData],
            };
        },
        addTranssactionItem(state, action) {
            const copyData = [...state.payment.transData, action.payload.data];
            state.payment = {
                ...state.payment,
                transData: [...copyData],
            };

            state.payment.add = {
                selectedCategory: "",
                amount: "",
            };
        },

        updateSelectedCategory(state, action) {
            const id = action.payload.id;
            const currentArray = state.selectedCategory.slice();
            const findIndex = currentArray.findIndex((el) => el.id == id);
            if (findIndex !== -1) {
                const existingItem = currentArray[findIndex];
                const data = {
                    ...existingItem,
                    show: !existingItem.show,
                };
                currentArray[findIndex] = data;
            } else {
                const data = {
                    id,
                    show: true,
                };
                currentArray.push(data);
            }

            state.selectedCategory = [...currentArray];
        },

        updatePage(state, action) {
            state.mainPage = action.payload.mainPage;
            state.page = action.payload.page;
        },
        updateSubPage(state, action) {
            state.subCategoryPage = action.payload.page;
        },
        addNewCategory(state, action) {
            const copyArray = state.payment.data.category.slice();
            copyArray.unshift(action.payload.category);
            state.payment.data = {
                ...state.payment.data,
                category: [...copyArray],
            };
            state.subCategoryPage = "maincategory";
        },
        updateChosenCategory(state, action) {
            state.payment.add = {
                ...state.payment.add,
                selectedCategory: action.payload.value,
            };
            state.mainPage = "payment";
            state.selectedCategory = [
                {
                    id: -1,
                    show: false,
                },
            ];
        },
        updateAddPaymentAmount(state, action) {
            state.payment.add = {
                ...state.payment.add,
                amount: action.payload.value,
            };
        },
        savePayment(state, action) {
            const copySummary = { ...state.summary };
            const getNewExpenseSummary = getExpenseSummary(
                copySummary,
                state.dateGroup,
                action.payload.data
            );
            state.summary = {
                ...state.summary,
                ...getNewExpenseSummary,
            };
            state.changeSummary = false;
            const copyArray = state.payment.data.expense.slice();
            const newArray = action.payload.data.concat(copyArray);

            state.payment = {
                ...state.payment,
                type: "",
                add: { selectedCategory: "", amount: "" },
                transData: [],
                data: {
                    ...state.payment.data,
                    expense: newArray,
                },
            };
            state.mainPage = "expenseCategory";
            state.page = "dashboard";
        },
        calculateSummary(state, action) {
            const copySummary = { ...state.summary };
            const getNewExpenseSummary = getExpenseSummary(
                copySummary,
                state.dateGroup,
                state.payment.data.expense
            );
            state.summary = {
                ...state.summary,
                ...getNewExpenseSummary,
            };
        },

        showModal(state, action) {
            state.showModal = !state.showModal;
        },
        initialExpenseData(state, action) {
            state.payment.data.expense = action.payload.expense;
            state.payment.data.category = action.payload.category;
            state.appToken = action.payload.token;
        },
    },
});

export default expenseSlice;
