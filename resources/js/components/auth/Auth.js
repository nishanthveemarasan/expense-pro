import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import classes from "./Auth.module.css";
import Login from "./login/Login";
import store from "../Expense/Store/Store";
import Register from "./Register/Register";
const Auth = (props) => {
    const mapStateToProps = (state) => {
        return {
            //window.location.replace('https://www.google.com')
            page: state.authStore.page,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            <div className={classes.auth}>
                {state.page == "login" && <Login />}
                {state.page == "register" && <Register />}
            </div>
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
