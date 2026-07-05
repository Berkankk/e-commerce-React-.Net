import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import CatalogPage from "../Pages/Catalog/CatalogPage";
import ProductDetails from "../Pages/Catalog/ProductDetails";
import ContactPage from "../Pages/ContactPage";
import ErrorPage from "../Pages/Catalog/ErrorPage";
import ServerError from "../Error/ServerError";
import NotFound from "../Error/NotFound";


//Const değişken tanımlarken sonradan değiştirilemeyecek bir değişken tanımlamak için kullanılır.
// let ise değiştirilebilir bir değişken tanımlamak için kullanılır.
export const router = createBrowserRouter([
    {
    path: "/", //localhost:3000/ bu path ile açılır
    element: <App />, //Ana şablon app olur burada
    children: [ //children ile alt sayfalar tanımlanır
        {path: "/", element: <HomePage />},
        {path: "/about", element: <AboutPage />},
        {path: "/contact", element: <ContactPage />},
        {path: "/catalog", element: <CatalogPage />},
        {path:  "catalog/:id", element: <ProductDetails />}, //:id ile dinamik bir parametre tanımlanır
        {path: "/error", element: <ErrorPage /> },
        {path: "/server-error", element: <ServerError /> },
        {path: "/not-found", element:<NotFound/>},
        {path: "*", element:<NotFound/>}
    ]
    }
])
