import { API_URL } from "../../../Helper/Helper";
import { expenseStoreAction } from "../Store";

export const addNewTransaction = (data) => {
    return async (dispatch) => {
        try {
            const expense = {
                expense: data,
            };
            const request = await fetch(`${API_URL}/expenses/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(expense),
            });
            const response = await request.json();
            if (response.errors) {
                console.log(response.errors);
                alert(
                    `${response.message} to create Expense! Please give the right details`
                );
                dispatch(expenseStoreAction.showModal());
                return;
            }
            if (response.data) {
                console.log(response.data);
                dispatch(
                    expenseStoreAction.savePayment({
                        data: response.data,
                    })
                );
                dispatch(expenseStoreAction.showModal());
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );
            window.location.reload(false);
        }
    };
};

export const initialExpenseData = (data) => {
    return (dispatch) => {
        console.log(data);
        dispatch(expenseStoreAction.initialExpenseData(data));
    };
};

export const addNewCategory = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            const request = await fetch(`${API_URL}/expenses/category/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                console.log(response.errors);
                alert(
                    `${response.message} to create Expense! Please give the right details`
                );
                dispatch(expenseStoreAction.showModal());
                return;
            }
            if (response.data) {
                dispatch(
                    expenseStoreAction.addNewCategory({
                        category: response.data,
                    })
                );
                dispatch(expenseStoreAction.showModal());
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );
            return;
            window.location.reload(false);
        }
    };
};
