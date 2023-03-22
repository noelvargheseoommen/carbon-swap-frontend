import React from "react";
import ReactDOM from "react-dom/client";

import {
  ChakraProvider,
} from '@chakra-ui/react'


import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<ChakraProvider cssVarsRoot='#app'>
    <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
