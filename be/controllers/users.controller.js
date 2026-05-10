import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt'
import crypto, { getRandomValues } from 'crypto'

const userController = {
    register: async (req, res) => {
        try {
            const { userName, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                userName,
                email,
                password: hashedPassword,
                role: "user"
            });

            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully', data: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            const randomString = crypto.randomUUID();
            const sessionKey = `vomie-$${user._id.toString()}$-$${user.email}$-$${randomString}$`;

            user.sessionKey = sessionKey
            await user.save();
            res.status(200).json({ message: 'Login sucessfully', sessionKey });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const sessionKey = req.params.key;

            const user = await User.findOne({ sessionKey })

            return res.status(200).json({
                message: 'Data retrieved successfully',
                data: user,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Server error',
                data: null
            });
        }
    },

    getAllUser: async (req, res) => {
        try {
            const users = await User.find()

            return res.status(200).json({
                message: 'Data retrieved successfully',
                data: users,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Server error',
                data: null
            });
        }
    },

    addStaff: async (req, res) => {
        try {
            const id = req.params.id;

            const user = await User.findByIdAndUpdate(id, { role: "staff" })

            return res.status(200).json({
                message: 'Data retrieved successfully',
                data: user,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Server error',
                data: null
            });
        }
    },
}

export default userController