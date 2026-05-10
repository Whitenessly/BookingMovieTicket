import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import homeController from './controllers/home.controllers.js';
import moviesController from './controllers/movies.controller.js';
import userController from './controllers/users.controller.js';
import userMiddleware from './middlewares/users.middlewares.js';
import ticketController from './controllers/tickets.controller.js';
import ticketMiddleware from './middlewares/tickets.middlewres.js';
import payRequestController from './controllers/payRequests.controllers.js';

mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('Connected to database successfully'))
    .catch((err) => console.log('Error connecting to database', err));
const app = express();
app.use(cors());
app.use(express.json());

app.get('/home', homeController.getHome);

app.get('/movies', moviesController.getMovies);
app.get('/movie/:id', moviesController.getMovie);

app.post('/users/register', userMiddleware.register, userController.register);
app.post('/users/login', userMiddleware.login, userController.login);
app.get('/user/:key', userController.getUser);
app.get('/users', userController.getAllUser);
app.put('/user/:id', userController.addStaff);

app.get('/booked', ticketController.getTicketsByShowtime);
app.post('/booking', ticketMiddleware.createTicket, ticketController.createTicket);

app.get('/tickets/:userId', ticketController.getTicketsByUserId);
app.put('/ticket/:id', ticketController.cancelTicket);
app.get('/ticket/details/:id', ticketController.getTicketById);

app.get('/payRequest', payRequestController.getAllPayRequests);
app.post('/payRequest', payRequestController.createPayRequest);
app.put('/payRequest/:id', payRequestController.confirmPayRequest);
app.delete('/payRequest/:id', payRequestController.rejectPayRequest);

app.use('/', (req, res) => {
    res.json({
        message: 'Server is running...',
        data: null
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});