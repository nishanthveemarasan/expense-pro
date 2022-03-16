import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { extractDate } from "../../../../Helper/Helper";
import { expenseStoreAction } from "../../../Store/Store";
import classes from "./PaymentModal.module.css";
import Calendar from "react-calendar";

const PaymentModal = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            payDate: state.expenseStore.payDate,
            model: state.expenseStore.model,
        };
    };
    const state = useSelector(mapStateToProps);
    const [payDate, setPayDate] = useState(new Date(state.payDate));

    const onPayDateHandler = (value) => {
        setPayDate(value);
        const date = extractDate(value);
        dispatch(expenseStoreAction.setPayDate({ date }));
    };
    return (
        <Modal show={state.model}>
            <Modal.Body>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <Calendar value={payDate} onChange={onPayDateHandler} />
                    </div>
                    <div className="col-2"></div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;
