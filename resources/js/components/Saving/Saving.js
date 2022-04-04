import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
    getInitialSavingData,
    initialSavingsData,
} from "../Expense/Store/reducers/saving-slice";
import store from "../Expense/Store/Store";
import SavingCategory from "./SavingCategory/SavingCategory";
import AddSaving from "./AddSaving/AddSaving";
import Loading from "../Loading/Loading";
import { WEB_URL } from "../Helper/Helper";

const Saving = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // const data = JSON.parse(props.data);
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getInitialSavingData(token));
        } else {
            window.location.replace(`${WEB_URL}/auth`);
        }
        // dispatch(initialSavingsData(data, props.token));
    }, []);
    const mapStateToProps = (state) => {
        return {
            mainPage: state.savingStore.mainPage,
            loadingPage: state.expenseStore.loadingPage,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            {state.loadingPage ? (
                <React.Suspense fallback="">
                    {state.mainPage == "savingCategory" && <SavingCategory />}
                    {state.mainPage == "createSaving" && <AddSaving />}
                </React.Suspense>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Saving;

if (document.getElementById("saving")) {
    // const data = document.getElementById("saving").getAttribute("data");
    // const token = document.getElementById("saving").getAttribute("token");
    ReactDOM.render(
        <Provider store={store}>
            <Saving />
        </Provider>,

        document.getElementById("saving")
    );
}
