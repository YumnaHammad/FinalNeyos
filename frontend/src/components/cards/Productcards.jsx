import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import miniCAmeraGroup from "../../assets/images/nexyos/miniCAmeraGroup.png";
import { GoArrowRight } from "react-icons/go"; 
import '../../style/Productcards.css'

const Productcards = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();                 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://portal.nexyos.com/api/product/categories"
        );
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container-fluid mt-60">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="loading">No categories found.</p>
      ) : (
        <div className="custom-grid">
          {categories.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() =>
                navigate(`/products`)
              }
            >
              <div className="card-content">
                <img
                  src={miniCAmeraGroup}
                  alt={item.category}
                  className="procard-img"
                />
                <div className="card-text">
                  <h2 className="procard-title">
                    AI 4X/12X Pro Bullet Plus Camera
                  </h2>
                  <p>Experience the All-round and Powerful Functions</p>
                  <ul className="card_list">
                    <li>2/4/5/8MP</li>
                    <li>4X/12X Optical Zoom</li>
                    <li>90fps</li>
                    <li>140dB Super WDR</li>
                  </ul>
                  <div className="card-icon">
                    <GoArrowRight className="arrow-icon"/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productcards;