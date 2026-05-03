import React from 'react'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router'

const Item = (props) => {
    const nav = useNavigate()

    return (
        <div onClick={() => nav(`/movie/${props.movie.id}`)} className='bg-purple-500 item w-[150px] h-[250px] rounded-2xl flex flex-col shadow-2xl'>
            <div className='w-full h-3/4'>
                <img src={props.movie.image} alt={props.movie.title} className='w-full h-full object-cover rounded-xl' />
            </div>
            <div className='w-full h-1/4 pb-2 flex flex-col justify-between'>
                <div className='px-2 text-base h-24 w-full truncate font-semibold pt-1'>{props.movie.title}</div>
                <div className='px-2 w-full flex flex-row justify-between'>
                    <p>{props.movie.duration}m</p>
                    <p>{props.movie.rating} <span className='text-yellow-400'><StarFilled /></span></p>
                </div>
            </div>
        </div>
    )
}

export default Item