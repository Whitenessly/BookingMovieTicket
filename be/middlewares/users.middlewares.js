import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

const userMiddleware = {
    register: async (req, res, next) => {
        try {
            const { userName, email, password } = req.body;

            if (userName === '' || email === '' || password === '') {
                return res.status(400).json({ message: 'Username, email, and password are required.' });
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (userName.length < 3 || userName.length > 19 || !emailPattern.test(email) || password.length < 8) {
                return res.status(400).json({ message: 'False information.' })
            }

            if (await User.findOne({ email })) {
                return res.status(400).json({ message: 'Email has been registered, please use another one.' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Please enter email and password' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Wrong email or password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong email or password.' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi server khi xác thực đăng nhập', error: error.message });
        }
    }
}

export default userMiddleware