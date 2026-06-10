// components/CategoryTabs.js
import React from "react";
import styles from "../../style/CategoryTabs.module.css";

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <ul className={`nav nav-tabs ${styles.categoryTabs}`}>
      <li className="nav-item">
        <button
          className={`nav-link ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => onCategoryChange("All")}
        >
          All
        </button>
      </li>
      {categories.map((category) => (
        <li key={category} className="nav-item">
          <button
            className={`nav-link ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTabs;
