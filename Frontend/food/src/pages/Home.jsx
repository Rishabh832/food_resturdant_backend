import React from 'react'
import Nav from '../base/Nav'
import Footer from '../base/Footer'
import MainContent from '../base/MainContent'
import { ToastContainer, toast } from 'react-toastify'

const Home = () => {
  return (
    <div>
      <Nav/>
      <MainContent/>
      <Footer/>
      <ToastContainer
              position="top-center"
              autoClose={1000}/>
    </div>
  )
}

export default Home
