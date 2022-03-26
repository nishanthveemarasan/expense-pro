import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import Backdrop from "../Backdrop/Backdrop";
import { expenseStoreAction } from "../Expense/Store/Store";

import "./DeleteModal.css";

const DeleteModal = ({ confirm }) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            open: state.expenseStore.deleteModal.open,
            heading: state.expenseStore.deleteModal.heading,
            body: state.expenseStore.deleteModal.body,
        };
    };

    const states = useSelector(mapStateToProps);

    const transitionStyles = {
        entering: "modelCloseKeep",
        entered: "Modal ModalOpen",
        exiting: "Modal ModalClose",
    };

    const onCloseModal = () => {
        dispatch(
            expenseStoreAction.onDeleteModal({
                heading: " ",
                body: " ",
                open: false,
                data: {},
            })
        );
    };

    const onConfirmDeleteHandler = () => {
        confirm();
        dispatch(
            expenseStoreAction.onDeleteModal({
                heading: " ",
                body: " ",
                open: false,
                data: {},
            })
        );
    };
    return (
        <>
            <Backdrop show={states.open} />
            <Transition
                in={states.open}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                {(state) => {
                    return (
                        <div className={transitionStyles[state]}>
                            <div className="heading">
                                <div>{states.heading} </div>
                            </div>
                            <div className="body">{states.body}</div>

                            <Button
                                variant="danger"
                                onClick={onConfirmDeleteHandler}
                                className="confirm"
                            >
                                Confirm
                            </Button>
                            <Button variant="primary" onClick={onCloseModal}>
                                Cancel
                            </Button>
                        </div>
                    );
                }}
            </Transition>
        </>
    );
};

export default DeleteModal;
