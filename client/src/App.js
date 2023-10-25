// import logo from './logo.svg';
import './App.css';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import AllUsers from './components/AllUsers';
import Login from './components/Login';
import NavBar from './components/Navbar/Navbar';
import Signup from './components/Signup';
import Auth from './components/Auth/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log("app-user = ",user);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/all" /> } />
        <Route path="/login-auth" element={!user ? <Auth /> : <Navigate  to="/all" />}/>
       
        <Route path="/all" element={<AllUsers /> } />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
