import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router';
import { MdAdd } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const AddStaff = () => {
    const nav = useNavigate()
    const onClickReturn = () => {
        history.back()
    }

    const [users, setUsers] = React.useState([])
    React.useEffect(() => {
        fetch(`http://localhost:8080/users`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <>
            <div className='w-screen h-screen'>
                <div className='w-full py-4 px-5 text-lg font-bold text-center relative'>
                    <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                    <p>Ticket details</p>
                </div>
                <div className='w-full px-8 py-3 flex flex-col gap-2'>
                    <p className='text-xl font-bold'>Staff:</p>
                    <div className='flex flex-col gap-3'>
                        {users.map((user) => {
                            if (user.role === 'staff') {
                                return (
                                    <div className='bg-pink-800/70 text-lg px-5 py-3 rounded-lg'>
                                        <div>User ID: {user._id}</div>
                                        <div>Name: {user.userName}</div>
                                        <div>Email: {user.email}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <p className='text-xl font-bold'>Users:</p>
                    <div className='flex flex-col gap-3'>
                        {users.map((user) => {
                            if (user.role !== 'staff') {
                                const onSubmit = async (e) => {
                                    e.preventDefault()

                                    await fetch(`http://localhost:8080/user/${user._id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                        }
                                    })
                                    location.reload()
                                }
                                return (
                                    <div className='bg-pink-800/70 text-lg px-5 py-3 rounded-lg flex flex-row justify-between items-center'>
                                        <div>
                                            <div>User ID: {user._id}</div>
                                            <div>Name: {user.userName}</div>
                                            <div>Email: {user.email}</div>
                                        </div>
                                        <div onClick={onSubmit} className='text-3xl bg-pink-600 rounded-full'><MdAdd /></div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStaff