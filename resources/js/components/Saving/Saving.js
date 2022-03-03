import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import store from "../Expense/Store/Store";
const SavingCategory = React.lazy(() =>
    import("./SavingCategory/SavingCategory")
);
const AddSaving = React.lazy(() => import("./AddSaving/AddSaving"));
const Saving = (props) => {
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
    ReactDOM.render(
        <Provider store={store}>
            <Saving />
        </Provider>,

        document.getElementById("saving")
    );
}
