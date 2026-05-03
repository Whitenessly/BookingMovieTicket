import React from 'react'
import Logo from '../assets/Logo.svg'
import { Link, Navigate, useNavigate } from 'react-router'
import { LeftOutlined } from '@ant-design/icons'


const Login = () => {
    localStorage.removeItem("staffLogin")
    const userLocal = localStorage.getItem('userId')
    if (userLocal) {
        return <Navigate to={"/home"} />;
    }
    const nav = useNavigate();

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:4000/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const [usernameOrEmailValue, setUsernameOrEmailValue] = React.useState();
    const [passwordValue, setPasswordValue] = React.useState();

    const [warning, setWarning] = React.useState();

    const onChangeUsernameOrEmail = (event) => {
        setUsernameOrEmailValue(event.target.value);
    }
    const onChangePassword = (event) => {
        setPasswordValue(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        const user = users.find(user => (user.username === usernameOrEmailValue || user.email === usernameOrEmailValue) && user.password === passwordValue);
        localStorage.setItem('userId', user.id)
        if (user) {
            setWarning('');
            nav('/home');
        } else {
            setWarning('Invalid username/email or password');
        }
    }
    const onClickReturn = () => {
        nav('/home');
    }

    return (
        <>
            <div className='w-full py-4 px-5 text-lg font-bold text-center fixed top-0'>
                <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                <p>Login</p>
            </div>
            <div className='w-screen h-screen flex flex-col items-center justify-between pb-4 px-8 pt-15'>
                <div className='w-full flex flex-col items-center gap-2'>
                    <img className='aspect-square w-[90px]' src={Logo} alt="Logo" />
                    <p className='font-bold text-2xl'>Welcome back</p>
                    <p className='text-[#A9A2A3] text-center text-lg'>
                        Login into your account.
                    </p>
                    <form className='w-full flex flex-col mt-2'>
                        <input onChange={onChangeUsernameOrEmail} type="text" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Username or Email' />
                        <div className='pl-3 text-red-500 text-sm h-6'></div>
                        <input onChange={onChangePassword} type="password" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Password' />
                        <div className='pl-3 text-red-500 text-sm h-6'>{warning}</div>
                        <div onClick={onSubmit} className='text-lg w-full px-5 py-3 rounded-lg border-b-2 border-r-2 border-gray-200 bg-pink-500 text-center'>Login</div>
                    </form>
                </div>
                <div className='text-lg'>Didn't have an account? <Link to={'/signup'} className='text-pink-400 text-lg'>Sign up</Link></div>
            </div>
        </>

    )
}

export default Login