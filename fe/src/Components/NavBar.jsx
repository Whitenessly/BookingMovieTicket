import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router';

const NavBar = (props) => {
  return (
    <div className='w-full fixed z-10 bottom-0 flex flex-row items-center justify-around font-bold text-2xl pt-2 pb-4' style={{ background: 'linear-gradient(91deg,rgba(166, 16, 235, 1) 24%, rgba(224, 60, 230, 1) 94%)' }}>
      <Link to="/home">{(props.pageStatus === 1) ? <div className='border-b-2 border-r-2 border-gray-200 bg-pink-500 rounded-full px-3 py-3 gap-1 text-white flex flex-row items-center'><IoHome /></div> : <IoHome />}</Link>
      <Link to="/search">{(props.pageStatus === 2) ? <div className='border-b-2 border-r-2 border-gray-200 bg-pink-500 rounded-full px-3 py-3 gap-1 text-white flex flex-row items-center'><FaSearch /></div> : <FaSearch />}</Link>
      <Link to="/tickets">{(props.pageStatus === 3) ? <div className='border-b-2 border-r-2 border-gray-200 bg-pink-500 rounded-full px-3 py-3 gap-1 text-white flex flex-row items-center'><FaTicketAlt /></div> : <FaTicketAlt />}</Link>
      <Link to='/user'>{(props.pageStatus === 4) ? <div className='border-b-2 border-r-2 border-gray-200 bg-pink-500 rounded-full px-3 py-3 gap-1 text-white flex flex-row items-center'><FaCircleUser /></div> : <FaCircleUser />}</Link>
    </div>
  )
}

export default NavBar