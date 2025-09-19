import ExpenseModel from '../models/Expense.js';

export const deleteExpenseByID = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await ExpenseModel.findByIdAndDelete(id);
        
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully', deletedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete expense', error: error.message });
    }
};
