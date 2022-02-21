import { createSlice, configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense-slice";

const store = configureStore({
    reducer: {
        expenseStore: expenseSlice.reducer,
    },
});

export const expenseStoreAction = expenseSlice.actions;

export default store;
