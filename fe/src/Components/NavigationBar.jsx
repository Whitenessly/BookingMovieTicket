import React from 'react'
import { useNavigate } from 'react-router'

const NavigationBar = ({ page }) => {
    const navigate = useNavigate();

    return (
        <div className='w-screen fixed z-30 px-18 py-4 flex flex-row items-center justify-between bg-linear-to-b from-black '>
            <div className='flex flex-row items-center gap-2'>
                <img src="/Logo.svg" alt="StreamVibe Logo" className='w-[50px]'/>
                <div className='text-white text-2xl font-semibold'>Vomie</div>
            </div>
            <div  className='bg-slate-950 text-white flex flex-row items-center gap-4 p-2 rounded-2xl text-base'>
                <div onClick={() => navigate('/home')}  className={`py-2 px-5 rounded-lg ${page === "Home" ? 'bg-slate-900' : ''}`}>Home</div>
                <div onClick={() => navigate('/search')} className={`py-2 px-5 rounded-lg ${page === "Search" ? 'bg-slate-700' : ''}`}>Search</div>
                <div onClick={() => navigate('/movies')} className={`py-2 px-5 rounded-lg ${page === "Movies" ? 'bg-slate-700' : ''}`}>Movies</div>
                <div onClick={() => navigate('/support')} className={`py-2 px-5 rounded-lg ${page === "Support" ? 'bg-slate-700' : ''}`}>Support</div>
            </div>
            <div className='text-white flex flex-row items-center gap-4 text-base'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
        </div>
    )
}

export default NavigationBar