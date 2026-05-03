import React from 'react'
import { Navigate, useNavigate, Link } from 'react-router';
import { LeftOutlined } from '@ant-design/icons'
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdCancelPresentation } from "react-icons/md";

const PayReq = () => {
    const nav = useNavigate()
    const localStaff = localStorage.getItem("staffLogin")
    if (!localStaff) {
        return <Navigate to={"/staff"} />;
    }
    const onClickReturn = () => {
        history.back()
    }
    const [payments, setPayments] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/payReq')
            .then(response => response.json())
            .then(data => {
                data.reverse()
                setPayments(data);
            })
            .catch(error => {
                location.reload();
                console.error('Error fetching movies:', error);
            });
    }, [])
    const [tickets, setTickets] = React.useState([])
    React.useEffect(() => {
        fetch(`http://localhost:4000/tickets`)
            .then((response) => response.json())
            .then((data) => {
                setTickets(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])


    return (
        <div className='w-screen min-h-screen'>
            <div className='w-full py-4 px-5 text-lg font-bold text-center'>
                <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                <p>Payment request</p>
            </div>
            <div className='flex flex-col gap-3 p-5'>
                {payments.map((item) => {
                    const cancelPayment = async (e) => {
                        e.preventDefault()
                        await fetch(`http://localhost:4000/payReq/${item.id}`, {
                            method: "DELETE",
                        });
                        location.reload();
                    }
                    const acceptPayment = async (e) => {
                        e.preventDefault()
                        const ticket = tickets.find(ticket => ticket.id === item.id)
                        console.log(ticket)
                        await fetch(`http://localhost:4000/tickets/${item.id}`, {
                            method: "PUT",
                            header: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ...ticket,
                                paid: true,
                            }),
                        });
                        await fetch(`http://localhost:4000/payReq/${item.id}`, {
                            method: "DELETE",
                        });
                        location.reload();
                    }
                    return (
                        <>
                            <div className='bg-pink-800 p-3 rounded-lg flex flex-row justify-between items-center'>
                                <div className='flex flex-col text-lg '>
                                    <div>Ticket: {item.id}</div>
                                    <div>Total: ${item.price}</div>
                                    <Link to={`/staff/ticket/${item.id}`}><div className='bg-purple-600 text-center py-1 px-2 font-medium rounded-lg border-b-2 border-r-2 border-gray-300'>Detail</div></Link>
                                </div>
                                <div className='flex flex-row gap-3 items-center text-4xl'>
                                    <div onClick={cancelPayment}><MdCancelPresentation /></div>
                                    <div onClick={acceptPayment}><FaRegSquareCheck /></div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default PayReq