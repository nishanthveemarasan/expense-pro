import React from "react";
import ReactDOM from "react-dom";
import classes from "./Expense.module.css";

const Expense = () => {
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-3">Dashboard</div>
                    <div className="col-3">Summary</div>
                    <div className="col-3">Chart</div>
                    <div className="col-3">Recurring</div>
                </div>
            </div>
        </>
    );
};

export default Expense;

if (document.getElementById("expense")) {
    ReactDOM.render(<Expense />, document.getElementById("expense"));
}
