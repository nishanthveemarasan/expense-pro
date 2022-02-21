import React from "react";
import { useNavigate } from "react-router";
import Ebutton from "../../../UI/Button/Ebutton";
import Option from "../Option/Option";
import classes from "./AddPayment.module.css";
const AddPayment = (props) => {
    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate("/dashboard");
    };
    return (
        <div className={classes.paycard}>
            <Option
                heading="Amount"
                avatar={false}
                icon={<i className="bi bi-calculator"></i>}
                color="primary"
            />
            <Option
                heading="Category"
                avatar={false}
                icon={<i className="bi bi-list-ul"></i>}
                color="success"
            />
            <div className={classes.paybutton}>
                <Ebutton
                    variant="primary"
                    size="md"
                    disabled={false}
                    name="Back"
                    onClick={goBackHandler}
                />
                <Ebutton
                    variant="primary"
                    size="md"
                    disabled={false}
                    name="Save&New"
                />
                <Ebutton
                    variant="primary"
                    size="md"
                    disabled={false}
                    name="Save"
                />
            </div>
        </div>
    );
};

export default AddPayment;
