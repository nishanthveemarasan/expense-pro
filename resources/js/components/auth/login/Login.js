import React from "react";
import { useDispatch } from "react-redux";
import { authStoreAction } from "../../Expense/Store/Store";
import classes from "../Auth.module.css";

const Login = (props) => {
    const dispatch = useDispatch();

    const onPageChangeHandler = () => {
        dispatch(authStoreAction.updatePage({ page: "register" }));
    };
    return (
        <>
            <form>
                <div className="form-group position-relative has-icon-left mb-4">
                    <input
                        type="password"
                        className="form-control form-control-xl"
                        placeholder="Code.."
                    />
                    <div className="form-control-icon">
                        <i className="bi bi-shield-lock"></i>
                    </div>
                </div>

                <button className="btn btn-primary btn-block btn-lg shadow-lg mt-2">
                    Log in
                </button>
            </form>
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
