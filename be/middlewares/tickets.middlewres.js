import mongoose from "mongoose";

const ticketMiddleware = {
    createTicket: async (req, res, next) => {
        try {
            const { userId, movieId, time, date, seats } = req.body;

            if (!time || !date || !seats || seats.length === 0) {
                return res.status(400).json({
                    message: 'Missing information',
                    data: null
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default ticketMiddleware