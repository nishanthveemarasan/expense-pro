import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { debtStoreAction } from "../../../Expense/Store/Store";
import SingbleBox from "../../UI/DetailsBox/SingbleBox";
import Add from "../../UI/NavItem/AddCircle/Add";
import classes from "./Lend.module.css";
const Lend = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            data: state.debtStore.lendData,
        };
    };
    const state = useSelector(mapStateToProps);

    const onEditLendMoney = (id) => {
        let formData = { ...state.data[id], id };
        dispatch(debtStoreAction.createFormData({ formData }));

        const data = {
            page: "giveto",
            mainPage: "adddebt",
            action: "lend",
            type: "mainpage",
        };
        dispatch(debtStoreAction.updatePage(data));
    };
    return (
        <>
            {state.data &&
                state.data.map((element, i) => {
                    return (
                        <SingbleBox
                            key={i}
                            {...element}
                            id={i}
                            editDebt={onEditLendMoney.bind(this, i)}
                        />
                    );
                })}
            <div className={classes.add}>
                <Add
                    mainPage="adddebt"
                    page="giveto"
                    type="mainpage"
                    action="lend"
                    create='create'
                />
            </div>
        </>
    );
};
export default Lend;
