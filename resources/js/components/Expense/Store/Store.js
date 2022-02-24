import { configureStore } from "@reduxjs/toolkit";
import debtSlice from "./debt-slice";
import expenseSlice from "./expense-slice";

const store = configureStore({
    reducer: {
        expenseStore: expenseSlice.reducer,
        debtStore: debtSlice.reducer,
    },
});

export const expenseStoreAction = expenseSlice.actions;
export const debtStoreAction = debtSlice.actions;

export default store;
