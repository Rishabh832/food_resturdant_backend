import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';        
import 'react-toastify/dist/ReactToastify.css';  

import PrivateRoute from './components/PrivateRoute';
import SignupForm from './components/signupForm';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import Adminpannel from './Admin/Adminpannel';
import Menupage from './pages/Menupage';
import Addtocart from './cart/Addtocart';
import Viewcart from './cart/Viewcart';
import AddProfile from './Profile/Addprofile';
import UserProfile from './Profile/UserProfile';
import OrderHistory from './order_success/Order_history';
import Editprofile from './Profile/Editprofile';
import Aboutus from './pages/Aboutus';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<Adminpannel/>} />
        <Route path="/menu" element={<PrivateRoute> <Menupage/> </PrivateRoute>} />
        <Route path="/addcart" element={<PrivateRoute><Addtocart/></PrivateRoute> } />
        <Route path="/about" element={<PrivateRoute><Aboutus/></PrivateRoute> } />
        <Route path="/viewcart" element={<PrivateRoute> <Viewcart/> </PrivateRoute>} />
        <Route path="/addprofile" element={<PrivateRoute><AddProfile/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
        <Route path="/myorders" element={<PrivateRoute><OrderHistory/></PrivateRoute>} />
        <Route path="/edit" element={<PrivateRoute><Editprofile/></PrivateRoute>} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>

  );
}

export default App;
