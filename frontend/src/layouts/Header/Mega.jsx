import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { resolveMediaUrl } from "../../api";
import { categoryPath, familyPath, slugify } from "../../utils/slugify";
import "../../style/Mega.css";

const Mega = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSubSlug, setActiveSubSlug] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/categories")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setCategories(data);
        if (data.length > 0) {
          setActiveCategoryId(String(data[0]._id));
          const firstSub = data[0].subCategories?.[0];
          setActiveSubSlug(firstSub?.slug || null);
        }
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const activeCategory =
    categories.find((c) => String(c._id) === String(activeCategoryId)) || null;
  const subCategories = activeCategory?.subCategories || [];
  const activeSub =
    subCategories.find((s) => s.slug === activeSubSlug) || subCategories[0] || null;
  const thirdLevel = activeSub?.subSubCategories || [];

  const handleCategoryHover = (category) => {
    setActiveCategoryId(String(category._id));
    const firstSub = category.subCategories?.[0];
    setActiveSubSlug(firstSub?.slug || null);
  };

  const handleSubCategoryHover = (sub) => {
    setActiveSubSlug(sub.slug);
  };

  const handleMouseLeave = () => {
    if (categories.length > 0) {
      setActiveCategoryId(String(categories[0]._id));
      const firstSub = categories[0].subCategories?.[0];
      setActiveSubSlug(firstSub?.slug || null);
    }
  };

  const goToCategory = (item) => {
    navigate(categoryPath(item));
  };

  const goToFamily = (ssub) => {
    const subSubSlug = ssub.slug || slugify(ssub.name);
    if (!subSubSlug || !activeCategory || !activeSub) return;
    navigate(familyPath(activeCategory.slug, activeSub.slug, subSubSlug));
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
                      key={item._id}
                      onMouseEnter={() => handleCategoryHover(item)}
                      onClick={() => goToCategory(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <Link to={categoryPath(item)} onClick={(e) => e.preventDefault()}>
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No categories found</li>
                )}
              </ul>
            </div>

            <div className="nav-column subcategory">
              <ul>
                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <li
                      key={sub.slug || sub.name}
                      className={`mega-subCategory ${
                        sub.slug === activeSub?.slug ? "active" : ""
                      }`}
                      onMouseEnter={() => handleSubCategoryHover(sub)}
                    >
                      {sub.image && (
                        <img src={resolveMediaUrl(sub.image)} alt="" />
                      )}
                      <Link
                        to={activeCategory ? categoryPath(activeCategory) : "#"}
                        onClick={(e) => {
                          e.preventDefault();
                          if (activeCategory) goToCategory(activeCategory);
                        }}
                      >
                        {sub.name}
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
                {thirdLevel.length > 0 ? (
                  thirdLevel.map((item, idx) => (
                    <li
                      key={item.slug || idx}
                      onClick={() => goToFamily(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <Link to="#" onClick={(e) => e.preventDefault()}>
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span>No models available</span>
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
