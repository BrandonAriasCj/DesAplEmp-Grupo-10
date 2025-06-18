import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SeriePage from "./pages/SeriePage.jsx"
import SerieFormPage from './pages/series/SerieFormPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CategoryFormPage from './pages/category/CategoryFormPage.jsx';
import CategoryEditFormPage from './pages/category/CategoryEditFormPage.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import AuthProvider from './components/AuthProvider.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <Routes>
          <Route path= "/" element={<LoginPage/>}/>
    
          <Route path= "/home" element={ <AuthProvider><HomePage/> </AuthProvider>}/>
          <Route path= "/series" element={<AuthProvider><SeriePage/> </AuthProvider>} />
          <Route path= "/categories" element={<AuthProvider><CategoryPage/> </AuthProvider>} />
          <Route path="/categories/new" element={<AuthProvider><CategoryFormPage/> </AuthProvider>}/>
          <Route path='/categories/edit/:cod' element={<AuthProvider><CategoryEditFormPage /> </AuthProvider>}/>
          <Route path= "/series/new" element={<AuthProvider><SerieFormPage/> </AuthProvider>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App
