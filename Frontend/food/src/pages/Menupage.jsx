import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuHomepage from './menuHomepage';
import Footer from '../base/footer';
import Mainnav from '../base/Mainnav';

const Menupage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login", { replace: true }); // prevent back access
    }
  }, []);

  return (
    <>
      <Mainnav />
      <MenuHomepage />
      <Footer />
    </>
  );
};

export default Menupage;
