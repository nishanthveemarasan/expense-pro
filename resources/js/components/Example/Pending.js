import React, { useState } from "react";

export const Pending = ({ items, dragEnd, dragStart, dragOver }) => {
  return (
    <div className="pending">
      {items &&
        items.map((item, i) => {
          return (
            <p onDragOver={(e) => dragOver(e)} className="contain">
              <div
                data-id={i}
                key={i}
                style={{
                  height: "60px",
                  border: "solid 1px #cccccc",
                  margin: "10px 30%",
                  borderRadius: "5px",
                  backgroundColor: "green",
                  color: "#ffffff"
                }}
                draggable={true}
                onDragEnd={(e) => dragEnd(e)}
                onDragStart={(e) => dragStart(e)}
                data-item={JSON.stringify(item)}
              >
                {item.color}{" "}
              </div>
            </p>
          );
        })}
    </div>
  );
};
