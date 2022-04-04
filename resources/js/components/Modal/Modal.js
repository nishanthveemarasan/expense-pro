import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import Backdrop from "../Backdrop/Backdrop";
import { expenseStoreAction } from "../Expense/Store/Store";

import "./Modal.css";

const Modal = (props) => {
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            open: state.expenseStore.errorModal.open,
            error: state.expenseStore.errorModal.error,
            reload: state.expenseStore.errorModal.reload,
        };
    };

    const states = useSelector(mapStateToProps);

    const transitionStyles = {
        entering: "modelCloseKeep",
        entered: "Modal ModalOpen",
        exiting: "Modal ModalClose",
    };

    const onCloseModal = () => {
        if (states.reload) {
            window.location.reload(false);
        }
        dispatch(expenseStoreAction.onCloseErrorModal());
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
                                <div>Error</div>
                            </div>
                            <div className="body">
                                {Array.isArray(states.error) ? (
                                    <ul>
                                        {states.error.map((row, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    style={{
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {row}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    states.error
                                )}
                            </div>
                            <Button variant="primary" onClick={onCloseModal}>
                                Close
                            </Button>
                        </div>
                    );
                }}
            </Transition>
        </>
    );
};

export default Modal;
