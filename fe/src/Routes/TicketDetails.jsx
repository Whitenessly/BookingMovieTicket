import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router';
import { QRCode, Space, message } from 'antd';
import QRCheckout from '/public/Screenshot 2025-08-01 153306.png';

const formatSeats = (seatsArray) => {
    if (!seatsArray || seatsArray.length === 0) return '';
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    return seatsArray.map(seatNumber => {
        const rowIndex = Math.floor((seatNumber - 1) / 8);
        const colIndex = ((seatNumber - 1) % 8) + 1;
        return `${rowLetters[rowIndex]}${colIndex}`;
    }).join(', ');
};

const TicketDetails = () => {
    const { id: ticketId } = useParams();
    const nav = useNavigate();
    if(localStorage.getItem('sessionKey') === null){
        nav('/login')
    }
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paidModel, setPaidModel] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ticket/details/${ticketId}`);
                const result = await response.json();

                if (response.ok) {
                    setTicket(result.data);
                } else {
                    message.error(result.message || "Không tìm thấy vé");
                }
            } catch (error) {
                console.error('Lỗi khi tải chi tiết vé:', error);
                message.error("Lỗi kết nối máy chủ");
            } finally {
                setLoading(false);
            }
        };

        fetchTicketDetails();
    }, [ticketId]);


    const onClickReturn = () => {
        nav(-1);
    };

    const submitPaid = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/payRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketId: ticket._id,
                    price: parseFloat(totalPrice)
                }),
            });

            setIsRequesting(true);
            setPaidModel(false);
        } catch (error) {
            console.error('Lỗi khi gọi API tạo yêu cầu thanh toán:', error);
            message.error("Lỗi kết nối máy chủ, vui lòng thử lại sau.");
        }
    };

    const isTicketOutdated = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return true;
        const safeDateStr = dateStr.split('T')[0].replace(/-/g, '/');
        const ticketDateTime = new Date(`${safeDateStr} ${timeStr}`);
        return ticketDateTime < new Date();
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (!ticket) return <div className="text-white text-center mt-20">Ticket not found</div>;

    const user = ticket.userId;
    const formattedSeats = formatSeats(ticket.seats);
    const totalPrice = ((ticket.seats.length * 49.98)).toFixed(2);

    return (
        <div className="text-white min-h-screen">
            <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
                <button onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-400 bg-gray-600/50 rounded-full px-3 py-2 transition-colors hover:bg-gray-500'>
                    <LeftOutlined />
                </button>
                <p>Ticket details</p>
            </div>

            <div className='w-full p-6 pb-20 '>
                <div className='border-2 border-pink-500/30 bg-purple-900/50 w-full shadow-2xl shadow-purple-500/20 rounded-2xl p-6 flex flex-col gap-10'>

                    <div className='bg-white p-2 rounded-xl self-center'>
                        <Space direction="vertical" align="center">
                            <QRCode value={ticket._id || '-'} size={250} color={'#BA19BD'} />
                        </Space>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div>
                            <p className='text-xl font-bold text-pink-400'>Name</p>
                            <p className='text-lg'>{user?.userName || 'N/A'}</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-xl font-bold text-pink-400'>Date</p>
                            <p className='text-lg'>{ticket.date}</p>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div>
                            <p className='text-xl font-bold text-pink-400'>Time</p>
                            <p className='text-lg'>{ticket.time}</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-xl font-bold text-pink-400'>Seat</p>
                            <p className='text-lg font-bold'>{formattedSeats}</p>
                        </div>
                    </div>

                    {ticket.movieId && (
                        <div className='border-t border-purple-500/30 pt-4'>
                            <p className='text-xl font-bold text-pink-400'>Movie</p>
                            <p className='text-lg'>{ticket.movieId.title}</p>
                        </div>
                    )}

                    <div className='bg-orange-200/90 text-orange-800 px-3 py-2 rounded-lg'>
                        <p className='text-lg font-bold'>Payment: At counter</p>
                        <p className='text-sm italic'>* Please come checkout before the movie starts</p>
                    </div>
                </div>
            </div>

            {!isTicketOutdated(ticket.date, ticket.time) && !ticket.canceled && (
                <div className='p-5 w-full fixed bottom-0 left-0'>
                    {ticket.isPaid ? (
                        <div className='border-b-2 border-r-2 border-teal-500 bg-teal-600 text-white font-bold text-2xl py-3 text-center rounded-lg shadow-lg'>
                            Paid Successfully
                        </div>
                    ) : isRequesting ? (
                        <div className='border-b-2 border-r-2 border-purple-500 bg-purple-600 text-white font-bold text-2xl py-3 text-center rounded-lg opacity-80 cursor-not-allowed'>
                            Requesting Verification Sent
                        </div>
                    ) : (
                        <button
                            onClick={() => setPaidModel(true)}
                            className='w-full border-b-2 border-r-2 border-pink-400 bg-pink-600 hover:bg-pink-500 text-white font-bold text-2xl py-3 text-center rounded-lg transition-colors shadow-lg shadow-pink-500/30'
                        >
                            Checkout Now
                        </button>
                    )}
                </div>
            )}

            {paidModel && (
                <div onClick={() => setPaidModel(false)} className='w-full h-full bg-black/80 fixed z-[999] top-0 left-0 flex items-end justify-center pb-0'>
                    <div onClick={(e) => e.stopPropagation()} className='bg-gradient-to-b from-[#673191] to-purple-900 w-full md:w-[500px] px-8 pt-4 pb-8 rounded-t-3xl flex flex-col items-center gap-6 animate-slide-up'>
                        <div className='bg-gray-400/50 w-[60px] h-[6px] rounded-full mb-2'></div>

                        <div className='w-full flex flex-row justify-between items-center bg-purple-800/50 p-4 rounded-2xl border border-purple-500/30'>
                            <div>
                                <p className='text-gray-300 font-semibold'>Total amount</p>
                                <p className='text-3xl font-bold text-pink-400'>$ {totalPrice}</p>
                            </div>
                            <div className='bg-white p-1 rounded-xl'>
                                <img src={QRCheckout} alt="QR Code" className='w-[100px] aspect-square object-cover rounded-lg' />
                            </div>
                        </div>

                        <div className='text-center text-pink-200 bg-pink-900/30 p-3 rounded-lg border border-pink-500/20'>
                            Scan the QR code to transfer. Once completed, press 'Request' for admin verification.
                        </div>

                        <button
                            onClick={submitPaid}
                            className='w-full border-b-2 border-r-2 border-pink-400 bg-pink-600 hover:bg-pink-500 text-white font-bold text-2xl py-3 rounded-xl transition-colors shadow-lg'
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;