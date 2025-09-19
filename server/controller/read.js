import ExpenseModel from '../models/Expense.js';

export const getExpensesByUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const expenses = await ExpenseModel.find({ user: userId });
        res.status(200).json(expenses);
    } 
    
    catch (error) {
        console.error('Error fetching expenses:', error); // Backend log
        res.status(500).json({
            message: 'An error occurred while fetching expenses',
            error: error.message,
        });
    }
};