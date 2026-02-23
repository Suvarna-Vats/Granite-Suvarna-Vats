import React from "react";

import classnames from "classnames";
import { Tooltip } from "components/commons";
import PropTypes from "prop-types";

const Row = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td className="border-r border-gray-300 px-4 py-2.5 text-center">
            <Tooltip
              tooltipContent={
                isCompleted ? "Mark as incomplete" : "Mark as completed"
              }
            >
              <input
                checked={isCompleted}
                className="form-checkbox h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:text-indigo-600"
                type="checkbox"
                onChange={() =>
                  handleProgressToggle({
                    slug: rowData.slug,
                    progress: toggledProgress,
                  })
                }
              />
            </Tooltip>
          </td>
          <td
            className={classnames(
              "border-r border-gray-300 px-4 py-2.5 text-sm font-medium capitalize text-indigo-600",
              {
                "cursor-pointer": !isCompleted,
                "cursor-not-allowed line-through": isCompleted,
              }
            )}
            onClick={() => !isCompleted && showTask(rowData.slug)}
          >
            <Tooltip tooltipContent={rowData.title}>
              <span>{rowData.title}</span>
            </Tooltip>
          </td>
          {!isCompleted && (
            <>
              <td className="whitespace-no-wrap border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
                {rowData.assigned_user.name}
              </td>
              <td className="whitespace-no-wrap border-r border-gray-300 px-4 py-2.5 text-center text-sm text-gray-800">
                {rowData.comments_count}
              </td>
              <td className="cursor-pointer px-4 py-2.5 text-center">
                <button onClick={() => starTask(rowData.slug, rowData.status)}>
                  <i
                    className={classnames(
                      "text-2xl transition duration-300 ease-in-out hover:text-yellow-600",
                      {
                        "ri-star-line text-gray-400":
                          rowData.status !== "starred",
                      },
                      {
                        "ri-star-fill text-yellow-500":
                          rowData.status === "starred",
                      }
                    )}
                  />
                </button>
              </td>
            </>
          )}
          {isCompleted && (
            <td className="cursor-pointer px-4 py-2.5 text-center">
              <Tooltip tooltipContent="Delete">
                <button onClick={() => destroyTask(rowData.slug)}>
                  <i className="ri-delete-bin-line text-2xl text-gray-400 transition duration-300 ease-in-out hover:text-red-500" />
                </button>
              </Tooltip>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

Row.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
  starTask: PropTypes.func,
};

export default Row;
