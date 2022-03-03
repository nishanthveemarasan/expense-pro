import { debtStoreAction } from "../Store";

export const AddNewDebt = (data, page) => {
    return (dispatch) => {
        setTimeout(
            () => {
                const debtData = {
                    action: data.action,
                    formData: {
                        ...data.formData,
                        id: data.formData.id,
                    },
                };

                dispatch(debtStoreAction.createDebt(debtData));
                dispatch(debtStoreAction.createUpdateDebtData(debtData));
                dispatch(debtStoreAction.updatePage(page));
                dispatch(debtStoreAction.showModal());
            },
            2000,
            data,
            page
        );
    };
};
