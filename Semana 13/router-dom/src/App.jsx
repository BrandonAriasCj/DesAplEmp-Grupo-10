import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SeriePage from "./pages/SeriePage.jsx"
import SerieFormPage from './pages/SerieFormPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CategoryFormPage from './pages/category/CategoryFormPage.jsx';
import CategoryEditFormPage from './pages/category/CategoryEditFormPage.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<LoginPage/>}/>
        <Route path= "/home" element={<HomePage/>}/>
        <Route path= "/series" element={<SeriePage/>} />
        <Route path= "/categories" element={<CategoryPage/>} />
        <Route path='categories/edit/id' element={<CategoryEditFormPage />}/>
        <Route path= "/serie/edit/:idserie" element={<SerieFormPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
