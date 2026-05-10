import Ticket from '../models/ticket.model.js';

const ticketController = {
    createTicket: async (req, res) => {
        try {
            const { userId, movieId, time, date, seats } = req.body;

            const newTicket = new Ticket({
                userId,
                movieId,
                time,
                date,
                seats,
                isCanceled: false,
                isPaid: false
            });

            const savedTicket = await newTicket.save();

            return res.status(201).json({
                message: 'Ticket booked successfully!',
                data: savedTicket
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }
    },

    getTicketsByShowtime: async (req, res) => {
        try {
            const movieId = req.query.movieId;
            const date = req.query.date;
            const time = req.query.time;

            if (!movieId || !date || !time) {
                return res.status(400).json({
                    message: 'Please provide moviedId, date and time',
                    data: [],
                });
            }

            const tickets = await Ticket.find({
                movieId: movieId,
                date: date,
                time: time,
                isCanceled: false
            })

            const bookedSeats = tickets.flatMap(ticket => ticket.seats);

            return res.status(200).json({
                message: 'Seats list retrieved sucessfully',
                bookedSeats: bookedSeats
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }
    }, 

    getTicketsByUserId: async (req, res) => {
         try {
            const userId = req.params.userId; 

            if (!userId) {
                return res.status(400).json({
                    message: 'Vui lòng cung cấp userId',
                    data:[]
                });
            }

            const tickets = await Ticket.find({ userId: userId })
                .populate('movieId', 'title image duration') // Lấy title, image, duration từ bảng Movie
                .sort({ createdAt: -1 });

            return res.status(200).json({
                message: 'Lấy lịch sử đặt vé thành công',
                data: tickets
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    cancelTicket: async (req, res) => {
        try {
            const ticketId = req.params.id;

            if (!ticketId) {
                return res.status(400).json({
                    message: 'Ticket ID is required',
                    data: null
                });
            }

            const updatedTicket = await Ticket.findByIdAndUpdate(
                ticketId,
                { isCanceled: true }, 
                { new: true } 
            );

            if (!updatedTicket) {
                return res.status(404).json({
                    message: 'Ticket not found',
                    data: null
                });
            }

            return res.status(200).json({
                message: 'Ticket canceled successfully',
                data: updatedTicket
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }
    },

    getTicketById: async (req, res) => {
        try {
            const ticketId = req.params.id;

            const ticket = await Ticket.findById(ticketId)
                .populate('userId', 'userName email') 
                .populate('movieId', 'title image')  

            if (!ticket) {
                return res.status(404).json({
                    message: 'Ticket not found',
                    data: null
                });
            }

            return res.status(200).json({
                message: 'Ticket gotten sucessfully',
                data: ticket
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }
    }
};

export default ticketController;