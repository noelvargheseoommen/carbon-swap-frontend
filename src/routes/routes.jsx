import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import Swap from "../pages/swap/Swap";
import DashProfile from "../pages/Dashboard/DashProfile";
import About from "../pages/about";
import Liquidity from "../pages/liquidity";
import DashViewVehicles from "../pages/Dashboard/DashViewVehicles";
import DashAddVehicles from "../pages/Dashboard/DashAddVehicles";
import DashHistory from "../pages/Dashboard/DashHistory";

// Add your routes here.
// Use Link element from react-router to navigate to specific url. --see src/pages/Home/index.jsx (Swap Link)
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        // Render element at the url specified in the parent's path property.
        index: true,
        element: <Home />, // Element to render
      },
      {
        path: "/swap", // Url to render the component in element property.
        element: <Swap />,
      },
      {
        path: "/dashprofile", // Url to render the component in element property.
        element: <DashProfile />,
      },

      {
        path: "/about", // Url to render the component in element property.
        element: <About />,
      },

      {
        path: "/liquidity", // Url to render the component in element property.
        element: <Liquidity />,
      },

      {
        path: "/dashviewvehicles", // Url to render the component in element property.
        element: <DashViewVehicles />,
      },

      {
        path: "/dashaddvehicles", // Url to render the component in element property.
        element: <DashAddVehicles />,
      },

      {
        path: "/dashhistory", // Url to render the component in element property.
        element: <DashHistory />,
      },
    ],
  },
]);

export default router;
