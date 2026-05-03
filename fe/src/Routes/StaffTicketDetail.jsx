import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router';

const StaffTicketDetail = () => {
    const nav = useNavigate()
    const localStaff = localStorage.getItem("staffLogin")
    if (!localStaff) {
        return <Navigate to={"/staff"} />;
    }
    const onClickReturn = () => {
        history.back()
    }

    const ticketParam = useParams()
    const [ticket, setTicket] = React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:4000/tickets/${ticketParam.id}`)
            .then(response => response.json())
            .then(data => {
                setTicket(data)
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            })
    }, []);
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:4000/users`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    const user = users.find(user => user.id === ticket.userId)
    const seats = ticket.seats
    if (seats) {
        for (let i = 0; i < seats.length; i++) {
            (seats[i] > 48) ? seats[i] = `G${seats[i] % 48} ` : (seats[i] > 40) ? seats[i] = `E${seats[i] % 40} ` : (seats[i] > 32) ? seats[i] = `F${seats[i] % 32} ` : (seats[i] > 24) ? seats[i] = `D${seats[i] % 24} ` : (seats[i] > 16) ? seats[i] = `C${seats[i] % 16} ` : (seats[i] > 8) ? seats[i] = `B${seats[i] % 8} ` : (seats[i] > 0) ? seats[i] = `A${seats[i]} ` : null
        }
    }
    const [movies, setMovies] = React.useState([]);
    if (ticket) {
        React.useEffect(() => {
            fetch(`http://localhost:4000/movies`)
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }, [])
    }

    return (
        <>
            {(user && ticket) ?
                <div className='w-screen h-screen'>
                    <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
                        <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                        <p>Ticket details</p>
                    </div>
                    <div className='w-full fixed -z-10 top-0 p-6 pt-18'>
                        <div className='border-2 border-gray-200 w-full h-full shadow-2xl rounded-2xl p-6 flex flex-col gap-8'>
                            <div className='text-xl'><span className='font-bold'>Ticket:</span> {ticketParam.id}</div>
                            <div className='flex flex-col gap-1'>
                                <div className='text-xl'><span className='font-bold'>Name:</span> {user.username}</div>
                                <div className='text-xl'><span className='font-bold'>Email:</span> {user.email}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                {movies.map((movie)=>{
                                    if (movie.id === `${ticket.movieId}`){
                                        return (
                                            <div className='text-xl'><span className='font-bold'>Title:</span> {movie.title}</div>
                                        )
                                    }
                                })}
                                <div className='text-xl'><span className='font-bold'>Time:</span> {ticket.time}</div>
                                <div className='text-xl'><span className='font-bold'>Date:</span> {ticket.date}</div>
                                <div className='text-xl'><span className='font-bold'>Seat:</span> {seats}</div>
                                <div className='text-xl flex flex-row gap-2 items-center'>
                                    <div className='font-bold'>Status:</div>
                                    {(ticket.canceled) ?
                                        <div className='py-1 px-2 bg-gray-300 rounded-md text-gray-700'>Canceled</div>
                                        :
                                        <>
                                            {(ticket.paid) ?
                                                <div className='py-1 px-2 bg-teal-200 rounded-md text-teal-600'>Paid</div>
                                                :
                                                <div className='py-1 px-2 bg-red-200 rounded-md text-red-600'>Unpaid</div>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default StaffTicketDetail