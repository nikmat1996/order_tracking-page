import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import ThemeOne from './pages/ThemeOne'
import ThemeTwo from './pages/ThemeTwo'
import ThemeThree from './pages/ThemeThree'
import OrderDetails from './components/OrderDetails'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />} >
    <Route path='' element={<ThemeOne />} >
      <Route path=':orderId' element={<OrderDetails />} />
    </Route>
    <Route path='themeTwo' element={<ThemeTwo />} />
    <Route path='themeThree' element={<ThemeThree />} />
  </Route>
))

const App = () => <RouterProvider router={router} />

export default App
