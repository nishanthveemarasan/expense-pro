import { API_URL } from "../../../Helper/Helper";
import { debtStoreAction } from "../Store";

export const AddNewDebt = (data, page) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/debts/store`, {
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
            if (response.data) {
                console.log(response.data);
                dispatch(debtStoreAction.createDebt(data));
                dispatch(debtStoreAction.createUpdateDebtData(data));
                dispatch(debtStoreAction.updatePage(page));
                dispatch(debtStoreAction.showModal());
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
