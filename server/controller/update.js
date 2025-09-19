import ExpenseModel from '../models/Expense.js';

export const updateExpenseByID = async (req, res) => {
  
    try {
    const { id } = req.params;
    const { title, amount, category, date, paymentMethod, description, user } = req.body;

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      id,
      { title, amount, category, date, paymentMethod, description, user },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } 
  
  catch (error) {
    res.status(500).json({ message: 'Failed to update expense', error });
  }
};
