import React from 'react'
import { Navigate, useNavigate, Link } from 'react-router';
import { IoMdClose } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { LuTicketCheck } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";

const StaffHome = () => {
    const nav = useNavigate()
    const localStaff = localStorage.getItem("staffLogin")
    if (!localStaff) {
        return <Navigate to={"/staff"} />;
    }
    const onClickReturn = () => {
        localStorage.removeItem("staffLogin")
        nav('/home');
    }

    return (
        <div className='w-screen h-screen'>
            <div className='w-full py-4 px-5 text-lg font-bold text-center'>
                <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-3'><IoMdClose /></p>
                <p>Staff Home</p>
            </div>
            <div className='flex flex-col gap-3 p-5'>
                <Link to={'/staff/req'}><div className='w-full flex flex-row font-semibold items-center gap-2 text-xl bg-purple-700 py-3 pl-3 rounded-lg'><MdOutlinePayment />Payment request</div></Link>
                <Link to={'/staff/scan'}><div className='w-full flex flex-row font-semibold items-center gap-2 text-xl bg-purple-700 py-3 pl-3 rounded-lg'><LuTicketCheck />Ticket Scan</div></Link>
                <Link to={'/staff/add'}><div className='w-full flex flex-row font-semibold items-center gap-2 text-xl bg-purple-700 py-3 pl-3 rounded-lg'><FaUserPlus />Add staff</div></Link>
            </div>
        </div>
    )
}

export default StaffHome