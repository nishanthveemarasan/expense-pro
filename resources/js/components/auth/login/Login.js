import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Expense/Store/reducers/auth-reducer";
import { authStoreAction, expenseStoreAction } from "../../Expense/Store/Store";
import { email, required } from "../../Helper/Validator";
import classes from "../Auth.module.css";
import Error from "../Error/Error";
import AuthInput from "../UI/Input/AuthInput";

const Login = (props) => {
    const [form, setForm] = useState({
        email: {
            value: "",
            valid: false,
            validator: [email],
            touched: false,
            error: "Please Enter the valid Email Address",
        },
        password: {
            value: "",
            valid: false,
            touched: false,
            validator: [required],
            error: "Password is Required!!",
        },
    });
    const dispatch = useDispatch();
    const mapStateToProps = (state) => {
        return {
            loading: state.authStore.loading,
        };
    };
    const state = useSelector(mapStateToProps);

    const onPageChangeHandler = () => {
        dispatch(authStoreAction.updatePage({ page: "register" }));
    };
    const onInputBlurHandler = (type) => {
        setForm((prevForm) => {
            return {
                ...prevForm,
                [type]: {
                    ...prevForm[type],
                    touched: true,
                },
            };
        });
    };

    const onInputChangeHandler = (e, type) => {
        const value = e.target.value.trim();
        let valid = true;

        for (let validator of form[type].validator) {
            valid = valid && validator(value);
        }

        setForm((prevForm) => {
            return {
                ...prevForm,
                [type]: {
                    ...prevForm[type],
                    value,
                    valid,
                },
            };
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        let isFormValid = true;
        let formData = {};
        for (let type in form) {
            isFormValid = isFormValid && form[type].valid;
            formData[type] = form[type].value;
            onInputBlurHandler(type);
        }
        if (isFormValid) {
            dispatch(loginUser(formData));
        }
        /* e.preventDefault();
        if (code.trim().length == 0) {
            dispatch(
                expenseStoreAction.onOpenErrorModal({
                    error: "Login dettails is required!!",
                    reload: false,
                })
            );
        } else {
            const data = {
                code,
            };
            dispatch(loginUser(data));
        }*/
    };
    const onCodeChangeHandler = (e) => {
        setCode(e.target.value);
    };
    return (
        <>
            <Form onSubmit={onSubmitForm}>
                <div className="mb-4">
                    <AuthInput
                        type="text"
                        placeHolder="Email Address"
                        id="email"
                        change={onInputChangeHandler}
                        blur={onInputBlurHandler}
                        value={form.email.value}
                        icon="bi bi-envelope"
                    />
                    {!form.email.valid && form.email.touched && (
                        <Error error={form.email.error} />
                    )}
                </div>
                <div className="mb-4">
                    <AuthInput
                        type="password"
                        placeHolder="Password"
                        id="password"
                        change={onInputChangeHandler}
                        blur={onInputBlurHandler}
                        value={form.password.value}
                        icon="bi bi-shield-lock"
                    />
                    {!form.password.valid && form.password.touched && (
                        <Error error={form.password.error} />
                    )}
                </div>

                <button
                    className="btn btn-primary btn-block btn-lg shadow-lg mt-2"
                    type="submit"
                    disabled={state.loading}
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
                    Don't have an account?{" "}
                    <span
                        className={classes.sginin}
                        onClick={onPageChangeHandler}
                    >
                        Sign up
                    </span>
                    .
                </p>
            </div>
        </>
    );
};

export default Login;
