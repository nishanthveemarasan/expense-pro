import React, { useEffect, useState } from "react";
import SimplePieChart from "../../../../../../Chart/PieChart/SimplePieChart";
import { limitDemialPlaces } from "../../../../../Helper/Helper";
const Chart = ({ data }) => {
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let series = [];
        let categories = [];
        Object.keys(data).forEach((key) => {
            series.push(limitDemialPlaces(Math.abs(data[key].total)));
            categories.push(key);
        });
        setSeries(series);
        setCategories(categories);
    }, [data]);
    return (
        <>
            {categories.length > 0 && (
                <SimplePieChart series={series} categories={categories} />
            )}
        </>
    );
};

export default Chart;
