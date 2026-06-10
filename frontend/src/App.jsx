import "./App.scss";
import "./index.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import Home from "./pages/Home/Home";
import BottomFooter from "./layouts/Footer/BottomFooter";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import ColorInit from "./helper/ColorInit";
import Preloader from "./helper/Preloader";
import Slider from "./pages/Slider";
import Footer from "./layouts/Footer/Footer";
import SuccessStories from "./components/SuccessStories";
import ContactPage from "./pages/ContactPage";
import Header from "./layouts/Header/Header";
import BlogDetailPage from "./components/Blog/BlogDetailPage";
import Company from "./pages/Company/Company";
import Partner from "./pages/Partner/Partner";
import ProductPage from "./components/ProductPage";
import ProductDetail from "./components/ProductDetail";
import SalesInquiry from "./components/SalesInquiry";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Categorycall from "./components/Categorycall";
import ProCamera from "./components/ProCamera";
import Solution from "./pages/Solution/index";
import SollPage from "./components/SollPage";
import ProductsPage from "./pages/Products/ProductsEnhanced";
import SubCategoryPage from "./components/SubCategoryPage";
import HALOSmartSensor from "./pages/Solution/HALOSmartSensor";
import Smart_HVAC_Management from "./pages/Solution/Smart_HVAC_Management";
import DemoPage from "./pages/DemoPage";
import { solutionRoutes } from "./routes/solutionRoutes";
import { companyRoutes } from "./routes/companyRoutes";
import { partnerRoutes } from "./routes/partnerRoutes";
function App() {
  const location = useLocation();

  // Determine whether to show header/footer
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    AOS.init({
      once: false, // animation triggers only once
      duration: 500, // animation duration in ms
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <RouteScrollToTop />
      <PhosphorIconInit />
      <ColorInit color={true} />
      <ScrollToTop
        smooth
        color="#FA6400"
        className="p-0 justify-center items-center flex"
      />
      <ToastContainer />
      <Preloader />
      {!hideHeaderFooter && <Header />}
      <Routes>
          {solutionRoutes.map(route => (
    <Route key={route.path} {...route} />
  ))}

  {companyRoutes.map(route => (
    <Route key={route.path} {...route} />
  ))}

  {partnerRoutes.map(route => (
    <Route key={route.path} {...route} />
  ))}
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/all-products" element={<ProductsPage />} />
        <Route path="/sales-inquiry" element={<SalesInquiry />} />
        <Route path="/category/:categoryName" element={<Categorycall />} />
        <Route path="/sub-category/:id" element={<SubCategoryPage />} />
        <Route path="/product/" element={<ProCamera />} />
        <Route
          path="/solution/halo-smart-sensor"
          element={<HALOSmartSensor />}
        />
        <Route
          path="/solution/smart-hvac-management"
          element={<Smart_HVAC_Management />}
        />
        {/* <Route path="/solution/smart-space" element={<Smart_Space />} /> */}
        <Route path="/slider" element={<Slider />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/success" element={<SuccessStories />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/soll" element={<SollPage />} />
        <Route path="/company" element={<Company />} />
        <Route path="/partner" element={<Partner />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && <BottomFooter />}
    </>
  );
}

export default App;
