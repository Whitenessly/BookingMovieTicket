import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
    localStorage.removeItem("staffLogin")
    return (
        <div className='w-full h-screen flex flex-col gap-3 pt-10 items-center'>
            <img src="https://i.pinimg.com/736x/4a/20/88/4a2088896fdce876858ca85b4b3b8098.jpg" alt="Error" />
            <p className='text-xl font-semibold'>Error 404</p>
            <p className='text-xl font-semibold'>url not found </p>
            <Link to='/home'><div className='border-b-2 border-r-2 border-gray-200 bg-pink-500 text-xl px-5 py-3 rounded-lg'>Back to home</div></Link>
        </div>
    )
}

export default NotFound