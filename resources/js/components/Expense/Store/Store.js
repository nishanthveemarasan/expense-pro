import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import debtSlice from "./debt-slice";
import expenseSlice from "./expense-slice";
import savingSlice from "./saving-slice";
import todoSlice from "./todo-slice";

const store = configureStore({
    reducer: {
        expenseStore: expenseSlice.reducer,
        debtStore: debtSlice.reducer,
        todoStore: todoSlice.reducer,
        savingStore: savingSlice.reducer,
        authStore: authSlice.reducer,
    },
});

export const expenseStoreAction = expenseSlice.actions;
export const debtStoreAction = debtSlice.actions;
export const todoStoreAction = todoSlice.actions;
export const savingStoreAction = savingSlice.actions;
export const authStoreAction = authSlice.actions;
export default store;
