import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { initialSavingsData } from "../Expense/Store/reducers/saving-slice";
import store from "../Expense/Store/Store";
import SavingCategory from "./SavingCategory/SavingCategory";
import AddSaving from "./AddSaving/AddSaving";

const Saving = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = JSON.parse(props.data);
        dispatch(initialSavingsData(data, props.token));
    }, []);
    const mapStateToProps = (state) => {
        return {
            mainPage: state.savingStore.mainPage,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <React.Suspense fallback="">
                {state.mainPage == "savingCategory" && <SavingCategory />}
                {state.mainPage == "createSaving" && <AddSaving />}
            </React.Suspense>
        </>
    );
};

export default Saving;

if (document.getElementById("saving")) {
    const data = document.getElementById("saving").getAttribute("data");
    const token = document.getElementById("saving").getAttribute("token");
    ReactDOM.render(
        <Provider store={store}>
            <Saving data={data} token={token} />
        </Provider>,

        document.getElementById("saving")
    );
}
