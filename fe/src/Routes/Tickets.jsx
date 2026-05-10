import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import { IoTicketOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { message } from 'antd';

const Tickets = () => {
    const pageStatus = 3;
    const nav = useNavigate();

    const sessionKey = localStorage.getItem('sessionKey');
    const userId = sessionKey ? sessionKey.split('$')[1] : null;

    const [getting, setGetting] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [cancelModal, setCancelModal] = useState({ status: false, id: null });

    const fetchTickets = async () => {
        if (!userId) {
            setGetting(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/tickets/${userId}`);
            const result = await response.json();

            if (response.ok) {
                setTickets(result.data);
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            message.error('Server connection error!');
        } finally {
            setGetting(true);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [userId]);

    const onClickLogin = () => {
        nav('/login');
    };

    const onClickCloseModalCancel = () => {
        setCancelModal({ status: false, id: null });
    };

    const onClickCancelTicket = async () => {
        try {
            const response = await fetch(`http://localhost:8080/ticket/${cancelModal.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ isCanceled: true }),
            });

            if (response.ok) {
                message.success('Ticket canceled successfully');
                fetchTickets();
            } else {
                message.error('Failed to cancel ticket');
            }
        } catch (error) {
            console.error("Error canceling ticket:", error);
            message.error('Server error');
        } finally {
            onClickCloseModalCancel();
        }
    };

    const isTicketOutdated = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return true;
        const safeDateStr = dateStr.split('T')[0].replace(/-/g, '/');
        const ticketDateTime = new Date(`${safeDateStr} ${timeStr}`);
        return ticketDateTime < new Date();
    };

    return (
        <>
            <div className='min-h-screen pb-20'>
                <div className='w-full py-4 px-5 text-lg font-bold text-center relative text-white'>
                    <p>Tickets</p>
                </div>

                {(userId && getting) ? (
                    <div className='px-5 pb-5 flex flex-col gap-5'>
                        {tickets.length === 0 ? (
                            <div className='text-center text-white mt-10'>You haven't booked any tickets yet.</div>
                        ) : (
                            tickets.map(ticket => {
                                const movie = ticket.movieId;
                                const ticketId = ticket._id;

                                const onClickOpenModalCancel = () => {
                                    setCancelModal({ status: true, id: ticketId });
                                };
                                const onClickDetails = () => {
                                    nav(`/tickets/${ticketId}`);
                                };

                                return (
                                    <div key={ticketId} className='w-full shadow-2xl p-4 rounded-2xl border-b-2 border-r-2 border-gray-200 bg-purple-700 flex flex-col gap-5 text-white'>
                                        <div className='flex flex-row gap-5'>
                                            <div className='w-[70px] aspect-square rounded-xl overflow-hidden bg-gray-500 flex-shrink-0'>
                                                {movie?.image ? <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" /> : 'X'}
                                            </div>
                                            <div className='flex flex-col justify-between items-start'>
                                                <p className='text-lg font-bold'>{movie?.title || 'Movie not found'}</p>
                                                {ticket.isPaid ? (
                                                    <div className='py-1 px-2 bg-teal-200 rounded-md text-teal-800 text-sm font-semibold'>Status: Paid</div>
                                                ) : (
                                                    <div className='py-1 px-2 bg-red-200 rounded-md text-red-800 text-sm font-semibold'>Status: Unpaid</div>
                                                )}
                                            </div>
                                        </div>

                                        {ticket.isCanceled ? (
                                            <div className='w-full py-2 rounded-lg bg-gray-400 text-gray-800 font-semibold flex justify-center items-center'>
                                                Canceled
                                            </div>
                                        ) : (
                                            <div className='flex flex-row justify-between gap-3'>
                                                {isTicketOutdated(ticket.date, ticket.time) ? (
                                                    <div className='bg-gray-400 text-gray-800 font-semibold rounded-lg py-2 flex-1 text-center'>
                                                        Out of date
                                                    </div>
                                                ) : (
                                                    <button onClick={onClickOpenModalCancel} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 hover:bg-pink-400 rounded-lg py-2 flex-1 font-semibold transition-colors'>
                                                        Cancel
                                                    </button>
                                                )}
                                                <button onClick={onClickDetails} className='border-b-2 border-r-2 border-gray-200 bg-pink-700 hover:bg-pink-600 rounded-lg py-2 flex-1 font-semibold transition-colors'>
                                                    Details
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                ) : (
                    <div className='w-full h-[70vh] flex flex-col justify-center items-center text-xl gap-5 text-white'>
                        <div className='text-6xl text-pink-500'><IoTicketOutline /></div>
                        <div>Log in to see your tickets</div>
                        <button onClick={onClickLogin} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 hover:bg-pink-400 px-8 py-2 rounded-lg font-bold transition-colors'>
                            Log in
                        </button>
                    </div>
                )}

                <NavBar pageStatus={pageStatus} />
            </div>

            {cancelModal.status && (
                <div
                    onClick={onClickCloseModalCancel}
                    className='w-full h-full fixed z-[999] top-0 left-0 bg-black/70 flex justify-center items-center'
                >
                    <div onClick={(e) => e.stopPropagation()} className='bg-[#673191] text-white p-6 rounded-xl flex flex-col items-center gap-5 w-[90%] max-w-sm'>
                        <p className='font-semibold text-lg text-center'>Are you sure to cancel the ticket?</p>
                        <p className='text-pink-300 text-sm'>* This action can't be undone *</p>
                        <div className='flex flex-row justify-between w-full gap-5 mt-2'>
                            <button onClick={onClickCloseModalCancel} className='border-b-2 border-r-2 border-gray-200 bg-purple-900 hover:bg-purple-800 rounded-lg py-2 flex-1 font-semibold transition-colors'>
                                No
                            </button>
                            <button onClick={onClickCancelTicket} className='border-b-2 border-r-2 border-gray-200 bg-pink-500 hover:bg-pink-400 rounded-lg py-2 flex-1 font-semibold transition-colors'>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Tickets;