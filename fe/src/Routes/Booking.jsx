import React, { useState, useEffect } from 'react';
import { MdChair } from "react-icons/md";
import { LeftOutlined } from '@ant-design/icons';
import { DatePicker, Space, Cascader, message } from 'antd'; 
import { useNavigate, useParams } from 'react-router';
import Screen from '../assets/Screen.svg';

const generateInitialSeats = () => {
    return Array.from({ length: 56 }, (_, i) => ({
        at: i + 1,
        status: 0
    }));
};

const Booking = () => {
    const nav = useNavigate();
    const movieParam = useParams();

    const [seats, setSeats] = useState(generateInitialSeats());
    const [selected, setSelected] = useState([]); 
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);

    const options = [
        { key: "1", value: '8:00 AM', label: '8:00 AM' },
        { key: "2", value: '11:00 AM', label: '11:00 AM' },
        { key: "3", value: '2:00 PM', label: '2:00 PM' },
        { key: "4", value: '5:00 PM', label: '5:00 PM' },
        { key: "5", value: '8:00 PM', label: '8:00 PM' },
    ];

    useEffect(() => {
        if (!time || !date) return;

        const fetchBookedSeats = async () => {
            try {
                const response = await fetch(`http://localhost:8080/booked?movieId=${movieParam.id}&date=${date}&time=${time}`);
                const data = await response.json();

                if (response.ok) {
                    const bookedSeatsFromDB = data.bookedSeats || []; 

                    const updatedSeats = generateInitialSeats().map(seat => ({
                        ...seat,
                        status: bookedSeatsFromDB.includes(seat.at) ? -1 : 0
                    }));

                    setSeats(updatedSeats);
                    setSelected([]); 
                }
            } catch (error) {
                console.error('Error getting seats data', error);
                message.error("Failed getting seats data!");
            }
        };

        fetchBookedSeats();
    }, [time, date, movieParam.id]); 


    const onClickReturn = () => {
        nav(-1); 
    };

    const onChangeTime = (value) => {
        setTime(value ? value[0] : null);
    };

    const onChangeDate = (date, dateString) => {
        setDate(dateString);
    };

    const handleSeatClick = (seatIndex, currentStatus) => {
        if (!date || !time) {
            message.warning("Pick date and time first!");
            return;
        }

        if (currentStatus === -1) return;

        const newSeats = [...seats];

        newSeats[seatIndex].status = currentStatus === 1 ? 0 : 1;
        setSeats(newSeats);

        const updatedSelected = newSeats
            .filter(s => s.status === 1)
            .map(s => s.at);
        setSelected(updatedSelected);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (selected.length === 0) {
            return message.warning("Pick atleast 1 seat!");
        }

        try {
            const response = await fetch("http://localhost:8080/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('sessionKey').split('$')[1],
                    movieId: movieParam.id,
                    time: time,
                    date: date,
                    seats: selected
                }),
            });

            const result = await response.json();

            if (response.ok) {
                message.success('Booking sucessfully!');
                nav('/tickets');
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error("Error booking ticket", error);
            message.error('Server error');
        }
    };

    return (
        <div className='w-full h-screen flex flex-col justify-between overflow-x-hidden'>
            <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
                <button onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'>
                    <LeftOutlined />
                </button>
                <p>Booking</p>
            </div>

            <div className='px-5 py-4 flex flex-col gap-12'>
                <div className='w-full'>
                    <img src={Screen} alt="Màn hình" className="w-full" />
                </div>

                <div className='w-full grid grid-cols-8 gap-2 text-4xl cursor-pointer'>
                    {seats.map((seat, index) => {
                        let seatColor = 'text-gray-400';
                        if (seat.status === 1) seatColor = 'text-teal-400';
                        if (seat.status === -1) seatColor = 'text-pink-600';

                        return (
                            <div
                                key={`seat-${seat.at}`}
                                onClick={() => handleSeatClick(index, seat.status)}
                                className={`${seatColor} flex justify-center`}
                            >
                                <MdChair />
                            </div>
                        );
                    })}
                </div>

                <div className='flex flex-row justify-between text-lg'>
                    <div className='flex flex-row items-center gap-1'><span className='text-teal-400 text-2xl'><MdChair /></span>Selected</div>
                    <div className='flex flex-row items-center gap-1'><span className='text-pink-600 text-2xl'><MdChair /></span>Booked</div>
                    <div className='flex flex-row items-center gap-1'><span className='text-gray-400 text-2xl'><MdChair /></span>Available</div>
                </div>
            </div>

            <div className='w-full py-5 rounded-t-3xl flex flex-col gap-7' style={{ background: 'linear-gradient(91deg,rgba(166, 16, 235, 1) 24%, rgba(224, 60, 230, 1) 94%)' }}>
                <div className='font-bold text-xl w-full text-center text-white'>Select date and time</div>

                <div className='flex flex-row px-5 justify-between'>
                    <Cascader options={options} onChange={onChangeTime} placeholder="Select time" />
                    <Space direction="vertical">
                        <DatePicker onChange={onChangeDate} />
                    </Space>
                </div>

                <div className='flex flex-row justify-between px-6 pb-4 text-white'>
                    <div className='flex flex-col'>
                        <p>Total price</p>
                        <p className='font-bold text-xl'>${((selected.length) * 49.98).toFixed(2)}</p>
                    </div>
                    <button
                        onClick={onSubmit}
                        className='border-b-2 border-r-2 border-pink-700 bg-pink-500 hover:bg-pink-400 transition-colors flex items-center justify-center px-5 rounded-xl font-bold'
                    >
                        Confirm Seats
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Booking;