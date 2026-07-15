import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import ContactPage from "../Pages/ContactPage";
import CatalogPage from "../Pages/Catalog/CatalogPage";
import ProductDetails from "../Pages/Catalog/ProductDetails";
import ErrorPage from "../Pages/Catalog/ErrorPage";
import ShoppingCartPage from "../Pages/Cart/ShoppingCartPage";
import LoginPage from "../Pages/Account/LoginPage";
import RegisterPage from "../Pages/Account/RegisterPage";
import ServerError from "../Error/ServerError";
import NotFound from "../Error/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "catalog/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <ShoppingCartPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);