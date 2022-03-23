import React, { useState, useEffect } from "react";
import { Pending } from "./Pending";
import "./App.css";

export const Items = () => {
    // const [items, setItems] = useState([
    //   {
    //     id: 1,
    //     title: "Manage ORM for client XYZ",
    //     status: "Pending"
    //   },
    //   {
    //     id: 2,
    //     title: "Review Summer Intern project report",
    //     status: "Pending"
    //   },
    //   {
    //     id: 3,
    //     title: "Host Landing Page for Gerry Pizza Shop",
    //     status: "Pending"
    //   },
    //   {
    //     id: 4,
    //     title: "Release Junior Developer payment",
    //     status: "Pending"
    //   },
    //   {
    //     id: 5,
    //     title: "Discuss Digital Marketing requirements ",
    //     status: "Pending"
    //   },
    //   {
    //     id: 6,
    //     title: "Discuss technology budget with CTO",
    //     status: "Pending"
    //   }
    // ]);
    const [items, setItems] = useState([
        {
            newIndex: 1,
            color: "red",
        },

        {
            newIndex: 2,
            color: "green",
        },

        {
            newIndex: 3,
            color: "blue",
        },

        {
            newIndex: 4,
            color: "yellow",
        },

        {
            newIndex: 5,
            color: "orange",
        },

        {
            newIndex: 6,
            color: "black",
        },
    ]);
    const [dragged, setDragged] = useState("");
    const [over, setOver] = useState("");
    const onDragStart = (e) => {
        setDragged(e.currentTarget);
    };

    const onDragEnd = (e) => {
        dragged.style.display = "block";

        e.target.classList.remove("drag-up");
        over.classList.remove("drag-up");

        e.target.classList.remove("drag-down");
        over.classList.remove("drag-down");

        let data = items.slice();
        let from = Number(dragged.dataset.id);
        let to = Number(over.dataset.id);
        data.splice(to, 0, data.splice(from, 1)[0]);
        //set newIndex to judge direction of drag and drop
        data = data.map((doc, index) => {
            doc.newIndex = index + 1;
            return doc;
        });
        setItems(data);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        dragged.style.display = "none";
        if (e.target.tagName !== "DIV") {
            return;
        }
        const dgIndex = JSON.parse(dragged.dataset.item).newIndex;
        const taIndex = JSON.parse(e.target.dataset.item).newIndex;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";

        if (over && e.target.dataset.item !== over.dataset.item) {
            over.classList.remove("drag-up", "drag-down");
        }

        if (!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            setOver(e.target);
        }
    };

    return (
        <div className="items">
            <Pending
                items={items}
                dragEnd={onDragEnd}
                dragStart={onDragStart}
                dragOver={onDragOver}
            />
        </div>
    );
};
