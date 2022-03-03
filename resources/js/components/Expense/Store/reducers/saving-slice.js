import { savingStoreAction } from "../Store";

export const addNewSaving = (data, page) => {
    return (dispatch) => {
        setTimeout(
            () => {
                dispatch(savingStoreAction.updateSavingData({ data }));
                dispatch(savingStoreAction.updatePage(page));
                dispatch(savingStoreAction.showModel());
            },
            1000,
            data,
            page
        );
    };
};
