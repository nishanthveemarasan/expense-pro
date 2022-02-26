import React from "react";
import { Nav } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../Expense/Store/Store";

import { useSelector } from "react-redux";
import ShowIndividual from "./DebtCategory/Individual/ShowIndividual/ShowIndividual";
import DashBoard from "./DashBoard/DashBoard";

const DebtCategory = React.lazy(() => import("./DebtCategory/DebtCategory"));
const AddDebt = React.lazy(() => import("./AddDebt/AddDebt"));
const Debt = () => {
    const mapStateToProps = (state) => {
        return {
            mainPage: state.debtStore.mainPage,
            action: state.debtStore.action,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <React.Suspense fallback="">
                {state.mainPage == "debtsummary" && <DashBoard />}
                {state.mainPage == "debtcategory" && <DebtCategory />}
                {state.mainPage == "adddebt" && (
                    <AddDebt action={state.action} />
                )}
                {state.mainPage == "showindividual" && <ShowIndividual />}
            </React.Suspense>
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
