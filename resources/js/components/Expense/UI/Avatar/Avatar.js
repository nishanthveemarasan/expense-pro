import React from "react";

const Avatar = (props) => {
    return (
        <div className={`avatar avatar-${props.size} bg-${props.color} me-5`}>
            <span className="avatar-content">{props.children}</span>
        </div>
    );
};

export default Avatar;
