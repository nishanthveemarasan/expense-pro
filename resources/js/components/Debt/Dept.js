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

const Debt = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(props.data);
        const initialData = {
            ...data.data,
            token: props.token,
        };
        dispatch(debtStoreAction.addInitialData(initialData));
    }, []);
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
    const data = document.getElementById("debt").getAttribute("data");
    const token = document.getElementById("debt").getAttribute("token");
    ReactDOM.render(
        <Provider store={store}>
            <Debt data={data} token={token} />
        </Provider>,
        document.getElementById("debt")
    );
}
