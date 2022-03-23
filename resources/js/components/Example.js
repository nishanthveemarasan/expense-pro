import React from "react";
import ReactDOM from "react-dom";
import { Items } from "./Example/Items";

function Example() {
    return (
        <div className="container">
            <Items />
        </div>
    );
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
