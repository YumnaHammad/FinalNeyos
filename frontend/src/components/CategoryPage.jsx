
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import miniCAmeraGroup from "../assets/images/nexyos/miniCAmeraGroup.png";
// import '../style/SubCategoryPage.css'

const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.state?.categoryId;

  const [subCategories, setSubCategories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const nextSubCategory = () => {
    setCurrent((prev) => (prev + 1) % subCategories.length);
  };

  const prevSubCategory = () => {
    setCurrent((prev) => (prev - 1 + subCategories.length) % subCategories.length);
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`https://portal.nexyos.com/api/product/sub_categories/${categoryId}`);
        const data = await res.json();
        setSubCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchSubCategories();
    }
  }, [categoryId]);

  const handleNavigate = (item) => {
    navigate(`/sub-category/${item.id}`, { state: { subCategory: item } });
  };

  return (
    <>
<div className="custom-padding text-center" style={{ marginTop: '5rem', marginBottom: '3rem' }}>


<h5 className="text-base text-center"  data-aos="fade-right">What we offer</h5>
<p className="text-center max-w-4xl mx-auto">
  It has survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. It was
  popularised in the 1960s with the release of Letraset sheets
  containing Lorem Ipsum passages, and more recently with desktop
  publishing.

  It has survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. It was
  popularised in the 1960s with the release of Letraset sheets
  containing Lorem Ipsum passages, and more recently with desktop
  publishing
</p>
</div>

      <div className="wrapper">
        <h1 className="title" data-aos="fade-right">Product Category</h1>

        <section className="Feature_container bg-gray-100 rounded-lg pb-28 flex flex-col items-center justify-center">
          <div className="py-6 px-20 mt-16">
            <h2 className="text-2xl font-semibold text-center my-12" data-aos="fade-right">
              Diverse Range of Sub-Categories and Lenses
            </h2>

            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-5xl mx-auto w-full">
              {/* Lenses Section */}
              <div className="w-full lg:w-[350px] rounded-xl flex flex-col justify-center items-center relative">
                <img
                  src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-lenses.jpg?t=1751621798627"
                  alt="Lenses"
                  className="rounded-lg mb-4 w-full h-auto object-cover"
                />
                <div className="lensesContent text-left px-2 absolute bottom-8 text-white">
                  <h3 className="text-xl font-semibold" data-aos="fade-right">Lenses</h3>
                  <p className="text-sm">
                    4X/5X/12X/36X Optical AF Lens <br />
                    Motorized 2.7~13.5mm / 3.6~10mm @F1.4
                  </p>
                </div>
              </div>

              {/* Sub-Categories Section (auto height) */}
              <div className="w-[800px] bg-white py-10 px-12 rounded-xl hidden lg:flex flex-col">
                <h6 className="text-left mb-4" data-aos="fade-right">Sub-Categories :</h6>
                {loading ? (
                  <p>Loading sub-categories...</p>
                ) : subCategories.length === 0 ? (
                  <p>No sub-categories found.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {Array.from({ length: 8 }).map((_, index) => {
                        const item = subCategories[currentPage * 8 + index];
                        return item ? (
                          <div
                            key={item.id}
                            className="card"
                            onClick={() => handleNavigate(item)}
                          >
                            <img
                              src={miniCAmeraGroup}
                              alt={item.category}
                              className="card-img"
                            />
                            <h2 className="card-title" data-aos="fade-right">
                              {item.sub_category}
                              <ChevronRight className="arrow-icon" />
                            </h2>
                          </div>
                        ) : (
                          <div
                            key={`empty-${index}`}
                            className="card opacity-0 pointer-events-none"
                          ></div>
                        );
                      })}
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex justify-center mt-6">
                      {Array.from({ length: Math.ceil(subCategories.length / 8) }).map((_, i) => (
                        <span
                          key={i}
                          onClick={() => setCurrentPage(i)}
                          className={`carousel-dot ${currentPage === i ? "active" : ""}`}
                        ></span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Carousel */}
              <div className="block lg:hidden">
                <div className="relative w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-md font-medium mb-4 text-black">Sub-Categories</div>
                    <div className="absolute right-6 flex space-x-2">
                      <button onClick={prevSubCategory}>
                        <ChevronLeft className="text-gray-600 hover:text-black" />
                      </button>
                      <button onClick={nextSubCategory}>
                        <ChevronRight className="text-gray-600 hover:text-black" />
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <p>Loading...</p>
                  ) : subCategories.length > 0 ? (
                    <>
                      <div
                        className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
                        onClick={() => handleNavigate(subCategories[current])}
                      >
                        <img
                          src={miniCAmeraGroup}
                          alt={subCategories[current]?.sub_category}
                          className="h-70 p-0 object-contain"
                        />
                        <p className="text-gray-700 text-lg font-medium">
                          {subCategories[current]?.sub_category}
                        </p>
                      </div>
                      <div className="mt-6 text-center text-gray-600 text-lg">
                        <span className="font-bold text-black">{current + 1}</span>
                        <span className="mx-2 font-normal">—</span>
                        <span>{subCategories.length}</span>
                      </div>
                    </>
                  ) : (
                    <p>No sub-categories available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Styles */}
        <style>{`
.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: #d1d5db;
  margin: 0 3px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
}
.carousel-dot.active {
  background-color: #01667D;
  transform: scale(1.3);
}
.wrapper {
  background-color: white;
  min-height: 100vh;
  padding: 20px;
}
.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}
  .card {
  // width: 130px;
  height: 130px;   /* ✅ Fixed height */
  background-color: #ffffff;
  border: 2px solid #01667D;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
 padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-img {
  // height: 60px;       /* ✅ Increased image size */
  width: auto;        /* Keep aspect ratio */
  object-fit: contain;
  // margin-bottom: 6px;
  transition: transform 0.3s ease;
}

.card:hover .card-img {
  transform: scale(1.15);  /* ✅ Smooth zoom on hover */
}

.card-title {
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.arrow-icon {
  width: 12px;
  height: 12px;
  color: #01667D;
}
@media (max-width: 768px) {
  .custom-grid {
    flex-direction: column;
    align-items: center;
  }
  .card {
    width: 90%;
  }
}
        `}</style>
      </div>
    </>
  );
};

export default CategoryPage;
