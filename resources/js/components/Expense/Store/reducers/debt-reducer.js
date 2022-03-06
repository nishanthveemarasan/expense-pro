import { API_URL } from "../../../Helper/Helper";
import { debtStoreAction } from "../Store";

export const AddNewDebt = (data, page, token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/debts/store`, {
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
                alert(
                    `${response.message} to create/update Saving! Please give the right details`
                );
                return;
            }
            if (response.error) {
                alert(
                    `${response.error} to create/update Saving! Please give the right details`
                );
                return;
            }
            if (response.message) {
                alert(response.message);
                dispatch(debtStoreAction.showModal());
                return;
            }
            if (response.data) {
                // console.log(data);
                dispatch(debtStoreAction.createUpdateDebtData(data));
                dispatch(debtStoreAction.createDebt(data));
                dispatch(debtStoreAction.updatePage(page));
                dispatch(debtStoreAction.showModal());
            }
        } catch (error) {
            alert(
                error.message ??
                    "Unknown error happened!! plese try again after page reloads!"
            );
            dispatch(debtStoreAction.showModal());

            window.location.reload(false);
        }
    };
};
