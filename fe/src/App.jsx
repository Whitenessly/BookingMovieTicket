import './App.css'
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import Home from './Routes/Home';
import Search from './Routes/Search'
import Movies from './Routes/Movies';
import MovieDetail from './Routes/MovieDetail';
import Booking from './Routes/Booking'
import Tickets from './Routes/Tickets'
import TicketDetails from './Routes/TicketDetails';
import User from './Routes/User'
import NotFound from './Routes/NotFound';
import Staff from './Routes/Staff';
import HighestRating from './Routes/HighestRating';
import StaffHome from './Routes/StaffHome';
import PayReq from './Routes/PayReq';
import Scanner from './Routes/Scanner';
import StaffTicketDetail from './Routes/StaffTicketDetail';
import AddStaff from './Routes/AddStaff';

function App() {

  return (
    <div>
      <Routes>
        <Route path='' element={<Navigate to={'/home'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/rating' element={<HighestRating />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/booking/:id' element={<Booking />} />
        <Route path='/tickets' element={<Tickets />} />
        <Route path='/tickets/:id' element={<TicketDetails />} />
        <Route path='/user' element={<User />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/staff/home' element={<StaffHome />} />
        <Route path='/staff/req' element={<PayReq />} />
        <Route path='/staff/scan' element={<Scanner />} />
        <Route path='/staff/ticket/:id' element={<StaffTicketDetail />} />
        <Route path='/staff/add' element={<AddStaff />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
