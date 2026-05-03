import React from 'react'
import { Navigate, useNavigate } from 'react-router';
import { IoMdClose } from "react-icons/io";


const Staff = () => {
    localStorage.removeItem("staffLogin")
    const nav = useNavigate()
    const userLocal = localStorage.getItem('userId')
    if (!userLocal) {
        return <Navigate to={"/home"} />;
    }
    const [user, setUser] = React.useState([]);
    if (userLocal) {
        React.useEffect(() => {
            fetch(`http://localhost:4000/users/${userLocal}`)
                .then((response) => response.json())
                .then((data) => {
                    setUser(data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }, [])
    }

    const [staffPassInput, setStaffPassInput] = React.useState()
    const [staffPassInputWarning, setStaffPassInputWarning] = React.useState('')
    const onChangeStaffPassInput = (e) => {
        setStaffPassInput(e.target.value)
    }
    const onConfirm = async (event) => {
        event.preventDefault();
        if (staffPassInput === user.staffPass) {
            // setStaffPassInputWarning('')
            localStorage.setItem('staffLogin', true)
            nav('/staff/home')
        } else {
            setStaffPassInputWarning('Password incorrect')
        }
    }
    const onClickReturn = () => {
        localStorage.removeItem("staffLogin")
        nav('/home');
    }

    return (
        <>
            <div className='w-full py-4 px-5 text-lg font-bold text-center fixed top-0'>
                <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-3'><IoMdClose /></p>
                <p>Staff Login</p>
            </div>
            <div className='w-full px-8 h-screen flex flex-col justify-center items-center gap-5'>
                <div className='text-lg'>Enter your staff password</div>
                <div className='w-full flex flex-col gap-1'>
                    <input onChange={onChangeStaffPassInput} type="password" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Password' />
                    <div className='pl-2 text-pink-500 text-lg'>{staffPassInputWarning}</div>
                </div>
                <div onClick={onConfirm} className='text-lg w-full px-5 py-3 rounded-lg border-b-2 border-r-2 border-gray-200 bg-pink-500 text-center'>Confirm</div>
            </div>
        </>
    )
}

export default Staff