
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router'
import { router } from './Router/Route.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
