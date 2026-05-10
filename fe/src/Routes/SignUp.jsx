import React from 'react'
import Logo from '../assets/Logo.svg'
import { Link, useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons'


const SignUp = () => {
    const nav = useNavigate();

    const [usernameValue, setUsernameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');

    const [warningUsername, setWarningUsername] = React.useState('');
    const [warningEmail, setWarningEmail] = React.useState('');
    const [warningPassword, setWarningPassword] = React.useState('');
    const [warningConfirmPassword, setWarningConfirmPassword] = React.useState('');

    const onChangeUsername = (event) => {
        setUsernameValue(event.target.value);
        if (event.target.value.length < 3 && event.target.value.length > 0) {
            setWarningUsername('Username must be at least 3 characters long');
        } else if (event.target.value.length > 19) {
            setWarningUsername('Username must be less than 20 characters long');
        } else {
            setWarningUsername('');
        }
    }
    const onChangeEmail = (event) => {
        setEmailValue(event.target.value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(event.target.value) && event.target.value.length > 0) {
            setWarningEmail('Invalid email format');
        } else {
            setWarningEmail('');
        }
    }
    const onChangePassword = (event) => {
        setPasswordValue(event.target.value);
        if (event.target.value.length < 8 && event.target.value.length > 0) {
            setWarningPassword('Password must be at least 8 characters long');
        } else {
            setWarningPassword('');
        }
    }
    const onChangeConfirmPassword = (event) => {
        setConfirmPasswordValue(event.target.value);
        if (passwordValue !== event.target.value && event.target.value.length > 0) {
            setWarningConfirmPassword('Passwords do not match');
        } else {
            setWarningConfirmPassword('');
        }
    }

    const [notification, setNotification] = React.useState('')

    const onSubmit = async (event) => {
        event.preventDefault();

        if (confirmPasswordValue !== passwordValue) {
            setNotification('Confirm password and password mismatched');
            return;
        }

        const response = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    userName: `${usernameValue}`,
                    email: `${emailValue}`,
                    password: `${passwordValue}`,
                }
            ),
        });

        const result = await response.json();

        if (response.ok) {
            setNotification('');
        } else {
            setNotification(result.message);
            return;
        }

        nav('/login');
    };

    const onClickReturn = () => {
        nav('/login');
    }

    return (
        <>
            <div className='w-full py-4 px-5 text-lg font-bold text-center fixed top-0'>
                <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                <p>Sign up</p>
            </div>
            <div className='w-screen h-screen flex flex-col items-center justify-between pb-4 px-8 pt-15'>
                <div className='w-full flex flex-col items-center gap-2'>
                    <img className='aspect-square w-[90px]' src={Logo} alt="Logo" />
                    <p className='font-bold text-xl'>Create New Account</p>
                    <p className='text-[#A9A2A3] text-center text-lg'>
                        Set up your username and password.
                        <br />
                        You can always change it later.
                    </p>
                    <form className='w-full flex flex-col mt-2 gap-1'>
                        <input onChange={onChangeUsername} type="text" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Username' />
                        <div className='pl-3 text-red-500 text-md h-6'>{warningUsername}</div>
                        <input onChange={onChangeEmail} type="text" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Email' />
                        <div className='pl-3 text-red-500 text-md h-6'>{warningEmail}</div>
                        <input onChange={onChangePassword} type="password" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Password' />
                        <div className='pl-3 text-red-500 text-md h-6'>{warningPassword}</div>
                        <input onChange={onChangeConfirmPassword} type="password" className='text-lg border-[#A9A2A333] border-2 w-full px-5 py-3 rounded-lg focus:border-pink-400 ' placeholder='Confirm password' />
                        <div className='pl-3 text-red-500 text-md h-6'>{warningConfirmPassword}</div>
                        <div onClick={onSubmit} className='text-lg w-full px-5 py-3 rounded-lg border-b-2 border-r-2 border-gray-200 bg-pink-500 text-center'>Sign up</div>
                    </form>
                    <div>{notification}</div>
                </div>
                <div className='text-lg'>Already have an account? <Link to={'/login'} className='text-[#FF515A] text-lg'>Log in</Link></div>
            </div>
        </>

    )
}

export default SignUp