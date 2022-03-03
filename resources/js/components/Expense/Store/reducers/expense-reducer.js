import { expenseStoreAction } from "../Store";

export const addNewTransaction = (data) => {
    return (dispatch) => {
        setTimeout(
            () => {
                dispatch(
                    expenseStoreAction.savePayment({
                        data,
                    })
                );
                dispatch(expenseStoreAction.showModal());
            },
            2000,
            data
        );
    };
};
