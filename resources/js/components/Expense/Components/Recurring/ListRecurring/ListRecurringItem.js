import React from "react";
import Item from "./Item/Item";

const ListRecurringItem = (props) => {
    console.log(props);
    return (
        <>
            <Item {...props} />
        </>
    );
};
export default ListRecurringItem;
