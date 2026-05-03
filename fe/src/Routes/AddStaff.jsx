import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router';
import { MdAdd } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const AddStaff = () => {
    const nav = useNavigate()
    const localStaff = localStorage.getItem("staffLogin")
    if (!localStaff) {
        return <Navigate to={"/staff"} />;
    }
    const onClickReturn = () => {
        history.back()
    }

    const [users, setUsers] = React.useState([])
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
    const [addModal, setAddModal] = React.useState({
        status: false,
        id: null
    })
    const onClickCloseAdd = () => {
        setAddModal({ status: false, id: null })
    }
    const [passwordValue, setPasswordValue] = React.useState();
    const onChangePassword = (event) => {
        setPasswordValue(event.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        if (passwordValue) {
            const body = users.find((user) => user.id === addModal.id)
            body.role = 'staff'
            body.staffPass = `${passwordValue}`
            console.log(body)

            await fetch(`http://localhost:4000/users/${addModal.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            location.reload()
        }
    }

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
                                        <div>User ID: {user.id}</div>
                                        <div>Name: {user.username}</div>
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
                                const body = {
                                    status: true,
                                    id: user.id
                                }
                                const onClickOpenAdd = () => {
                                    setAddModal(body)
                                }
                                return (
                                    <div className='bg-pink-800/70 text-lg px-5 py-3 rounded-lg flex flex-row justify-between items-center'>
                                        <div>
                                            <div>User ID: {user.id}</div>
                                            <div>Name: {user.username}</div>
                                            <div>Email: {user.email}</div>
                                        </div>
                                        <div onClick={onClickOpenAdd} className='text-3xl bg-pink-600 rounded-full'><MdAdd /></div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            {(addModal.status) ?
                <div className='w-screen h-screen bg-black/70 fixed top-0 z-10 flex justify-center items-center'>
                    <div className='bg-purple-900 p-5 text-lg rounded-xl flex flex-col gap-4 items-center'>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='text-xl font-semibold'>Create staff password</div>
                            <p onClick={onClickCloseAdd} className='text-3xl'><IoCloseSharp /></p>
                        </div>
                        <input onChange={onChangePassword} type="password" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Password' />
                        <div onClick={onSubmit} className='w-full px-5 py-3 rounded-lg border-b-2 border-r-2 border-gray-200 bg-pink-500 text-center'>Confirm</div>
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default AddStaff