import { createBrowserRouter } from "react-router";
import Home from "../pages/public/Home";
import MainLayout from "../layouts/MainLayout";
import Pricing from "../pages/Pricing/Pricing";
import BuyCredit from "../pages/BuyCredit/BuyCredit";
import Payment from "../pages/PaymentMethod/Payment";
import MapPage from "../pages/public/MapPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotPass from "../pages/auth/ForgotPass";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotVerifyOtp from "../pages/auth/ForgotVerifyOtp";
import Checkout from "../pages/Checkout/Checkout";
import MapAutocomplete from "../pages/Test/MapAutocomplete";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: '/map-autocomplete',
        element: <MapAutocomplete/>

      },
      // {
      //   path: "/buy-credit",
      //   element: <BuyCredit />,
      // },
      // {
      //   path: "/payment",
      //   element: <Payment />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/otp",
        element: <VerifyOtp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPass />,
      },
      {
        path: "/forgot-verify-otp",
        element: <ForgotVerifyOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
    ],
  },
]);
