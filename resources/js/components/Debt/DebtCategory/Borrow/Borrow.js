import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";
import SingbleBox from "../../UI/DetailsBox/SingbleBox";
import Add from "../../UI/NavItem/AddCircle/Add";
import classes from "./Borrow.module.css";
const Borrow = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            data: state.debtStore.borrowData,
        };
    };
    const state = useSelector(mapStateToProps);
    const onEditBorrowMoney = (id) => {
        let formData = { ...state.data[id], id };
        dispatch(debtStoreAction.createFormData({ formData }));

        const data = {
            page: "borrowfrom",
            mainPage: "adddebt",
            action: "borrow",
            type: "mainpage",
        };
        dispatch(debtStoreAction.updatePage(data));
    };
    return (
        <>
            {state.data.length == 0 && (
                <div className={classes.emptyData}>
                    No Borrow Data at this moment
                </div>
            )}
            {state.data &&
                state.data.map((element, i) => {
                    return (
                        <SingbleBox
                            key={i}
                            {...element}
                            editDebt={onEditBorrowMoney.bind(this, i)}
                        />
                    );
                })}
            <div className={classes.add}>
                <Add
                    mainPage="adddebt"
                    page="borrowfrom"
                    type="mainpage"
                    action="borrow"
                    create="create"
                />
            </div>
        </>
    );
};
export default Borrow;
