
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router'
import { router } from './Router/Route.tsx'
import { CartContextProvider } from './Context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
    <CartContextProvider>
    <RouterProvider router={router} />
    </CartContextProvider>
)
