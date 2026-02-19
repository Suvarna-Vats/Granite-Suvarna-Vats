import React from "react";

import Header from "./Header";
import Row from "./Row";

const Table = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => (
  <div className="inline-block min-w-full">
    <table className="min-w-full border-collapse border border-gray-300">
      <Header type={type} />
      <Row
        data={data}
        destroyTask={destroyTask}
        handleProgressToggle={handleProgressToggle}
        showTask={showTask}
        starTask={starTask}
        type={type}
      />
    </table>
  </div>
);

export default Table;
