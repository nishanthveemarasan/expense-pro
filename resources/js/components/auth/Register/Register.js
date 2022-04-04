import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStoreAction } from "../../Expense/Store/Store";
import classes from "../Auth.module.css";
import { Form, Spinner } from "react-bootstrap";
import { registerUser } from "../../Expense/Store/reducers/auth-reducer";
import { expenseStoreAction } from "../../Expense/Store/Store";
import { email, length, match, required } from "../../Helper/Validator";
import Error from "../Error/Error";
import AuthInput from "../UI/Input/AuthInput";
const Register = (props) => {
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
            validator: [required, length({ min: 6 })],
            error: "Password should have atleast 6 charactors",
        },
        password_confirmation: {
            value: "",
            valid: false,
            touched: false,
            validator: [match],
            error: "Password does not match!!",
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
        dispatch(authStoreAction.updatePage({ page: "login" }));
    };

    const onInputChangeHandler = (e, type) => {
        const value = e.target.value.trim();
        let valid = true;
        if (type == "password_confirmation") {
            valid = valid && match(form.password.value, value);
        } else {
            for (let validator of form[type].validator) {
                valid = valid && validator(value);
            }
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
            dispatch(registerUser(formData));
        }
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
                <div className="mb-4">
                    <AuthInput
                        type="password"
                        placeHolder="Confirm Password"
                        id="password_confirmation"
                        change={onInputChangeHandler}
                        blur={onInputBlurHandler}
                        value={form.password_confirmation.value}
                        icon="bi bi-shield-lock"
                    />
                    {!form.password_confirmation.valid &&
                        form.password_confirmation.touched && (
                            <Error error={form.password_confirmation.error} />
                        )}
                </div>

                <button
                    className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                    disabled={state.loading}
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
