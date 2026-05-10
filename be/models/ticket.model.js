import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    time: { type: String, required: true },
    date: { type: String, required: true },
    seats: [{ type: Number }],
    isCanceled: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;