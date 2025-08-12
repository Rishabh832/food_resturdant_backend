import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuHomepage from './MenuHomepage';
import Footer from '../base/Footer';
import Mainnav from '../base/Mainnav';

const Menupage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login", { replace: true });
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
