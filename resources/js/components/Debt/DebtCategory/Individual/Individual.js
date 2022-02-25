import React from "react";
import { useSelector } from "react-redux";
import DetailsBox from "../../UI/DetailsBox/DetailsBox";
const Individual = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.debtStore.debtData,
        };
    };
    const state = useSelector(mapStateToProps);
    return (
        <>
            {state.data &&
                state.data.map((element, id) => {
                    return <DetailsBox key={id} {...element} />;
                })}
        </>
    );
};
export default Individual;
