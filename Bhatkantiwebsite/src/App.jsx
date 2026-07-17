import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import TourPackages from './pages/TourPackages'
import Contact from './pages/Contact'
import Destination from './pages/Destination'
import Booking from './pages/Booking'
import TourPackageDetails from './componant/TourPackageDetails'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/tour-packages' element={<TourPackages />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/tour-packages/:id" element={<TourPackageDetails />} />



      </Routes>

    </>
  )
}

export default App
