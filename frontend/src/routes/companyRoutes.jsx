import AboutUs from "../pages/Company/About";
import Brand from "../pages/Company/Brand";
import Events from "../pages/Company/Events";
import Blog from "../pages/Company/BlogPage";
import BlogDetailPage from "../pages/Company/BlogDetailPage";
import News from "../pages/Company/News";
import NewsDetailPage from "../pages/Company/NewsDetailPage";

export const companyRoutes = [
  { path: "/company/aboutUs", element: <AboutUs/> },
  { path: "/company/ourBrand", element: <Brand/> },
  { path: "/company/events", element: <Events/> },
  { path: "/company/blog", element: <Blog/> },
  { path: "/company/blog/:slug", element: <BlogDetailPage/> },
  { path: "/company/news", element: <News/> },
  { path: "/company/news/:slug", element: <NewsDetailPage/> },
];
