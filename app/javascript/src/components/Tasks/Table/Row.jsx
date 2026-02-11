import React from "react";

import { Tooltip } from "components/commons";
import PropTypes from "prop-types";

const Row = ({ data }) => (
  <tbody className="divide-y divide-gray-200 bg-white">
    {data.map(rowData => (
      <tr key={rowData.id}>
        <td className="border-r border-gray-300 px-4 py-2.5 text-sm font-medium capitalize">
          <Tooltip tooltipContent={rowData.title}>
            <span>{rowData.title}</span>
          </Tooltip>
        </td>
      </tr>
    ))}
  </tbody>
);

Row.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Row;
