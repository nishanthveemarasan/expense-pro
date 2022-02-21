import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dateGroup: null,
    data: {
        totalBalance: {
            balance: -24000,
        },
        todayExpense: {
            income: 0,
            expense: 20,
            balance: 22000,
        },
        showPayment: true,
    },
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        showPayment(state, action) {
            state.data.showPayment = action.payload.showPayment;
        },
        setDate(state, action) {
            state.dateGroup = action.payload.dateGroup;
            console.log(state.dateGroup);
        },
    },
});

export default expenseSlice;
