import { API_URL } from "../../../Helper/Helper";
import { savingStoreAction } from "../Store";

export const addNewSaving = (data, page, token) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/savings/store`, {
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
                    `${response.message} to create Saving! Please give the right details`
                );
                dispatch(savingStoreAction.showModel());
                return;
            }
            if (response.message) {
                alert(response.message);
                dispatch(savingStoreAction.showModel());
                return;
            }
            if (response.data) {
                dispatch(
                    savingStoreAction.updateSavingData({ data: response.data })
                );
                dispatch(savingStoreAction.updatePage(page));
                dispatch(savingStoreAction.showModel());
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

export const initialSavingsData = (data, token) => {
    return (dispatch) => {
        dispatch(savingStoreAction.initialSavingsData({ data, token }));
    };
};
