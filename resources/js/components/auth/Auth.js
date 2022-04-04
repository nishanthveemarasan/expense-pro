import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import classes from "./Auth.module.css";
import Login from "./login/Login";
import store from "../Expense/Store/Store";
import Register from "./Register/Register";
import { WEB_URL } from "../Helper/Helper";
import { Spinner } from "react-bootstrap";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
const Auth = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.replace(`${WEB_URL}`);
        } else {
            setLoading(true);
        }
    });
    const mapStateToProps = (state) => {
        return {
            //window.location.replace('https://www.google.com')
            page: state.authStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <Modal />
            {loading ? (
                <div className={classes.auth}>
                    {state.page == "login" && <Login />}
                    {state.page == "register" && <Register />}
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Auth;

if (document.getElementById("login")) {
    ReactDOM.render(
        <Provider store={store}>
            <Auth />
        </Provider>,
        document.getElementById("login")
    );
}
