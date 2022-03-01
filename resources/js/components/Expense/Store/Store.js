import { configureStore } from "@reduxjs/toolkit";
import debtSlice from "./debt-slice";
import expenseSlice from "./expense-slice";
import todoSlice from "./todo-slice";

const store = configureStore({
    reducer: {
        expenseStore: expenseSlice.reducer,
        debtStore: debtSlice.reducer,
        todoStore: todoSlice.reducer,
    },
});

export const expenseStoreAction = expenseSlice.actions;
export const debtStoreAction = debtSlice.actions;
export const todoStoreAction = todoSlice.actions;

export default store;
