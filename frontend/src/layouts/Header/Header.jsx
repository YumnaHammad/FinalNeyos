import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../../components/Searchbar";
import "select2";
import "../../index.css";
import { FaUserAlt } from "react-icons/fa"; 
import { FaHandshakeAngle } from "react-icons/fa6";
import { BsFolder2Open } from "react-icons/bs";
import { FaRegCirclePlay } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { BiBuildings } from "react-icons/bi";
import { RiContactsBook3Line } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import "rsuite/dist/rsuite.min.css";
import Mega from "./Mega";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { IoHomeOutline } from "react-icons/io5";
import logo from '../../assets/images/logo/logo.png'
import { FaBars } from "react-icons/fa";
// import PartnerMenu from "../MegaMenus/PartnerMenu";
// import CompanyMenu from "../MegaMenus/CompanyMenu";
// import SolutionsMenu from "../MegaMenus/SolutionsMenu";
// import ProductMenu from "../MegaMenus/ProductMenu";
const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlignOpen, setIsAlignOpen] = useState(false);
  const [activeSubIndex, setActiveSubIndex] = useState(null); // for subcategory
    const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleAlignMenu = () => {
    setIsAlignOpen(!isAlignOpen);
  };
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
    setTimeout(() => {
      const selectElement = query(".js-example-basic-single");
      if (selectElement.length) {
        selectElement.select2();
      }
    }, 100);
    return () => {
      const selectElement = query(".js-example-basic-single");
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  // Set the default language
  const [selectedLanguage, setSelectedLanguage] = useState("EngLish");
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  // Set the default currency
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };

  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await fetch(
          "https://portal.nexyos.com/api/product/categories"
        );
        const categoriesData = await res.json();
        setCategories(categoriesData);

        const subCategoriesObj = {};
        // Parallel fetching of all subcategories
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

  const handleSubCategoryToggle = (e, subCategoryId) => {
    e.stopPropagation(); // prevent event bubbling
    setActiveSubIndex(activeSubIndex === subCategoryId ? null : subCategoryId);
  };
  const goBack = () => setNavStack((prev) => prev.slice(0, -1));
  const closeNav = () => setNavStack([{ title: "Menu", items: menuData }]);

    const [menuData, setMenuData] = useState([
      { title: "Home", path: "/", icon: IoHomeOutline },
      { title: "Product", path: "/all-products", icon: AiOutlineProduct },
      {
        title: "Solutions",
        path: "/solution",
        icon: BsFolder2Open,
        submenu: {
          title: "Solutions",
          items: [
            {
              title: "Video Surveillance",
              path: "/solution/videoSurveillance",
            },
            { title: "Intelligent Traffic Solution", path: "/solution/IntelligentTrafficSolution" },
            { title: "Smart Restroom", path: "/solution/smartrestroom" },
            { title: "Indoor Air Quality", path: "/solution/IndoorAirQuality" },
            { title: "Smart Space", path: "/solution/smartSpace" },
            { title: "People Counting", path: "/Solution/PeopleCounting" },
            { title: "Smart HVAC Management", path: "/solution/smart-hvac-management" },
            { title: "Space Occupancy", path: "/Solution/SpaceOccupancy" },
          ],
        },
      },
      { title: "Success Stories", path: "/success", icon: CiGlobe },
      {
        title: "Company",
        path: "#",
        icon: BiBuildings,
        submenu: {
          title: "Company",
          items: [
            { type: "heading", title: "Company Info" },
            { title: "About Us", path: "/company/aboutUs" },
            { title: " Our Brand", path: "/company/ourBrand" },
            { title: "Events", path: "/company/events" },
            { type: "heading", title: "Library" },
            { title: "Blog", path: "/company/blog" },
            { title: "News", path: "/company/news" },
          ],
        },
      },
      {
        title: "Partner",
        path: "#",
        icon: FaHandshakeAngle,
        submenu: {
          title: "Partner",
          items: [
            { type: "heading", title: " Nexyos Partner Ecosystem" },
            { title: "Find a Channel Partner", path: "/Partner/FindChannel" },
            { title: "Channel Partner Program", path: "/Partner/ChannelPartner" },
            { title: "Project Registration", path: "/Partner/ProjectRegistration" },
            { title: "IoT Collaboration Start Guide", path: "/Partner/IotCollaboration" },
          ],
        },
      },
      { title: "Contact Us", path: "/contact", icon: RiContactsBook3Line },
      { title: "Online Demo", path: "/demo", icon: FaRegCirclePlay },
    ]);
  
    const [navStack, setNavStack] = useState([
      { title: "Menu", items: menuData },
    ]);
    const currentMenu = navStack[navStack.length - 1];
  
    useEffect(() => {
      const fetchProductMenu = async () => {
        try {
          const response = await fetch(
            "https://portal.nexyos.com/api/product/categories"
          );
          const categories = await response.json();
  
          const categoryWithSubmenus = await Promise.all(
            categories.map(async (category) => {
              const res = await fetch(
                `https://portal.nexyos.com/api/product/sub_categories/${category.id}`
              );
              const subCategories = await res.json();
  
              return {
                title: category.category,
                path: `/product-category/${category.id}`,
                submenu: {
                  title: category.category,
                  items: subCategories.map((sub) => ({
                    title: sub.sub_category,
                    path: `/product-subcategory/${sub.id}`,
                    subCategoryId: sub.id,
                    categoryId: category.id, // pass for third-level
                  })),
                },
              };
            })
          );
  
          const updatedMenu = menuData.map((item) =>
            item.title === "Product"
              ? {
                  ...item,
                  submenu: {
                    title: "Product",
                    items: categoryWithSubmenus,
                  },
                }
              : item
          );
  
          setMenuData(updatedMenu);
          setNavStack([{ title: "Menu", items: updatedMenu }]);
        } catch (error) {
          console.error("Failed to fetch product/subcategory menus", error);
        }
      };
      fetchProductMenu();
    }, []);

      const openSubmenu = async (item) => {
    console.log("openSubmenu triggered for:", item);
    if (item.submenu && item.submenu.items) {
      setNavStack((prev) => [
        ...prev,
        {
          title: item.submenu.title || item.title,
          items: item.submenu.items,
        },
      ]);
    }
    // If it's a second-level item with subCategoryId (we added this above)
    else if (
      item.path?.includes("/product-subcategory/") &&
      item.subCategoryId &&
      item.categoryId
    ) {
      try {
        const thirdLevelRes = await fetch(
          `https://portal.nexyos.com/api/product/third_level_cat/${item.categoryId}/${item.subCategoryId}`
        );
        const thirdLevelData = await thirdLevelRes.json();
        console.log("thirdLevelData", thirdLevelData);
        if (thirdLevelData.length > 0) {
          const thirdLevelItems = thirdLevelData.map((third) => ({
            title: third.third_level,
            path: `/product-thirdlevel/${third.id}`,
            image: third.image,
          }));

          setNavStack((prev) => [
            ...prev,
            {
              title: item.title + " Models", // make unique so ChevronLeft appears
              items: thirdLevelItems,
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch third-level menu:", error);
      }
    }
  };

  return (
    <>
      {/*==================== Overlay Start ====================*/}
      <div className="overlay" />
      {/*==================== Overlay End ====================*/}
      {/*==================== Sidebar Overlay End ====================*/}
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/*==================== Sidebar Overlay End ====================*/}

      {/* ==================== Search Box Start Here ==================== */}
      <form action="#" className={`search-box ${activeSearch && "active"}`}>
        <button
          onClick={handleSearchToggle}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>
        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl rounded-pill pe-64"
              placeholder="Search for a product or brand"
            />
            <button
              type="submit"
              className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
            >
              <i className="ph ph-magnifying-glass" />
            </button>
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here  ==================== done */}
      <div className={`mobile-menu scroll-sm block lg:hidden ${menuActive ? "active" : ""}`}>
     <div className="fixed inset-0 bg-white z-50 shadow-lg w-full  mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {navStack.length > 1 ? (
          <div className="flex items-center gap-2">
            <button onClick={goBack}>
              <ChevronLeft size={28} />
            </button>
            <h2 className="font-semibold text-xl m-0">{currentMenu.title}</h2>
          </div>
        ) : (
          <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" />
          </div>
        )}
<button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type="button"
          className=""
        >
          <X size={28} />
        </button>
        {/* <button onClick={closeNav}>
          <X size={28} />
        </button> */}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col">
        {currentMenu.items.map((item, idx) => {
          if (item.type === "heading") {
            return (
              <h6 key={idx} className="px-6 py-2 tracking-wide">
                {item.title}
              </h6>
            );
          }

          const Icon = item.icon;
          const hasSubmenu = item.submenu && item.submenu.items;

          return (
            <ul key={idx}>
              <li>
                {item.image ? (
                  // Third-level menu item with image
                  <Link
                    to={item.path || "#"}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100"
                  >
                    <img
                      src={`https://portal.nexyos.com/${item.image}`}
                      alt={item.title}
                      className="rounded"
                    />
                    <span className="text-black">{item.title}</span>
                  </Link>
                ) : item.subCategoryId && item.categoryId ? (
                  // Second-level item with subCategoryId (open third-level)
                  <button
                  
                    onClick={() => openSubmenu(item)}
                    className="flex justify-between items-center w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3 px-12">
                      <span className="text-black my-8 px-12 text-left">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                ) : hasSubmenu ? (
                  // First or second level with submenu
                  <button
                    onClick={() => openSubmenu(item)}
                    className="flex justify-between items-center w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3 px-12">
                      {Icon && <Icon size={20} className="text-gray-700" />}
                      <span className="text-black my-8 px-12 text-left">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  // Leaf node
                  <Link
                    to={item.path || "#"}
                    className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3 px-12">
                      {Icon && <Icon size={20} className="text-gray-700" />}
                      <span className="text-black my-8 px-12 text-left">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Header Two Start ========================= */}

      {/* ======================= Middle Header Two End ========================= */}
      {/* ==================== Header Two Start Here ==================== */}
      <header
        className={`header shadow-2xl bg-white border-bottom border-gray-100 py-4  ${
          scroll && "fixed-header"
        }`}
      >
        <div className="container">
          <nav className="header-inner d-flex justify-content-between gap-8 ">
            <div className="ps-4 logo d-lg-none">
              <Link to="/" className="link">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="w-100 ">
              {/* Menu Start  */}

             <div className="header-menu hidden lg:block">
                <div className="row d-flex justify-content-between">
                  <div className="col-2">
                    <div className="logo">
                      <Link to="/" className="link">
                        <img
                          src="/assets/images/logo/logo-two.png"
                          alt="Logo"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-10">
                    <ul className="nav-menu flex-align justify-content-start">
                      <li className="on-hover-item nav-menu__item activePage">
                        <Link to="/" className="nav-menu__link ">
                          Home
                        </Link>
                      </li>
                      <li className="on-hover-item nav-menu__item has-megamenu has-submenu"  style={{ textAlign: 'left' }}>
                        <div className="nav-menu__link">
                          <Mega />
                        </div>
                      </li>
                      <li className="on-hover-item nav-menu__item has-megamenu has-submenu">
                        <Link to="/solution" className="nav-menu__link">
                          Solutions
                        </Link>
                        <div className="on-hover-dropdown common-dropdown nav-megamenu" style={{ textAlign: 'left', zIndex: 1000 }}>
                          <div className="grid grid-cols-3 gap-6 p-6">
                            {/* Column 1 - Security & Surveillance */}
                            <div>
                              <h6 className="fs-6 pt-3 text-gray-800 font-semibold">Security & Surveillance</h6>
                              <ul>
                                <li>
                                  <NavLink
                                    to="/solution/videoSurveillance"
                                    className="common-dropdown__link"
                                  >
                                    Video Surveillance
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/citySurveillance"
                                    className="common-dropdown__link"
                                  >
                                    City Surveillance
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/healthcare"
                                    className="common-dropdown__link"
                                  >
                                    Healthcare
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/hotel"
                                    className="common-dropdown__link"
                                  >
                                    Hotel
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/retailsecurity"
                                    className="common-dropdown__link"
                                  >
                                    Retail Security
                                  </NavLink>
                                </li>
                              </ul>
                            </div>

                            {/* Column 2 - Smart Infrastructure */}
                            <div>
                              <h6 className="fs-6 pt-3 text-gray-800 font-semibold">Smart Infrastructure</h6>
                              <ul>
                                <li>
                                  <NavLink
                                    to="/solution/smartrestroom"
                                    className="common-dropdown__link"
                                  >
                                    Smart Restroom
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/smartSpace"
                                    className="common-dropdown__link"
                                  >
                                    Smart Space
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/smartAppartment"
                                    className="common-dropdown__link"
                                  >
                                    Smart Apartment
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/displayControl"
                                    className="common-dropdown__link"
                                  >
                                    Display & Control
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/smartParking"
                                    className="common-dropdown__link"
                                  >
                                    Smart Parking
                                  </NavLink>
                                </li>
                              </ul>
                            </div>

                            {/* Column 3 - Industrial & Transportation */}
                            <div>
                              <h6 className="fs-6 pt-3 text-gray-800 font-semibold">Industrial & Transportation</h6>
                              <ul>
                                <li>
                                  <NavLink
                                    to="/solution/IntelligentTrafficSolution"
                                    className="common-dropdown__link"
                                  >
                                    Intelligent Traffic Solution
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/Manufacturing"
                                    className="common-dropdown__link"
                                  >
                                    Manufacturing
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/Education"
                                    className="common-dropdown__link"
                                  >
                                    Education
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/IndoorAirQuality"
                                    className="common-dropdown__link"
                                  >
                                    Indoor Air Quality
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/solution/EnergyEfficiency"
                                    className="common-dropdown__link"
                                  >
                                    Energy Efficiency
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-menu__item">
                        <NavLink to="/success" className="nav-menu__link">
                          Success Stories
                        </NavLink>
                      </li>
                                             <li className="on-hover-item nav-menu__item has-megamenu has-submenu">
                         <Link to="/company" className="nav-menu__link">
                           Company
                         </Link>
                         <div className="on-hover-dropdown common-dropdown nav-megamenu" style={{ textAlign: 'left', zIndex: 1000 }}>
                           <div className="grid grid-cols-2 gap-6 p-6">
                             {/* Column 1 - Corporate Info */}
                             <div>
                               <h6 className="fs-6 pt-3">Corporate Info</h6>
                               <ul>
                                 <li>
                                   <NavLink
                                     to="/company/aboutUs"
                                     className="common-dropdown__link"
                                   >
                                     About Us
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/company/ourBrand"
                                     className="common-dropdown__link"
                                   >
                                     Our Brand
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/company/events"
                                     className="common-dropdown__link"
                                   >
                                     Events
                                   </NavLink>
                                 </li>
                               </ul>
                             </div>

                             {/* Column 2 - Library */}
                             <div>
                               <h6 className="fs-6 pt-3">Library</h6>
                               <ul>
                                 <li>
                                   <NavLink
                                     to="/company/blog"
                                     className="common-dropdown__link"
                                   >
                                     Blog
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/company/news"
                                     className="common-dropdown__link"
                                   >
                                     News
                                   </NavLink>
                                 </li>
                               </ul>
                             </div>
                           </div>
                         </div>
                       </li>
                                                                                           <li className="on-hover-item nav-menu__item has-megamenu has-submenu">
                         <Link to="/partner" className="nav-menu__link">
                           Partner
                         </Link>
                         <div className="on-hover-dropdown common-dropdown nav-megamenu" style={{ textAlign: 'left', zIndex: 1000 }}>
                           <div className="grid grid-cols-2 gap-6 p-6">
                             {/* Column 1 - Nexyos Partner Ecosystem */}
                             <div>
                               <h6 className="fs-6 pt-3">
                                 Nexyos Partner Ecosystem
                               </h6>
                               <ul className="">
                                 <li>
                                   <NavLink
                                     to="/Partner/FindChannel"
                                     className="common-dropdown__link"
                                   >
                                     Find a Channel Partner
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/Partner/ChannelPartner"
                                     className="common-dropdown__link"
                                   >
                                     Channel Partner Program
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/Partner/ProjectRegistration"
                                     className="common-dropdown__link"
                                   >
                                     Project Registration
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/Partner/IotCollaboration"
                                     className="common-dropdown__link"
                                   >
                                     IoT Collaboration Start Guide
                                   </NavLink>
                                 </li>
                               </ul>
                             </div>

                             {/* Column 2 - Partner Programs */}
                             <div>
                               <h6 className="fs-6 pt-3">
                                 Partner Programs
                               </h6>
                               <ul className="">
                                 <li>
                                   <NavLink
                                     to="/Partner/DeveloperPartner"
                                     className="common-dropdown__link"
                                   >
                                     Nexyos Developer Partner
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/Partner/TechnologyPartner"
                                     className="common-dropdown__link"
                                   >
                                     Technology Partner Program
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/Partner/CCTVChannel"
                                     className="common-dropdown__link"
                                   >
                                     CCTV Channel Partner
                                   </NavLink>
                                 </li>
                                 <li>
                                   <NavLink
                                     to="/Partner/BecomePartner"
                                     className="common-dropdown__link"
                                   >
                                     Become a Partner
                                   </NavLink>
                                 </li>
                               </ul>
                             </div>
                           </div>
                         </div>
                       </li>
                      <li className="nav-menu__item">
                        <SearchBar />
                      </li>
                      <li className="nav-menu__item">
                        <NavLink to="/contact" className="nav-menu__link">
                          Contact Us
                        </NavLink>
                      </li>
                      <li className="nav-menu__item">
                        <Link
                          to="/demo"
                          className="nav-menu__link d-flex align-items-center gap-2"
                        >
                          <span className="icon">
                            <i className="ph ph-play-circle" />{" "}
                            {/* Play Icon using Phosphor Icons */}
                          </span>
                          Online Demo
                        </Link>
                      </li>
                      <li className="nav-menu__item">
                        <Link
                          to="/login"
                          className="nav-menu__link d-flex align-items-center gap-2 ms-lg-3"
                        >
                          <FaUserAlt size={28} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center h-100">
                <button
                  onClick={handleMenuToggle}
                  type="button"
                  className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
                >
                  <FaBars size={32} className="text-white icon"/>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default Header;
