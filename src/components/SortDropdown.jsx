import React from "react";

const SortDropdown = ({ sort, onChange }) => (
  <select value={sort} onChange={e => onChange(e.target.value)} className="border rounded px-2 py-1 mb-4">
    <option value="">Sort By</option>
    <option value="name-asc">Name (A-Z)</option>
    <option value="name-desc">Name (Z-A)</option>
    <option value="grade-asc">Nutrition Grade (A-E)</option>
    <option value="grade-desc">Nutrition Grade (E-A)</option>
  </select>
);

export default SortDropdown; 