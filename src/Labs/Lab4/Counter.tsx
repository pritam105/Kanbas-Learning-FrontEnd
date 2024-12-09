import React, { useState } from "react";
export default function Counter() {
  let [count, setCount] = useState(7);

  console.log(count);
  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>
      <button
        className="btn btn-success me-2"
        onClick={() => {
          //   count++;
          setCount(count + 1);
          console.log(count);
        }}
      >
        Up{" "}
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          //   count--;
          setCount(count - 1);
          console.log(count);
        }}
      >
        Down{" "}
      </button>
      <hr />
    </div>
  );
}
