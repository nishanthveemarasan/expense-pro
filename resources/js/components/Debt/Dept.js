import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import store, { debtStoreAction } from "../Expense/Store/Store";

import { useSelector } from "react-redux";
import ShowIndividual from "./DebtCategory/Individual/ShowIndividual/ShowIndividual";
import DashBoard from "./DashBoard/DashBoard";
import DebtCategory from "./DebtCategory/DebtCategory";
import AddDebt from "./AddDebt/AddDebt";
import { getInitialDebtData } from "../Expense/Store/reducers/debt-reducer";
import Loading from "../Loading/Loading";
import { WEB_URL } from "../Helper/Helper";

const Debt = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getInitialDebtData(token));
        } else {
            window.location.replace(`${WEB_URL}/auth`);
        }
        // dispatch(debtStoreAction.addInitialData(initialData));
    }, []);
    const mapStateToProps = (state) => {
        return {
            mainPage: state.debtStore.mainPage,
            action: state.debtStore.action,
            loadingPage: state.expenseStore.loadingPage,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            {state.loadingPage ? (
                <React.Suspense fallback="">
                    {state.mainPage == "debtsummary" && <DashBoard />}
                    {state.mainPage == "debtcategory" && <DebtCategory />}
                    {state.mainPage == "adddebt" && (
                        <AddDebt action={state.action} />
                    )}
                    {state.mainPage == "showindividual" && <ShowIndividual />}
                </React.Suspense>
            ) : (
                <Loading />
            )}
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
