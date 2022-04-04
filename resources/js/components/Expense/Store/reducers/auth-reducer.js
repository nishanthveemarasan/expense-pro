import { API_URL, errorArray, WEB_URL } from "../../../Helper/Helper";
import { authStoreAction, expenseStoreAction } from "../Store";

export const registerUser = (data) => {
    return async (dispatch) => {
        dispatch(authStoreAction.updateLoading());
        try {
            const request = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                const errors = errorArray(response.errors);
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: errors,
                        reload: false,
                    })
                );
            } else if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `${response.message} Incorrect Register Details`,
                        reload: false,
                    })
                );
            } else if (response.error) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: response.error,
                        reload: false,
                    })
                );
            } else if (response.token) {
                localStorage.setItem("token", response.token);
                window.location.replace(`${WEB_URL}`);
            }
            dispatch(authStoreAction.updateLoading());

            return;
        } catch (error) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: `${error.message} ?? Unknown error happened!! plese try again`,
                    reload: true,
                })
            );
            dispatch(authStoreAction.updateLoading());
            return;
        }
    };
};

export const loginUser = (data) => {
    return async (dispatch) => {
        try {
            dispatch(authStoreAction.updateLoading());
            const request = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            if (response.errors) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `Incorrect Login Details`,
                        reload: false,
                    })
                );
            } else if (response.message) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `Incorrect Login Details`,
                        reload: false,
                    })
                );
            } else if (response.error) {
                dispatch(
                    expenseStoreAction.onOpenErrorModal({
                        error: `Incorrect Login Details`,
                        reload: false,
                    })
                );
            } else if (response.token) {
                localStorage.setItem("token", response.token);
                window.location.replace(`${WEB_URL}`);
            }
            dispatch(authStoreAction.updateLoading());
            return;
        } catch (error) {
            dispatch(authStoreAction.updateLoading());
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: `${error.message} ?? Unknown error happened!! plese try again`,
                    reload: true,
                })
            );
        }
    };
};
