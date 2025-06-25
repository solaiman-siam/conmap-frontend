import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import { ConfigProvider } from "antd";
import { customTheme } from "./utils/customAntd";
import StateContextProvider from "./context/StateContext/StateContextProvider";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()


createRoot(document.getElementById("root")).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={customTheme}>
     <StateContextProvider>
     <RouterProvider router={router}></RouterProvider>
     </StateContextProvider>
    </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
