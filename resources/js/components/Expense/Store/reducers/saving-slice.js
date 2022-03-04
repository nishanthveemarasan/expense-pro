import { API_URL } from "../../../Helper/Helper";
import { savingStoreAction } from "../Store";

export const addNewSaving = (data, page) => {
    return async (dispatch) => {
        try {
            const request = await fetch(`${API_URL}/savings/store`, {
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
                    `${response.message} to create Saving! Please give the right details`
                );
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
        // setTimeout(
        //     () => {
        //         dispatch(savingStoreAction.updateSavingData({ data }));
        //         dispatch(savingStoreAction.updatePage(page));
        //         dispatch(savingStoreAction.showModel());
        //     },
        //     1000,
        //     data,
        //     page
        // );
    };
};

export const initialSavingsData = (data) => {
    return (dispatch) => {
        dispatch(savingStoreAction.initialSavingsData({ data }));
    };
};
