import React , {useState, useEffect} from 'react'
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
//import toastify
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
//get currentUser function
import { getCurrentUser } from './services/AuthService'
//import Protected component
import ProtectedRoute from './components/common/protectedRoutes'

const App = () => {
  const [user, setUser] = useState({});
  
  // Getting current user after logins
  useEffect(() => {
    const user = getCurrentUser();
    setUser((user as any));
  }, 
  []);

  return (
    <div className="overflow-hidden  container">
        {/* Register Routes and Components */}
        <Router>
        <ToastContainer />
          <NavBar user={user} />
          <Routes>
            <Route path='/' element={<Home user={user} />}/>
            {/* Protect this route(/books/new) and redirect to /login when user is not logged in*/}
            <Route path="/books/:id" element={<ProtectedRoute element={<BooksForm />} />} />
            <Route path='/books' element={<Home user={user} />}/>
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
