import { API_URL, errors, WEB_URL } from "../../../Helper/Helper";
import { expenseStoreAction } from "../Store";

export const addNewTransaction = (data, token) => {
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
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(expense),
            });
            const response = await request.json();
            if (response.errors) {
                dispatch(expenseStoreAction.showModal());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! Please give the correct input to create expense`,
                        reload: false,
                    })
                );
            } else if (response.message) {
                dispatch(expenseStoreAction.showModal());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: false,
                    })
                );
            } else if (response.data) {
                // console.log(response.data);
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
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: `${error.message} ! Unknown error happened!! plese try again after page reloads!`,
                    reload: true,
                })
            );
        }
    };
};

export const initialExpenseData = (data, token) => {
    return (dispatch) => {
        // localStorage.setItem("app_token", token);
        const iniData = {
            ...data,
            token,
        };
        dispatch(expenseStoreAction.initialExpenseData(iniData));
    };
};

export const addNewCategory = (data, token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/expenses/category/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                // console.log(response.errors);
                alert(errors(response.errors));
                dispatch(expenseStoreAction.showModal());
                return;
            }
            if (response.message) {
                alert(response.message);
                dispatch(expenseStoreAction.showModel());
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
        }
    };
};

export const addNewRecurringPayment = (data, token) => {
    return async (dispatch) => {
        try {
            dispatch(expenseStoreAction.showModal());
            const request = await fetch(`${API_URL}/recurring/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                alert(errors(response.errors));
                dispatch(expenseStoreAction.showModal());
                return;
            }
            if (response.data) {
                dispatch(expenseStoreAction.updateRecurringData(response.data));
                dispatch(expenseStoreAction.showModal());
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );
            // window.location.reload(false);
            return;
        }
    };
};

export const editExistingRecurringPayment = (data, token) => {
    return async (dispatch) => {
        try {
            dispatch(expenseStoreAction.showModal());
            const request = await fetch(`${API_URL}/recurring/${data.uuid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                alert(errors(response.errors));
                dispatch(expenseStoreAction.showModal());
                return;
            }
            if (response.data) {
                dispatch(
                    expenseStoreAction.updateExistingRecurringData(response)
                );
                dispatch(expenseStoreAction.showModal());
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );
            return;
            // window.location.reload(false);
        }
    };
};

export const removeExpenseSummaryAndData = (data) => {
    return async (dispatch) => {
        const url = `${API_URL}/expenses/${data.data.uuid}/delete`;

        try {
            dispatch(expenseStoreAction.showModal());
            dispatch(expenseStoreAction.removeExpenseSummaryAndData(data));

            const request = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            });
            const response = await request.json();

            if (response.errors) {
                dispatch(expenseStoreAction.showModal());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.message) {
                dispatch(expenseStoreAction.showModal());
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.data) {
                dispatch(expenseStoreAction.showModal());
            }
        } catch (error) {
            dispatch(expenseStoreAction.showModal());
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Unknown error happened!! plese try again after page reloads!",
                    reload: true,
                })
            );
        }
    };
};

export const updateExpenseSummaryAndData = (data) => {
    return async (dispatch) => {
        dispatch(expenseStoreAction.updateExpenseSummaryAndData(data));
        const url = `${API_URL}/expenses/${data.data.data.uuid}/update`;
        const requestData = {
            amount: data.data.newValue,
        };
        // console.log(url, requestData, data.token);
        try {
            const request = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(requestData),
            });
            const response = await request.json();
            if (response.errors) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
            if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} ! We are unable to process your request please try again`,
                        reload: true,
                    })
                );
            }
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: `${response.message} ! We are unable to process your request please try again`,
                    reload: true,
                })
            );
        }
    };
};

export const getInitialExpenseData = (token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/expenses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const response = await request.json();

            if (response.data) {
                dispatch(initialExpenseData(response.data, token));
                dispatch(expenseStoreAction.calculateSummary());
                dispatch(expenseStoreAction.updateLoadingPage());
            } else {
                localStorage.removeItem("token");
                window.location.replace(`${WEB_URL}/auth`);
            }
        } catch (error) {
            localStorage.removeItem("token");
            window.location.replace(`${WEB_URL}/auth`);
        }
    };
};
