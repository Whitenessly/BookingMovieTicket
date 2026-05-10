import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { GrTicket } from "react-icons/gr";
import { BookOutlined, BookFilled, HomeOutlined, HomeFilled } from "@ant-design/icons"
import { Link } from 'react-router';

const NavBar = (props) => {
  return (
    <div className='w-full fixed z-10 bottom-0 flex flex-row items-center justify-around font-bold text-2xl pt-2 pb-4' style={{ background: 'linear-gradient(91deg,rgba(166, 16, 235, 1) 24%, rgba(224, 60, 230, 1) 94%)' }}>
      <div className='flex flex-col items-center'>
        <Link to="/home">{(props.pageStatus === 1) ? <HomeFilled /> : <HomeOutlined />}</Link>
        <div className='text-sm'>Home</div>
      </div>
      <div className='flex flex-col items-center'>
        <Link to="/movies">{(props.pageStatus === 2) ? <BookFilled /> : <BookOutlined />}</Link>
        <div className='text-sm'>Movies</div>
      </div>
      <div className='flex flex-col items-center'>
        <Link to="/tickets">{(props.pageStatus === 3) ? <FaTicketAlt /> : <GrTicket />}</Link>
        <div className='text-sm'>Tickets</div>
      </div>
      <div className='flex flex-col items-center'>
        <Link to='/user'>{(props.pageStatus === 4) ? <FaCircleUser /> : <FaRegUserCircle />}</Link>
        <div className='text-sm'>User</div>
      </div>
    </div>
  )
}

export default NavBar