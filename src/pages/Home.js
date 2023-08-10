import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import MainPage from '../components/MainPage/MainPage';
import Testimonials from '../components/Testimonials';
import FeedbackForm from '../components/FeedbackForm';
const Home = () => {
  return (
    <div>
      <Header/>
      <MainPage/>
      <Testimonials/>
      <FeedbackForm/>
      <Footer/>
    </div>
  )
}

export default Home
