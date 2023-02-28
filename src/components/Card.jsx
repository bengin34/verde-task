import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, body }) => {
  return (
    <div className="mx-auto">
      <Link
        to={`/${id}`}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        style={{ minHeight: "300px" }}
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
      </Link>
    </div>
  );
};

export default Card;
