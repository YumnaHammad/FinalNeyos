import VideoSurveillance from "../pages/Solution/VideoSurveillance";
import CitySurvelience from "../pages/Solution/CitySurveillance";
import Healthcare from "../pages/Solution/Healthcare";
import Hotel from "../pages/Solution/Hotel";
import RetailSecurity from "../pages/Solution/RetailSecurity";
import SmartRestroom from "../pages/Solution/Smart_Restroom";
import SmartSpace from "../pages/Solution/SmartSpaces";
import SmartAppartment from "../pages/Solution/SmartApartment";
import DisplayControl from "../pages/Solution/DisplayControl";
import SmartParking from "../pages/Solution/SmartParking";
import IntelligentTrafficSolution from "../pages/Solution/Intelligent_Traffic_Solution";
import Manufacturing from "../pages/Solution/Manufacturing";
import Education from "../pages/Solution/Education";
import EnergyEfficiency from "../pages/Solution/EnergyEfficiency";
import IndoorAirQuality from "../pages/Solution/Indoor_Air_Quality"; 



export const solutionRoutes = [
  { path: "/solution/videoSurveillance", element: <VideoSurveillance /> },
  { path: "/solution/citySurveillance", element: <CitySurvelience/> },
  { path: "/solution/healthcare", element: <Healthcare/> },
  { path: "/solution/hotel", element: <Hotel /> },
  { path: "/solution/retailSecurity", element: <RetailSecurity /> },
  { path: "/solution/smartRestroom", element: <SmartRestroom /> },
  { path: "/solution/smartSpace", element: <SmartSpace /> },
  { path: "/solution/smartAppartment", element: <SmartAppartment /> },
  { path: "/solution/displayControl", element: <DisplayControl /> },
  { path: "/solution/smartParking", element: <SmartParking /> },
  {
    path: "/solution/IntelligentTrafficSolution",
    element: <IntelligentTrafficSolution />,
  },
  { path: "/solution/Manufacturing", element: <Manufacturing /> },
  { path: "/solution/Education", element: <Education /> },
  { path: "/solution/IndoorAirQuality", element: <IndoorAirQuality /> },
  { path: "/solution/EnergyEfficiency", element: <EnergyEfficiency /> },
];
