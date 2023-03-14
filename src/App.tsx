import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import pages
import Home from './pages/Home'
import BooksForm from './pages/BooksForm'
import NotFound from './pages/NotFound'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Logout from './pages/Logout'
//import Components
import NavBar from './components/NavBar'


const App = () => {
  return (
    <div className="overflow-hidden  container">
        {/* Register Routes and Components */}
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/books/:id' element={<BooksForm />}/>
            <Route path='/books' element={<Home />}/>
            <Route path='/register' element={<RegisterForm />}/>
            <Route path='/login' element={<LoginForm />}/>
            <Route path='/logout' element={<Logout />}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
