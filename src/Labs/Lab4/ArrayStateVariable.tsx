import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div style={{width:215}} className = "list-group rounded-3" id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button className = "btn btn-primary btn-success me-5 mb-2 d-inline" onClick={addElement}>Add Element</button>
      <ul>
        {array.map((item, index) => (
          <li className = "list-group-item p-3 pb-4 rounded-2" key={index}>
            {item}
            <button id="wd-delete-element-click" className = "btn btn-primary btn-danger mb-2 float-end" onClick={() => deleteElement(index)}>Delete</button>{" "}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
