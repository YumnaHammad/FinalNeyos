import FindChannel from "../pages/Partner/FindChannel";
import BecomePartner from "../pages/Partner/BecomePartner";
import ChannelPartner from "../pages/Partner/ChannelPartner";
import ProjectRegistration from "../pages/Partner/ProjectRegistration";
import IotCollaboration from "../pages/Partner/IotCollaboration";
import DeveloperPartner from "../pages/Partner/DeveloperPartner";
import TechnologyPartner from "../pages/Partner/TechnologyPartner";
import CCTVPartner from "../pages/Partner/CCTVPartner";

export const partnerRoutes = [
  { path: "/Partner/findChannel", element: <FindChannel/> },
  { path: "/Partner/channelPartner", element: <ChannelPartner/> },
  { path: "/Partner/projectRegistration", element: <ProjectRegistration/> },
  { path: "/Partner/iotCollaboration", element: <IotCollaboration/> },
  { path: "/Partner/developerPartner", element: <DeveloperPartner/> },
  { path: "/Partner/technologyPartner", element: <TechnologyPartner/> },
  { path: "/Partner/CCTVChannel", element: <CCTVPartner/> },
  { path: "/Partner/becomePartner", element: <BecomePartner /> },
];
