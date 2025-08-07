import React from "react";

const CategoryFilter = ({ categories, selected, onChange }) => {
  return (
    <select
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="border rounded px-2 py-1 mb-4"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
};

export default CategoryFilter; 