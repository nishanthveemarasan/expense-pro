import React from "react";
import { useSelector } from "react-redux";
import Head from "../Head/Head";
import ShowSingleBox from "../showSingleBox/showSingleBox";
const ShowIndividual = (props) => {
    const mapStateToProps = (state) => {
        return {
            data: state.debtStore.currentIndividualData,
        };
    };
    const state = useSelector(mapStateToProps);
    // console.log(state.data);
    return (
        <>
            <Head name={state.data.name} />
            {state.data &&
                state.data.data.map((element, id) => {
                    return <ShowSingleBox key={id} {...element} />;
                })}
        </>
    );
};
export default ShowIndividual;
