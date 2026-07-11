
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router'
import { router } from './Router/Route.tsx'
import { CartContextProvider } from './Context/CartContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    //Bunun altında ki tüm componentlere erişecek 
    <Provider store={store}> 
        <CartContextProvider>
            <RouterProvider router={router} />
        </CartContextProvider>
    </Provider>

)
