import AboutUs from "../pages/Company/About";
import Brand from "../pages/Company/Brand";
import Events from "../pages/Company/Events";
import Blog from "../pages/Company/BlogPage";
import News from "../pages/Company/News";   

export const companyRoutes = [
  { path: "/company/aboutUs", element: <AboutUs/> },
  { path: "/company/ourBrand", element: <Brand/> },
  { path: "/company/events", element: <Events/> },
  { path: "/company/blog", element: <Blog/> },
  { path: "/company/news", element: <News/> },
];
