import React from "react";

import { compose, head, join, juxt, tail, toUpper } from "ramda";

const Header = ({ type }) => {
  const getTitleCase = compose(join(""), juxt([compose(toUpper, head), tail]));

  const title = `${getTitleCase(type)} Tasks`;

  return (
    <thead>
      <tr>
        <th className="w-1 border-b border-r border-gray-300 bg-gray-100" />
        <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
          {title}
        </th>
        {type === "pending" && (
          <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
            Assigned To
          </th>
        )}
        {type === "completed" && (
          <th className="border-b border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-xs font-bold uppercase leading-4 text-gray-800">
            Actions
          </th>
        )}
        {type === "pending" && (
          <th className="border-b border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-xs font-bold uppercase leading-4 text-gray-800">
            Starred
          </th>
        )}
      </tr>
    </thead>
  );
};

export default Header;
