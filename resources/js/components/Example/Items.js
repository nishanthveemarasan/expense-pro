import React, { useState, useEffect } from "react";
import { Pending } from "./Pending";
import classes from "./App.module.css";

export const Items = () => {
    const [cIndex, setCIndex] = useState(-1);
    const [items, setItems] = useState([
        {
            uuid: 1,
            name: "Manage ORM for client XYZ",
            order: 1,
            completed: "0",
        },
        {
            uuid: 2,
            name: "Review Summer Intern project report",
            order: 2,
            completed: "0",
        },
        {
            uuid: 3,
            name: "Host Landing Page for Gerry Pizza Shop",
            order: 3,
            completed: "0",
        },
        {
            uuid: 4,
            name: "Release Junior Developer payment",
            order: 4,
            completed: "0",
        },
        {
            uuid: 5,
            name: "Discuss Digital Marketing requirements ",
            order: 5,
            completed: "0",
        },
        {
            id: 6,
            name: "Discuss technology budget with CTO",
            order: 6,
            completed: "0",
        },
    ]);

    const onMoveItemHandler = (index, type) => {
        let copyArray = items.slice();
        if (type === "up") {
            [copyArray[index - 1], copyArray[index]] = [
                copyArray[index],
                copyArray[index - 1],
            ];
            copyArray[index - 1] = {
                ...copyArray[index - 1],
                order: copyArray[index - 1].order - 1,
            };
            copyArray[index] = {
                ...copyArray[index],
                order: copyArray[index].order + 1,
            };

            const obj = [
                {
                    uuid: copyArray[index - 1].uuid,
                    order: copyArray[index - 1].order,
                },
                {
                    uuid: copyArray[index].uuid,
                    order: copyArray[index].order,
                },
            ];
            console.log(obj); //new first 2-1

            setCIndex(index - 1);
            setItems(copyArray);
        }

        if (type === "down") {
            [copyArray[index + 1], copyArray[index]] = [
                copyArray[index],
                copyArray[index + 1],
            ];
            copyArray[index + 1] = {
                ...copyArray[index + 1],
                order: copyArray[index + 1].order + 1,
            };
            copyArray[index] = {
                ...copyArray[index],
                order: copyArray[index].order - 1,
            };

            const obj = [
                {
                    uuid: copyArray[index + 1].uuid,
                    order: copyArray[index + 1].order,
                },
                {
                    uuid: copyArray[index].uuid,
                    order: copyArray[index].order,
                },
            ];
            console.log(obj); //new first 2-1

            setCIndex(index + 1);
            setItems(copyArray);
        }
    };

    const onShowIconHandler = (index) => {
        setCIndex(index == cIndex ? -1 : index);
    };

    return (
        <div className={`card widget-todo ${classes.card}`}>
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                <h3>{`dsfs sdf sdf sdf s fs df sd fsd f`}</h3>
            </div>
            <Pending
                cIndex={cIndex}
                items={items}
                setItems={setItems}
                moveItem={onMoveItemHandler}
                showIcon={onShowIconHandler}
            />
        </div>
    );
};
