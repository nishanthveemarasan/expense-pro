import React from "react";

const AuthInput = (props) => {
    return (
        <div className="form-group position-relative has-icon-left">
            <input
                type={props.type}
                className="form-control form-control-xl"
                placeholder={props.placeHolder}
                autoComplete={props.id}
                onChange={(e) => props.change(e, props.id)}
                onBlur={(e) => props.blur(props.id)}
                value={props.value}
            />
            <div className="form-control-icon">
                <i className={props.icon}></i>
            </div>
        </div>
    );
};

export default AuthInput;
