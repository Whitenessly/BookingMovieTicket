import React from 'react'
import NavBar from '../Components/NavBar'
import { MdLogout } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { IoIosSettings } from "react-icons/io";
import { BiSupport } from "react-icons/bi";

const User = () => {
    localStorage.removeItem("staffLogin")
    const nav = useNavigate()
    const userLocal = localStorage.getItem('userId')
    const pageStatus = 4
    const [user, setUser] = React.useState([]);
    if (userLocal) {
        React.useEffect(() => {
            fetch(`http://localhost:4000/users/${userLocal}`)
                .then((response) => response.json())
                .then((data) => {
                    setUser(data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }, [])
    }
    const onClickLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("staffLogin")
        nav('/home')
    }
    const onClickLogin = () => {
        nav('/login')
    }

    return (
        <div className='h-screen'>
            {(userLocal) ?
                <div className='p-7 pb-23 h-full flex flex-col justify-between'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-2xl font-semibold'>Hello, {user.username}</p>
                        <div className='w-full flex flex-row justify-center py-5'>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className='w-[100px] aspect-square rounded-full'/>
                        </div>
                        <div className='w-full flex flex-row font-semibold items-center gap-2 text-xl bg-purple-700 py-3 pl-3 rounded-lg'><IoIosSettings />Account settings</div>
                        <div className='w-full flex flex-row font-semibold items-center gap-2 text-xl bg-purple-700 py-3 pl-3 rounded-lg'><BiSupport />Help & support</div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {(user.role === 'staff') ?
                            <Link to='/staff'><div className='w-full flex flex-row justify-center items-center gap-3 text-2xl border-b-2 border-r-2 border-gray-200 bg-pink-500 py-3 rounded-lg'>Staff Mode <FaArrowRight /></div></Link>
                            : null
                        }
                        <div onClick={onClickLogout} className='w-full flex flex-row justify-center items-center gap-3 text-2xl border-b-2 border-r-2 border-gray-200 bg-pink-500 py-3 rounded-lg'><MdLogout /> Logout</div>
                    </div>
                </div>
                :
                <div className='p-7 flex flex-col gap-5 w-full h-[500px] justify-center items-center'>
                    <p className='text-2xl font-semibold'>No account login</p>
                    <div onClick={onClickLogin} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 px-5 py-2 rounded-lg'>Log in</div>
                </div>
            }
            <NavBar pageStatus={pageStatus} />
        </div>
    )
}

export default User