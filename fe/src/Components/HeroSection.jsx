import React from "react";
import image0 from '../assets/HeroSectionBanner/image0.png'
import image1 from '../assets/HeroSectionBanner/image1.png'
import image2 from '../assets/HeroSectionBanner/image2.png'
import image3 from '../assets/HeroSectionBanner/image3.png'
import Abstract from '../assets/HeroSectionBanner/Abstract.png'
import { useNavigate } from 'react-router'

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col gap-5 w-screen relative">
                <div className="w-full"><img src={image0} alt="" className="w-full h-full object-cover" /></div>
                <div className="w-full"><img src={image1} alt="" className="w-full h-full object-cover" /></div>
                <div className="w-full"><img src={image2} alt="" className="w-full h-full object-cover" /></div>
                <div className="w-full"><img src={image3} alt="" className="w-full h-full object-cover" /></div>
                <div className="absolute top-0 left-0 w-full h-2/5 bg-linear-180 from-black/80 z-10" ></div>
                <div className="absolute bottom-0 left-0 w-full h-4/5 bg-linear-0 from-black/80 z-10" ></div>
                <img src={Abstract} alt="abstract" className="opacity-80 absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-sm" />
            </div>
            <div className="flex flex-col gap-6 items-center">
                <h1 className="text-6xl font-bold">The Best Booking Platform</h1>
                <div className="text-lg text-center max-w-5xl">
                    Vomie is the best booking platform for watching your favorite movies and shows on demand, anytime, anywhere. With Vomie, you can have a ton of great experiences with a wide variety of content, including the latest blockbusters, classic movies, and more. You can also create your own tickes, so you can easily find the content you want to book.
                </div>
                <button onClick={() => navigate('/movies')} className="flex flex-row gap-3 items-center bg-linear-to-r from-orange-500 to-orange-700 py-3 px-6 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-800 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                    <p>Start Booking Now</p>
                </button>
            </div>
        </>
    )
}

export default HeroSection;