import express from 'express';
import ExpenseModel from '../models/Expense.js';

const app = express();

export const addExpenseFunc = async ( req, res ) => {
    
    try{
        const { title, amount, category, date, paymentMethod, description, user } = req.body;

        // Create a new expense
        const newExpense = new ExpenseModel({
            title,
            amount,
            category,
            date,
            paymentMethod,
            description,
            user
        });

        // Save the expense to the database
        const savedExpense = await newExpense.save();

        // Send a success response
        res.status(200).json({
            message: 'Expense added successfully'
        });
    }

    catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding the expense',
            error: error.message
        });
    }
}