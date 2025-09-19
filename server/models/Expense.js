import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String, 
        required: true
    }, 
    date: {
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ExpenseModel = model('Expense', ExpenseSchema);

export default ExpenseModel;