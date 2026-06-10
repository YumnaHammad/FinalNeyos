import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
// import Login from './pages/Auth/Login.jsx';
// import Signup from './pages/Auth/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { ToastContainer } from 'react-toastify';

// CSS Imports (your existing list)
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'select2/dist/js/select2.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import './index.css';

// Your existing long CSS imports (keeping them as-is)
import '../src/style/Home/_flash-sales.css';
import '../src/style/Home/_newsletter.css';
import '../src/style/Home/_offer.css';
import '../src/style/Home/_product-card.css';
import '../src/style/Home/_promotional-banner.css';
import '../src/style/Home/_banner.css';
import '../src/style/Home/_short-product.css';
import '../src/style/Home/_vendor.css';
import '../src/style/Home/_delivery.css';
import '../src/style/Home/_shipping.css';
import '../src/style/Home/_brand.css';
import '../src/style/Home/_feature.css';
import '../src/style/home-two/_banner-two.css';
import '../src/style/home-two/_color-two.css';
import '../src/style/home-two/_day-sale.css';
import '../src/style/home-two/_deals.css';
import '../src/style/home-two/_discount.css';
import '../src/style/home-two/_featured-products.css';
import '../src/style/home-two/_popular-products.css';
import '../src/style/home-two/_top-brand.css';
import '../src/style/home-two/_trending-products.css';
import '../src/style/homeThree/_banner-three.css';
import '../src/style/homeThree/_deals.css';
import '../src/style/homeThree/_promotional-banner-three.css';
import '../src/style/homeThree/_testimonials.css';
import '../src/style/homeThree/_text-slider.css';
import '../src/style/layout/_footer.css';
import '../src/style/layout/_header-middle.css';
import '../src/style/layout/_header-top.css';
import '../src/style/layout/_header.css';
import '../src/style/layout/_mobile-nav-menu.css';
import '../src/style/layout/_preloader.css';
import '../src/style/layout/_scroll-top.css';
import '../src/style/layout/_search-form.css';
import '../src/style/layout/_section-heading.css';
import '../src/style/layout/_slick.css';
import '../src/style/othersPage/_blog.css';
import '../src/style/othersPage/_cart.css';
import '../src/style/othersPage/_checkout.css';
import '../src/style/othersPage/_counter.css';
import '../src/style/othersPage/_product-details.css';
import '../src/style/othersPage/_shop.css';
import '../src/style/othersPage/_vendor-two-details.css';
import '../src/style/othersPage/_vendors-two.css';
import '../src/style/_accordion.css';
import '../src/style/_badge.css';
import '../src/style/_button.css';
import '../src/style/_card.css';
import '../src/style/_countdown.css';
import '../src/style/_form.css';
import '../src/style/_overlay.css';
import '../src/style/_pagination.css';
import '../src/style/_range-slider.css';
import '../src/style/_scroll-hide.css';
import '../src/style/_scrollbar.css';
import '../src/style/_select2.css';
import '../src/style/_shadow.css';
import '../src/style/_tab.css';
import '../src/style/_table.css';
import '../src/style/_typography.css';
import '../src/style/BlogCard.module.css';
import '../src/style/BlogDetailPage.module.css';
import '../src/style/ParentSubCategories.module.css';
import '../src/style/PartnerProgram.module.css';
import '../src/style/BlogPage.module.css';
import '../src/style/CameraSpecifications.module.css';
import '../src/style/CategoryTabs.module.css';
import '../src/style/ChannelPartners.css';
import '../src/style/detailpage.css';
import '../src/style/Hot.css';
import '../src/style/page.css';
import '../src/style/pagecss.css';
// import '../src/style/ProductsPage.css';
import '../src/style/ProjectRegistration.module.css';
import '../src/style/SearchBar.module.css';
import '../src/style/Slider.module.css';
import '../src/style/TrendingProducts.css';
import '../src/style/css/animate.css';
import '../src/style/css/aos.css';
import '../src/style/css/bootstrap.min.css';
import '../src/style/css/jquery-ui.css';
import '../src/style/css/main.css';
import '../src/style/css/select2.min.css';
import '../src/style/css/slick.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
