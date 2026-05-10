import mongoose from 'mongoose';

const payRequestSchema = new mongoose.Schema({
    ticketId: { type: String, required: true },
    price: { type: Number, required: true },
    isConfirmed: { type: Boolean, default: false}
}, { timestamps: true, collection: 'payRequests'  });

const payRequest = mongoose.model('payRequest', payRequestSchema);

export default payRequest;