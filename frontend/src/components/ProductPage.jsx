import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import miniCAmeraGroup from "../assets/images/nexyos/miniCAmeraGroup.png";
import Tab from "./Solution/TrafficTab/Tab";
import { Bold } from "lucide-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filterAttributes, setFilterAttributes] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [compareItems, setCompareItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
fetch("https://portal.nexyos.com/api/all_products/4/5/4")
  .then(res => res.json())
  .then(data => {
    console.log("API response for products:", data);
    if (!Array.isArray(data)) {
      console.error("API did not return an array");
      setProducts([]);
    } else {
      setProducts(data);
    }
  })
  .catch(err => {
    console.error("Product API fetch error:", err);
    setProducts([]);
  });

    // Fetch filters
  fetch("https://portal.nexyos.com/api/search_list/4/5/4")
  .then((res) => res.json())
  .then((data) => {
    console.log("Filter attributes API response:", data);
    setFilterAttributes(data);
  })
  .catch((error) => console.error("Filter API fetch error:", error));

    // Handle window resize to auto-close filters on wider screens
    const handleResize = () => {
      if (window.innerWidth >= 768) setShowMobileFilter(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const filteredProducts = products.filter(
  (product) =>
    product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
);



  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCompareChange = (id) => {
    setCompareItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open/close filter sections state
  const [openSections, setOpenSections] = useState({
    subseries: false,
    caseType: false,
    resolution: false,
    Lenstype: false,
    LowlightImaging: false,
    IlluminationDistance: false,
    WDR: false,
    EnvironmentalProtection: false,
    powersupply: false,
    StorageType: false,
    WirelessNetwork: false,
    AI: false,
    Localoutput: false,
    Other: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="container-fluid">
      <Tab />
<div className='container mb-60 p-0 md:pb-40 md:pt-10 flex justify-center items-center flex-col'>
<h5>For Better Road Safety & Efficient Traffic Management</h5>
<div className="md:w-[70%] w-[90%] text-justify">
  <p className="text-sm">
    With the growth of urban and rural populations, as well as the increasing number of vehicles on the roads, traffic congestion, accidents, and parking issues are constantly on the rise, presenting new challenges to traffic management agencies. Milesight is delighted to introduce our Intelligent Traffic Solution. We integrate powerful, high-quality cameras with back-end software, elevating intelligent traffic management to a new level with exceptional imagery and advanced AI-powered ANPR technology, ensuring road traffic safety and efficient traffic management.
  </p>
</div>

</div>
      <h1 className="title"  data-aos="fade-right">Product Categories</h1>
      <button
        className="filter-toggle"
        onClick={() => setShowMobileFilter((prev) => !prev)}
      >
        {showMobileFilter ? "✖ Close Filters" : "☰ Filter"}
      </button>

      <div className="main">
        <div className={`filter ${showMobileFilter ? "show" : ""}`}>
          {showMobileFilter && (
            <button
              className="filter-close-btn"
              onClick={() => setShowMobileFilter(false)}
            >
              ✖
            </button>
          )}
          <input
            type="text"
            className="search-input"
            placeholder="Search for Product Models"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

        {filterAttributes.map((attributeBlock) => (
  <div className={`filter-group ${openSections[attributeBlock.attribute] ? "open" : ""}`} key={attributeBlock.id}>
    <h3 onClick={() => toggleSection(attributeBlock.attribute)}  data-aos="fade-right">
      {openSections[attributeBlock.attribute] ? "−" : "+"} {attributeBlock.attribute}
    </h3>
    {openSections[attributeBlock.attribute] && (
      <div className="filter-options">
        {attributeBlock.items.map((item) => (
          <label key={item.id}>
            <input type="checkbox" />
            {item.item.trim()}
          </label>
        ))}
      </div>
    )}
  </div>
))}

        </div>

       <div className="product-grids">
  {products.length === 0 ? (
    <p>Loading products...</p>
  ) : filteredProducts.length === 0 ? (
    <p>No products found.</p>
  ) : (
displayedProducts.map((product) => (
  <div className="card" key={product.id}>
    <span className="new-badge">NEW</span>
    <img
      src={product.image}
      alt={product.title || "Product"}
      onError={(e) => (e.target.src = miniCAmeraGroup)}
    />
   <p className="text-lg text-black " style={{ fontWeight: 'bold' , lineHeight: '1.2' }}>{product.title}</p>

    <p>{product.model}</p>
    <label>
      <input
        type="checkbox"
        checked={compareItems.includes(product.id)}
        onChange={() => handleCompareChange(product.id)}
      />
      Compare
    </label>
    <Link to={`/products/${product.id}`} className="card-link">
      <button>Explore</button>
    </Link>
  </div>
))

  )}

  <div
    className="pagination"
    style={{
      gridColumn: "1 / -1",
      textAlign: "center",
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "8px",
    }}
  >
    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
      Prev
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={currentPage === i + 1 ? "active" : ""}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
    >
      Next
    </button>
  </div>
</div>

      </div>

      {compareItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#d00",
            color: "white",
            padding: "10px 15px",
            borderRadius: "25px",
            fontWeight: "bold",
          }}
        >
          Compare ({compareItems.length})
        </div>
      )}

      <style>{`
  * {
    box-sizing: border-box;
  }

  .title {
    font-size: 28px;
    text-align: center;
  margin-top:50px;
  margin-bottom:50px;
    font-weight: bold;
  }

  .container {
    font-family: Arial, sans-serif;
    padding: 20px;
  }

.main {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

  .new-badge {
  position: absolute;
  top: 10px;
  left: 10px;

  color: #d00;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 20px;
  z-index: 1;
}
    .filter {
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  overflow-y: auto;
  flex-shrink: 0;
}


  .filter-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .filter-group h3 {
    margin: 0;
    font-size: 16px;
    cursor: pointer;
    color: #333;
    user-select: none;
  }

.filter-options {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
}

.filter-group.open .filter-options {
  max-height: 500px; /* adjust if needed */
}

  .filter-options label {
    display: block;
    font-size: 14px;
    margin-bottom: 6px;
    color: #333;
  }

  .product-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

.card {
  position: relative; /* ✅ Needed for .new-badge */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
  width: 100%;
  height: auto; /* ✅ Allow card to expand */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


  .card:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
  }

.card img {
  width: 100%;
  height: 120px; /* already fixed height, keep it */
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}



  .card p {
    font-size: 14px;
    color: #555;
  }

  .card button {
    margin-top: 10px;
    padding: 6px 40px;
    background-color: #01667D;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .card button:hover {
    background-color: #2E535C;
  }

  .filter-toggle {
    display: none;
    margin-bottom: 10px;
    padding: 8px 12px;
    background-color: #01667D;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
.pagination button {
  min-width: 40px;
  height: 36px;
  background-color: white;
  color: #000;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.pagination button:hover {
  background-color: #eee;
}

.pagination button.active {
  background-color: #01667D !important;
  color: #fff !important;
}

  @media screen and (max-width: 1024px) {
    .filter-toggle {
      display: block;
    }

    .filter {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: 100%;
      background-color: #f8f9fa;
      border-right: 1px solid #ccc;
      border-radius: 0;
      padding: 20px;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1000;
      overflow-y: auto;
    }

    .filter.show {
      transform: translateX(0);
    }

    .filter-close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      background: transparent;
      border: none;
      color: #333;
      cursor: pointer;
    }

    .main {
      flex-direction: column-reverse;
    }
  }

  @media screen and (min-width: 1025px) {
    .filter {
      position: relative;
      transform: none !important;
      width: 250px;
      height: auto;
    }

    .filter-toggle {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .filter {
      width: 100%;
    }
  }
`}</style>
    </div>
  );
};

export default ProductPage;
