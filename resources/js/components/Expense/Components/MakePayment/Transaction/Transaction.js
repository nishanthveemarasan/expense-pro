import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseStoreAction } from "../../../Store/Store";
import TransactionItem from "./TransactionItem";

const Transaction = () => {
    const mapStateToProps = (state) => {
        return {
            transactionData: state.expenseStore.payment.data,
        };
    };
    const state = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const onRemoveHandler = (id) => {
        dispatch(expenseStoreAction.removeTransactionItem({ id }));
    };
    return (
        <>
            {state.transactionData.map((transaction, i) => {
                return (
                    <TransactionItem
                        item={transaction}
                        key={i}
                        handler={onRemoveHandler}
                        id={i}
                    />
                );
            })}
        </>
    );
};
export default Transaction;
