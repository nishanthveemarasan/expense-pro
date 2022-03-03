import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./SModel.module.css";
const SModel = (props) => {
    const mapStateToProps = (state) => {
        return {
            showModal: state.savingStore.showModal,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <Modal
            show={state.showModal}
            centered
            className={classes.model}
            size="sm"
            backdrop="static"
        >
            {props.header && <Modal.Header></Modal.Header>}
            <Modal.Body className={classes.modelCenter}>
                <div
                    className="spinner-border"
                    style={{ width: "4rem", height: "4rem" }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Modal.Body>
            {props.body && <Modal.Footer></Modal.Footer>}
        </Modal>
    );
};
export default SModel;
