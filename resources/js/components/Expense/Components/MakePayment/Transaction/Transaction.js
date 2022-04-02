import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { expenseStoreAction } from "../../../Store/Store";
import TransactionItem from "./TransactionItem";
import "./Transition.css";
const Transaction = () => {
    const mapStateToProps = (state) => {
        return {
            transactionData: state.expenseStore.payment.transData,
        };
    };
    const state = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const onRemoveHandler = (id) => {
        dispatch(expenseStoreAction.removeTransactionItem({ id }));
    };
    return (
        <>
            <TransitionGroup>
                {state.transactionData.map((transaction, i) => {
                    return (
                        <CSSTransition
                            id={i}
                            classNames="item"
                            timeout={500}
                            key={i}
                        >
                            <TransactionItem
                                item={transaction}
                                key={i}
                                handler={onRemoveHandler}
                            />
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </>
    );
};
export default Transaction;
