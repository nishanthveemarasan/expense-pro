import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { extractDate } from "../../../../Helper/Helper";
import { expenseStoreAction } from "../../../Store/Store";
import classes from "./PaymentModal.module.css";
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
        <Modal show={state.model} backdrop="static">
            <Modal.Header>
                <Modal.Title>Payment Date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: "center" }}>
                    <DatePicker
                        autoFocus
                        selected={payDate}
                        dateFormat="yyyy-MM-dd"
                        wrapperClassName={classes.datepicker}
                        onChange={onPayDateHandler}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;

// const extractDate = (value) => {
//     const date = new Date(value);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, 0);

//     return `${year}-${month}-${day}`;
// };
