import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Navbar1 from './components/navbar1';
import Home from './components/Home';
import Attendance from './components/Attendance';
import About from './components/About';
import Preloader from './components/Preloader';
import Login from './components/Logging';
import Signin from './components/Signin';
import Register from './components/Register';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';

// Layout component that conditionally renders the appropriate navbar
function AppLayout({ isLoggedIn }) {
  const location = useLocation();
  const authPages = ['/signin', '/register', '/resetpassword'];
  const shouldShowNavbar1 = authPages.includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {shouldShowNavbar1 ? <Navbar1 /> : <Navbar />}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoading) return <Preloader />;
  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <AppLayout isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;