import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { addExpenseFunc } from './controller/create.js';
import { getExpensesByUserID } from './controller/read.js';
import { updateExpenseByID } from './controller/update.js';
import { deleteExpenseByID } from './controller/delete.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://urtracker.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.CONNECTION_URI);

app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

app.post('/expense', addExpenseFunc);
app.get('/expense/:userId', getExpensesByUserID);
app.put('/expense/:id', updateExpenseByID);
app.delete('/expense/:id', deleteExpenseByID);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); 
});