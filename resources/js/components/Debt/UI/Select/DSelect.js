import React from "react";
import Creatable from "react-select/creatable";

const DSelect = (props) => {
    const change = (selectedOption) => {
        const value = selectedOption.value;
        props.change(value, props.type);
    };

    return <Creatable {...props} onChange={change} />;
};
export default DSelect;
