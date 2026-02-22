import React from "react";

export default function Filters({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  searchText,
  setSearchText,
  allCategories = [],
}) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Search</label>
        <input
          className="input"
          placeholder="Search question or farmer..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="answered">Answered</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All" : c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
