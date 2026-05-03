import React from 'react'
import { MdChair } from "react-icons/md";
import { LeftOutlined } from '@ant-design/icons'
import { DatePicker, Space } from 'antd';
import { Cascader } from 'antd';
import { useNavigate, useParams, Navigate } from 'react-router';
import Screen from '../../public/Screen.svg'

const Booking = () => {
    localStorage.removeItem("staffLogin")
    const userLocal = localStorage.getItem('userId')
    if (!userLocal) {
        return <Navigate to={"/login"} />;
    }
    const nav = useNavigate()
    const movieParam = useParams()
    const onClickReturn = () => {
        history.back()
    }
    const options = [
        {
            key: "1",
            value: '9:00 AM',
            label: '9:00 AM',
        },
        {
            key: "2",
            value: '11:00 AM',
            label: '11:00 AM',
        },
        {
            key: "3",
            value: '2:00 PM',
            label: '2:00 PM',
        },
        {
            key: "4",
            value: '5:00 PM',
            label: '5:00 PM',
        },
        {
            key: "5",
            value: '8:00 PM',
            label: '8:00 PM',
        },
    ];

    const [seats, setSeats] = React.useState(new Array(56).fill(999))
    if (seats[0] === 999) {
        for (let i = 0; i < seats.length; i++) {
            seats[i] = {
                at: i + 1,
                status: 0
            }
        }
    }

    const [selected, setSelected] = React.useState([])
    const [seatData, setSeatData] = React.useState({ at: null, status: null })
    if (seatData.at) {
        const updateSeats = [...seats]
        updateSeats[seatData.at - 1] = {
            at: seatData.at,
            status: seatData.status ? 0 : 1
        }
        setSeatData({ at: null, status: null });
        setSeats([...updateSeats])
        const updateSelected = []
        for (let i = 0; i < updateSeats.length; i++) {
            if (updateSeats[i].status === 1) {
                updateSelected.push(updateSeats[i].at)
            }
        }
        updateSelected.sort((a, b) => a - b)
        setSelected([...updateSelected])
    }

    const [time, setTime] = React.useState('')
    const onChangeTime = (value) => {
        setTime(value)
        setSeats(new Array(56).fill(999))
    };
    const [date, setDate] = React.useState('')
    const onChangeDate = (date, dateString) => {
        setDate(dateString)
        setSeats(new Array(56).fill(999))
    };

    const [tickets, setTickets] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/tickets')
            .then(response => response.json())
            .then(data => {
                setTickets(data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);
    const bookDateAndTime = tickets.filter(ticket => ticket.time === time[0] && ticket.date === date && ticket.canceled === false)
    const booked = bookDateAndTime.filter(ticket => ticket.movieId === parseInt(movieParam.id))
    const bookedSeats = booked.map((item) => {
        return item.seats
    })
    const seatsUnavailable = bookedSeats.flat(Infinity)
    for (let i = 0; i < seatsUnavailable.length; i++) {
        seats[seatsUnavailable[i] - 1] = {
            at: seatsUnavailable[i],
            status: -1
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (date && time[0] && selected.length) {
            e.preventDefault()
            const body = {
                userId: localStorage.getItem('userId'),
                movieId: parseInt(movieParam.id),
                ticketId: Date.now(),
                time: time[0],
                date: date,
                seats: selected,
                canceled: false,
                paid: false
            }
            await fetch("http://localhost:4000/tickets", {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });
            nav('/tickets')
        }
    }

    return (
        <>
            <div className='w-full h-screen flex flex-col justify-between'>
                <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
                    <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                    <p>Booking</p>
                </div>
                <div className='px-5 py-4 flex flex-col gap-12'>
                    <div className='w-full'>
                        <img src={Screen} alt="" />
                    </div>
                    <div className='w-full grid grid-cols-8 gap-2 text-4xl'>
                        {seats.map((seat) => {
                            const onClickSeat = () => {
                                setSeatData({ at: seat.at, status: seat.status })
                            }
                            if (date && time[0]) {
                                if (seat.status === 0) {
                                    return (
                                        <div onClick={onClickSeat} className='text-gray-400'>
                                            <MdChair />
                                        </div>
                                    )
                                } else if (seat.status === 1) {
                                    return (
                                        <div onClick={onClickSeat} className='text-teal-400'>
                                            <MdChair />
                                        </div>
                                    )
                                } else if (seat.status === -1) {
                                    return (
                                        <div className='text-pink-600'>
                                            <MdChair />
                                        </div>
                                    )
                                }
                            } else {
                                if (seat.status === 0) {
                                    return (
                                        <div className='text-gray-400'>
                                            <MdChair />
                                        </div>
                                    )
                                } 
                                else if (seat.status === 1) {
                                    return (
                                        <div className='text-teal-400'>
                                            <MdChair />
                                        </div>
                                    )
                                } else if (seat.status === -1) {
                                    return (
                                        <div className='text-pink-600'>
                                            <MdChair />
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                    <div className='flex flex-row justify-between text-lg'>
                        <div className='flex flex-row items-center gap-1'><span className='text-teal-400 text-2xl'><MdChair /></span>Selected</div>
                        <div className='flex flex-row items-center gap-1'><span className='text-pink-600 text-2xl'><MdChair /></span>Booked</div>
                        <div className='flex flex-row items-center gap-1'><span className='text-gray-400 text-2xl'><MdChair /></span>Available</div>
                    </div>
                </div>
                <div className='w-full py-5 rounded-3xl flex flex-col gap-7' style={{ background: 'linear-gradient(91deg,rgba(166, 16, 235, 1) 24%, rgba(224, 60, 230, 1) 94%)' }}>
                    <div className='font-bold text-xl w-full text-center'>Select date and time</div>
                    <div className='flex flex-row px-5 justify-between'>
                        <Cascader options={options} onChange={onChangeTime} placeholder="Select time" />
                        <Space direction="vertical">
                            <DatePicker onChange={onChangeDate} />
                        </Space>
                    </div>
                    <div className='flex flex-row justify-between px-6'>
                        <div className='flex flex-col'>
                            <p>Total price</p>
                            <p className='font-bold text-xl'>${((selected.length) * 4998/100)}</p>
                        </div>
                        <button onClick={onSubmit} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 flex items-center justify-center px-5 rounded-xl'>Confirm Seat</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Booking