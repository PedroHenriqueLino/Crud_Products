import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//rotas
import ProdutosPage from './routes/ProdutosPage.jsx'
import CategoriesPage from './routes/CategoriesPage.jsx'
import RelatorioPages from './routes/RelatorioPage.jsx'
import ConfigPage from './routes/ConfigPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      {
        path: '/',
        element: <ProdutosPage />
      },
      {
        path: '/categories',
        element: <CategoriesPage />
      },
      {
        path: '/relatorio',
        element: <RelatorioPages />
      },
      {
        path: '/configuracoes',
        element: <ConfigPage />
      }
    ]
  }
])

//Context
import { ProductContextProvider } from './Context/ProductContext.jsx'
import { ThemeContextProvider } from './Context/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <ProductContextProvider >
        <RouterProvider router={router} />
      </ProductContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
