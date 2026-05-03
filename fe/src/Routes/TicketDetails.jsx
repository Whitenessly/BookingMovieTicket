import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useParams, Navigate } from 'react-router'
import { Input, QRCode, Space } from 'antd';
import QRCheckout from '/public/Screenshot 2025-08-01 153306.png'


const TicketDetails = () => {
    localStorage.removeItem("staffLogin")
    const userLocal = localStorage.getItem('userId')
    if (!userLocal) {
        return <Navigate to={"/login"} />;
    }
    const ticketParam = useParams()
    // console.log(ticket)

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
    const [paidModel, setPaidModel] = React.useState(false)
    const onClickOpenPaid = () => {
        setPaidModel(true)
    }
    const onClickClosePaid = () => {
        setPaidModel(false)
    }
    const [request, setRequest] = React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:4000/payReq`)
            .then((response) => response.json())
            .then((data) => {
                setRequest(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    const req = request.find(item => item.id === `${ticketParam.id}`)

    const submitPaid = async (e) => {
        e.preventDefault()
        const body = {
            price: `${(ticket.seats.length * 4998) / 100}`,
            id: `${ticketParam.id}`,
        }
        console.log(body)
        await fetch("http://localhost:4000/payReq", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        location.reload();
    }

    const onClickReturn = () => {
        history.back()
    }
    const [text, setText] = React.useState(`${ticketParam.id}`);
    return (
        <>
            {(user && ticket) ?
                <div>
                    <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
                        <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                        <p>Ticket details</p>
                    </div>
                    <div className='w-full fixed -z-10 top-0 p-6 pt-18'>
                        <div className='border-2 border-gray-200 w-full h-full shadow-2xl rounded-2xl p-6 flex flex-col gap-10'>
                            <div className='bg-white p-2 rounded-xl '>
                                <Space direction="vertical" align="center">
                                    <QRCode value={text || '-'} size={275} color={'#BA19BD'} />
                                </Space>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-xl font-bold'>Name</p>
                                    <p className='text-lg'>{user.username}</p>
                                </div>
                                <div>
                                    <p className='text-xl font-bold'>Date</p>
                                    <p className='text-lg'>{ticket.date}</p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <p className='text-xl font-bold'>Time</p>
                                    <p className='text-lg'>{ticket.time}</p>
                                </div>
                                <div>
                                    <p className='text-xl font-bold'>Seat</p>
                                    <p className='text-lg'>{seats}</p>
                                </div>
                            </div>

                            <div className='bg-orange-200 text-orange-600 px-1 rounded-lg'>
                                <p className='text-xl font-semibold'>Payment: At counter</p>
                                <p className='text-lg'>* Please come checkout before the time of the movie</p>
                            </div>
                        </div>
                    </div>
                    {(new Date(ticket.date) > Date.now() && (!ticket.canceled)) ?
                        <div className='p-5 w-screen fixed bottom-0'>
                            {(ticket.paid) ?
                                <div className='border-b-2 border-r-2 border-gray-200 bg-purple-700 text-purple-200 text-2xl py-3 text-center rounded-lg'>Paid</div>
                                :
                                <>
                                    {(req) ?
                                        <div className='border-b-2 border-r-2 border-gray-200 bg-pink-700 text-purple-200 text-2xl py-3 text-center rounded-lg'>Requesting...</div>
                                        :
                                        <div onClick={onClickOpenPaid} className='border-b-2 border-r-2 border-gray-200 bg-pink-700 text-purple-200 text-2xl py-3 text-center rounded-lg'>Checkout</div>
                                    }
                                </>
                            }
                        </div>
                        :
                        null
                    }
                </div>
                :
                null
            }
            {(paidModel) ?
                <div onClick={onClickClosePaid} className='w-screen h-screen bg-black/70 fixed z-10 top-0'>
                    <div className='bg-purple-900/90 fixed bottom-0 w-screen px-8 pt-2 pb-8 rounded-xl flex flex-col items-center gap-4'>
                        <div className='bg-gray-400/70 w-[100px] h-[5px] rounded-lg'></div>
                        <div className='w-full flex flex-row justify-between'>
                            <div>
                                <p className='text-lg font-bold'>Total:</p>
                                <p className='text-lg'>$ {(ticket.seats.length * 4998) / 100}</p>
                            </div>
                            <img src={QRCheckout} alt="" className='w-[150px] aspect-square' />
                        </div>
                        <div className='text-lg text-center text-pink-200'>Please banking and press request to have the admin to check the bill</div>
                        <div onClick={submitPaid} className='border-b-2 border-r-2 border-gray-200 bg-pink-700 text-purple-200 text-2xl py-3 text-center rounded-lg w-full'>Request</div>
                    </div>
                </div>
                : null
            }
        </>


    )
}

export default TicketDetails