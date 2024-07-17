import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Components/Home';
import Navbar from "./Components/Navbar";
import axios from 'axios';
import { useEffect, useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Recipes from "./Components/Recipes";

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() { // ? Fetching user from backend to display revelant pages
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const resp = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        }); // ! ARE WE USING BEARER TOKENS????
        console.log(resp)
        setUser(resp.data)
      }
    } catch (error) {
      console.error('Error fetching user', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}
