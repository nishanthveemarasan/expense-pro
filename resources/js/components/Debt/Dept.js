import React from "react";
import { Nav } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import NavItem from "../Expense/UI/Nav/NavItem";
import store from "../Expense/Store/Store";
import DebtCategory from "./DebtCategory/DebtCategory";
const Debt = () => {
    return (
        <>
            <DebtCategory />
        </>
    );
};

export default Debt;

if (document.getElementById("debt")) {
    ReactDOM.render(
        <Provider store={store}>
            <Debt />
        </Provider>,
        document.getElementById("debt")
    );
}
