import React, { useEffect, useState } from "react";
import { getFirstLetterUpperWord } from "../../../../Helper/Helper";
import classes from "./ShowSingleBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeExpenseSummaryAndData } from "../../../Store/reducers/expense-reducer";
import { Transition } from "react-transition-group";
import "./Transition.css";
import Modal from "../../../../Modal/Modal";
import EditExpenseItemModal from "../SummaryCategory/EditExpenseItemModal/EditExpenseItemModal";
const ShowSingleBox = ({
    data,
    index,
    currentIndex,
    changeIndex,
    removeItem,
    update,
}) => {
    const [EditModal, SetEditModal] = useState({
        show: false,
        value: "",
    });
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            token: state.expenseStore.appToken,
            date: state.expenseStore.dateGroup,
        };
    };
    const transitionStyles = {
        entering: "actionIcons",
        entered: "actionIcons actionIconsShow",
        exiting: "actionIcons actionIconsHide",
    };

    const state = useSelector(mapStateToProps);
    // console.log(state.date);
    const onDeleteHandler = () => {
        const prepareData = {
            data,
            updatedAmount:
                data.type == "expense" ? Math.abs(data.amount) : -data.amount,
            token: state.token,
        };
        dispatch(removeExpenseSummaryAndData(prepareData));
        removeItem(prepareData.data, prepareData.updatedAmount);
    };

    const onHideEditModalHandler = () => {
        SetEditModal({
            show: false,
            value: "",
        });
    };

    const onOpenEditModalHandler = () => {
        SetEditModal({
            show: true,
            value: "",
        });
    };
    return (
        <>
            <Modal />
            <EditExpenseItemModal
                {...EditModal}
                data={data}
                modelClose={onHideEditModalHandler}
                index={index}
                update={update}
                token={state.token}
            />
            <div
                className={
                    data.type == "expense"
                        ? classes.outlineExpense
                        : classes.outlineIncome
                }
                onClick={() => changeIndex(index)}
            >
                <div className={classes.details}>
                    <div>{getFirstLetterUpperWord(data.subCategory)}</div>
                </div>
                <div>
                    <span className={classes.date}>{data.date}</span>
                </div>
                <div
                    className={classes.amount}
                    style={{ color: data.amount > 0 ? "green" : "red" }}
                >
                    {data.amount > 0
                        ? `£${data.amount}`
                        : `-£${Math.abs(data.amount)}`}
                </div>
                {
                    <Transition
                        in={index == currentIndex}
                        timeout={300}
                        mountOnEnter
                        unmountOnExit
                    >
                        {(state) => {
                            return (
                                <div className={transitionStyles[state]}>
                                    <FontAwesomeIcon
                                        icon={faFileSignature}
                                        className={classes.edit}
                                        onClick={onOpenEditModalHandler}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className={classes.delete}
                                        onClick={onDeleteHandler}
                                    />
                                </div>
                            );
                        }}
                    </Transition>
                }
            </div>
        </>
    );
};
export default ShowSingleBox;
