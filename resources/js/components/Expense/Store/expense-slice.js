import { createSlice } from "@reduxjs/toolkit";
import {
    getCategoryNameArray,
    getDate,
    getExpenseSummary,
    removeItemFromExpenseArray,
    updateExpenseSummary,
} from "../../Helper/Helper";

const initialState = {
    showModal: false,
    appToken: null,
    deleteModal: {
        open: false,
        heading: "",
        body: "",
        data: {},
    },
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
    recurringPage: {
        page: "main",
        data: {},
    },
    mainPage: "expenseCategory",
    prevMainPage: null,
    summaryContent: {
        page: "",
        heading: "",
    },
    action: "",
    createDebt: "",
    dateGroup: getDate(),
    heading: "Expense Manager",
    editRecurringFromdata: {},
    payDate: null,
    data: {
        showPayment: true,
    },
    model: false,
    errorModal: {
        open: false,
        error: "",
        showHeading: false,
        showButton: false,
        reload: false,
    },
    payment: {
        type: "expense",
        categoryNames: [],
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
    recurringPayment: {
        name: "",
        amount: 1.0,
        pay_method: "monthly",
        num_of_payment: 2,
    },
    recurringData: [],
    checked_payment_number: false,
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
            state.recurringPage = {
                page: "main",
                data: {},
            };
        },
        UpdateSummaryContentPage(state, action) {
            state.mainPage = action.payload.mainPage;
            state.summaryContent = {
                page: action.payload.page,
                heading: action.payload.heading,
            };
        },
        clearSelectedCategory(state, action) {
            state.selectedCategory = [
                {
                    id: -1,
                    show: false,
                },
            ];
            state.payment.add.selectedCategory = "";
        },
        updatePrevMainPage(state, action) {
            state.prevMainPage = action.payload.prevMainPage;
        },
        updateSubPage(state, action) {
            state.subCategoryPage = action.payload.page;
        },
        addNewCategory(state, action) {
            const copyArray = state.payment.data.category.slice();
            const findIndex = copyArray.findIndex(
                (el, i) =>
                    el.category.trim().toLowerCase() ==
                    action.payload.category.category.trim().toLowerCase()
            );

            if (copyArray[findIndex]) {
                copyArray[findIndex].items = action.payload.category.items;
            } else {
                copyArray.unshift(action.payload.category);
                const nameArray = state.payment.categoryNames.slice();
                nameArray.unshift({
                    value: action.payload.category.category,
                    label: action.payload.category.category,
                });
                state.payment.categoryNames = nameArray;
            }

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
            state.mainPage = action.payload.prevMainPage;
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
            state.recurringData = action.payload.recurring;
            state.appToken = action.payload.token;
            state.payment.categoryNames = getCategoryNameArray(
                action.payload.category
            );
        },
        updateRecurringFormData(state, action) {
            state.recurringPayment[action.payload.type] = action.payload.value;
        },
        updateRecurringPaymentNumber(state, action) {
            const cValue = action.payload.value;
            state.checked_payment_number = cValue;
            state.recurringPayment.num_of_payment = cValue ? "" : 1;
        },
        updateRecurringPage(state, action) {
            state.recurringPage.page = action.payload.page;
            state.recurringPage.data = action.payload.data;
        },
        updateRecurringData(state, action) {
            const copyArray = state.recurringData.slice();
            copyArray.unshift(action.payload.recurring_payment);
            state.recurringData = copyArray;

            const copyExpense = state.payment.data.expense.slice();
            if (action.payload.expense_data) {
                const copySummary = { ...state.summary };
                const getNewExpenseSummary = getExpenseSummary(
                    copySummary,
                    state.dateGroup,
                    [action.payload.expense_data]
                );
                state.summary = {
                    ...state.summary,
                    ...getNewExpenseSummary,
                };
                state.changeSummary = false;

                copyExpense.unshift(action.payload.expense_data);
                state.payment.data.expense = copyExpense;
            }
            state.mainPage = "expenseCategory";
            state.page = "recurring";
        },

        updateRecurringSpecificData(state, action) {
            const data = action.payload.formdata;
            state.payment.type = data.type;
            state.payDate = data.next_pay_date;
            state.editRecurringFromdata = {
                uuid: data.uuid,
                type: data.type,
                name: data.name,
                amount: data.amount,
                pay_method: data.pay_method,
                num_of_pay: data.num_of_pay,
                current_pay_num: data.current_pay_num,
                checked_payment_number:
                    data.susbscription_type == "limited" ? false : true,
                next_pay_date: data.next_pay_date,
                category: data.category,
            };
        },
        editRecurringSpecificFormData(state, action) {
            state.editRecurringFromdata[action.payload.type] =
                action.payload.value;
        },
        updateExistingRecurringData(state, action) {
            const data = action.payload.data;
            const copyArray = state.recurringData.slice();
            const findIndex = copyArray.findIndex((el) => el.uuid == data.uuid);
            copyArray[findIndex] = data;
            state.recurringData = copyArray;
            state.mainPage = "expenseCategory";
            state.page = "recurring";
        },
        onCloseErrorModal(state, action) {
            state.errorModal = {
                open: false,
                error: "",
                showHeading: false,
                showButton: false,
            };
        },
        onOpenErrorModal(state, action) {
            state.errorModal = {
                open: true,
                error: action.payload.error,
                reload: action.payload.reload ? action.payload.reload : false,
            };
        },
        onDeleteModal(state, action) {
            state.deleteModal = {
                open: action.payload.open,
                heading: action.payload.heading,
                body: action.payload.body,
                data: action.payload.data,
            };
        },

        removeExpenseSummaryAndData(state, action) {
            const copySummary = { ...state.summary };
            const copyExpenseData = state.payment.data.expense.slice();

            const latestExpenseData = removeItemFromExpenseArray(
                copyExpenseData,
                action.payload.data
            );
            state.payment.data.expense = latestExpenseData;
            const newSummary = updateExpenseSummary(
                copySummary,
                state.dateGroup,
                action.payload.data,
                action.payload.updatedAmount
            );
            state.summary = newSummary;
        },
    },
});

export default expenseSlice;
