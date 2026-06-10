import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Mega.css";

const Mega = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [thirdLevelMap, setThirdLevelMap] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await fetch(
          "https://portal.nexyos.com/api/product/categories"
        );
        const categoriesData = await res.json();
        setCategories(categoriesData);

        const subCategoriesObj = {};
        await Promise.all(
          categoriesData.map(async (category) => {
            const resSub = await fetch(
              `https://portal.nexyos.com/api/product/sub_categories/${category.id}`
            );
            const subData = await resSub.json();
            subCategoriesObj[category.id] = subData;
          })
        );
        setSubCategoriesMap(subCategoriesObj);
      } catch (err) {
        console.error("Error fetching categories or subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleSubCategoryHover = async (subCategoryId) => {
    setActiveSubCategory(subCategoryId);

    if (thirdLevelMap[activeCategory]?.[subCategoryId]) return;

    try {
      const res = await fetch(
        `https://portal.nexyos.com/api/product/third_level_cat/${activeCategory}/${subCategoryId}`
      );
      const data = await res.json();
      setThirdLevelMap((prev) => ({
        ...prev,
        [activeCategory]: {
          ...(prev[activeCategory] || {}),
          [subCategoryId]: data,
        },
      }));
    } catch (error) {
      console.error("Error fetching third-level subcategories:", error);
    }
  };

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubCategory(
      subCategoriesMap[categoryId] ? subCategoriesMap[categoryId][0]?.id : null
    );
  };

  const handleMouseLeave = () => {
    if (activeCategory) {
      setActiveSubCategory(
        subCategoriesMap[activeCategory]
          ? subCategoriesMap[activeCategory][0]?.id
          : null
      );
    }
  };

  return (
    <div id="menu-wrapper">
      <ul className="mega-menu">
        <li className="mega-menu-item">
          <Link className="title-Product" to="/all-products">
            Product
          </Link>

          <div className="mega-dropdown" onMouseLeave={handleMouseLeave}>
            <div className="nav-column categories">
              <ul>
                <li className="mega-view-all">
                  <Link to="/all-products" className="view-all-link">
                    View All Products
                  </Link>
                </li>
                {loading ? (
                  <div className="loader">Loading...</div>
                ) : categories.length > 0 ? (
                  categories.map((item) => (
                    <li
                      className="maga-categories"
                      key={item.id}
                      onMouseEnter={() => handleCategoryHover(item.id)}
                      onClick={() =>
                        navigate(`/category/${item.category}`, {
                          state: { categoryId: item.id },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Link to="#">{item.category}</Link>
                    </li>
                  ))
                ) : (
                  <li>No categories found</li>
                )}
              </ul>
            </div>

            <div className="nav-column subcategory">
              <ul>
                {activeCategory && subCategoriesMap[activeCategory] ? (
                  subCategoriesMap[activeCategory].map((sub) => (
                    <li
                      key={sub.id}
                      className={`mega-subCategory ${
                        sub.id === activeSubCategory ? "active" : ""
                      }`}
                      onMouseEnter={() => handleSubCategoryHover(sub.id)}
                    >
                      <img src={sub.image} alt="" />
                      <Link to={`/sub-category/${sub.id}`}>
                        {sub.sub_category}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No subcategories available</li>
                )}
              </ul>
            </div>

            <div className="nav-column-sub-sub-category">
              <ul className="third-level flex">
                {activeCategory &&
                activeSubCategory &&
                thirdLevelMap[activeCategory]?.[activeSubCategory]?.length >
                  0 ? (
                  thirdLevelMap[activeCategory][activeSubCategory].map(
                    (item) => (
                      <li
                        key={item.id}
                        onClick={() => navigate(`/product`)}
                        style={{ cursor: "pointer" }}
                      >
                         <Link >
                        <img
                          src={`https://portal.nexyos.com/${item.image}`}
                          alt={item.third_level}
                        />
                        
                      {item.third_level}
                      </Link>
                      </li>
                    )
                  )
                ) : (
                  <li>
                    <span>No sub-sub-categories</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Mega;
