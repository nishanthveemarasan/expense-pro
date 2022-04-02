import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateExpenseSummaryAndData } from "../../../../Store/reducers/expense-reducer";
import EInput from "../../../../UI/Input/EInput";

const EditExpenseItemModal = ({
    show,
    data,
    modelClose,
    index,
    update,
    token,
}) => {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const oldValue = Math.abs(data.amount);
        setAmount(oldValue);
    }, []);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        if (value > 0 && error) {
            setError(false);
        }
        setAmount(value);
    };

    const onUpdateHandler = () => {
        if (Math.abs(data.amount) == amount) {
            modelClose();
            return;
        }
        if (amount == 0) {
            setError(true);
            return;
        }
        const newAmount =
            data.type == "income" ? Math.abs(amount) : -Math.abs(amount);
        const request = {
            data,
            newValue: parseFloat(newAmount, 2),
            index,
        };
        dispatch(updateExpenseSummaryAndData({ data: request, token }));
        update(request);
        modelClose();
    };
    return (
        <Modal show={show} onHide={modelClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Update the Expense/Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div style={{ margin: "0 0 5px 0" }}>
                        <span style={{ width: "50%" }}>Payment Type</span> :{" "}
                        <span
                            style={{
                                color: data.type == "expense" ? "red" : "green",
                            }}
                        >
                            {data.type.toUpperCase()}
                        </span>
                    </div>
                    <div style={{ margin: "0 0 5px 0" }}>
                        <span style={{ width: "50%" }}>Category</span> :{" "}
                        <span style={{ color: "blue" }}>{data.category}</span>
                    </div>
                    <div style={{ margin: "0 0 5px 0" }}>
                        <span style={{ width: "50%" }}>Sub Category</span> :{" "}
                        <span style={{ color: "blue" }}>
                            {data.type == "expense" ? data.subCategory : "-"}
                        </span>
                    </div>
                    <div style={{ margin: "0 0 5px 0" }}>
                        <span style={{ width: "50%" }}>Date</span> :{" "}
                        <span style={{ color: "red" }}>{data.date}</span>
                    </div>
                    <div style={{ margin: "0 0 5px 0" }}>
                        <span style={{ color: error ? "red" : "black" }}>
                            Amount
                        </span>
                        <EInput
                            type="number"
                            place="Enter a Amount"
                            onChange={(e) => onChangeHandler(e)}
                            value={amount}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onUpdateHandler}>
                    Update
                </Button>
                <Button variant="secondary" onClick={modelClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default EditExpenseItemModal;
