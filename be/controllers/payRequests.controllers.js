import mongoose from "mongoose";
import payRequest from "../models/payRequest.model.js";
import Ticket from "../models/ticket.model.js"; 

const payRequestController = {
    createPayRequest: async (req, res) => {
        try {
            const { ticketId, price } = req.body;

            if (!ticketId || !price) {
                return res.status(400).json({ 
                    message: "ticketId and price are required." 
                });
            }

            const newRequest = new payRequest({ ticketId, price, isConfirmed: false });
            const savedRequest = await newRequest.save();

            return res.status(201).json({
                message: "Payment request created successfully.",
                data: savedRequest
            });

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while creating the payment request.",
                error: error.message
            });
        }
    },

    getAllPayRequests: async (req, res) => {
        try {
            const requests = await payRequest.find({ isConfirmed: false }).sort({ createdAt: -1 });
            
            return res.status(200).json({
                success: true,
                data: requests
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    confirmPayRequest: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedRequest = await payRequest.findByIdAndUpdate(id, { isConfirmed: true });
            if (!updatedRequest) return res.status(404).json({ success: false, message: "Not found." });

            await Ticket.findByIdAndUpdate(updatedRequest.ticketId, { isPaid: true });

            return res.status(200).json({ success: true, message: "Confirmed successfully." });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    rejectPayRequest: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRequest = await payRequest.findByIdAndDelete(id);
            if (!deletedRequest) return res.status(404).json({ success: false, message: "Not found." });

            return res.status(200).json({ success: true, message: "Rejected successfully." });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default payRequestController;