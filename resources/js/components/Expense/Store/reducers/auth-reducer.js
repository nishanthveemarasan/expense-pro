import { API_URL } from "../../../Helper/Helper";
import { authStoreAction } from "../Store";

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
                alert(
                    `${response.message} to create an account! Please give the right details`
                );
                dispatch(authStoreAction.updateLoading());
                return;
            }
            if (response.error) {
                alert(
                    `${response.error} to create/update Saving! Please give the right details`
                );
                dispatch(authStoreAction.updateLoading());
                return;
            }
            if (response.data) {
                // console.log(response.data);
                dispatch(authStoreAction.updateLoading());
                window.location.replace("http://expenseapp.test/");
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );
            dispatch(authStoreAction.updateLoading());
            return;
        }
    };
};
