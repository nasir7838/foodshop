import React from "react";

const Pagination = ({ onLoadMore, hasMore }) => (
  <div className="flex justify-center my-4">
    {hasMore && (
      <button onClick={onLoadMore} className="bg-blue-500 text-white px-4 py-2 rounded">
        Load More
      </button>
    )}
  </div>
);

export default Pagination; 