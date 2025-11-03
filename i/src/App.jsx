import React from 'react'
import { createBrowserRouter, RouterContextProvider, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './pages/home/home'
import About from './pages/about/about'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'about/:id',
          element: <About />
        },
      ]
      }
    ])
    return (
      <div>
        <RouterProvider router={router}/>
      </div>
  )
}

export default App