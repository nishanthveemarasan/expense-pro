import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStoreAction } from "../../Expense/Store/Store";
import classes from "../Auth.module.css";
import { Form, Spinner } from "react-bootstrap";
import { registerUser } from "../../Expense/Store/reducers/auth-reducer";
const Register = (props) => {
    const [form, setForm] = useState({
        code: "",
        code_confirmation: "",
    });
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            //window.location.replace('https://www.google.com')
            loading: state.authStore.loading,
        };
    };
    const state = useSelector(mapStateToProps);

    const onPageChangeHandler = () => {
        dispatch(authStoreAction.updatePage({ page: "register" }));
    };

    const onInputChangeHandler = (e, type) => {
        const value = e.target.value.trim();
        setForm((prevState) => {
            return {
                ...prevState,
                [type]: value,
            };
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (form.code.length == 0 || form.code.length < 4) {
            alert("Auth Code should have atleast 4 characters!!");
            return;
        }
        if (form.code != form.code_confirmation) {
            alert("Auth Code does not match!!");
            return;
        }
        dispatch(registerUser(form));
    };
    return (
        <>
            <Form onSubmit={onSubmitForm}>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="text"
                        className="form-control form-control-xl"
                        placeholder="auth code"
                        onChange={(e) => onInputChangeHandler(e, "code")}
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-shield-lock"></i>
                    </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="password"
                        className="form-control form-control-xl"
                        placeholder="confirm auth code"
                        onChange={(e) =>
                            onInputChangeHandler(e, "code_confirmation")
                        }
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-shield-lock"></i>
                    </div>
                </div>
                <button
                    className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                    type="submit"
                >
                    {state.loading ? (
                        <Spinner animation="border" variant="light" size="sm" />
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </Form>
            <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <span
                        className={classes.sginin}
                        onClick={onPageChangeHandler}
                    >
                        Log in
                    </span>
                    .
                </p>
            </div>
        </>
    );
};

export default Register;
