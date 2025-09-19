import React from 'react';

const ExpenseData = ({ expenses, onRowClick }) => {
    const sortedExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpenses.map(expense => (
                <tr key={expense._id} className="text-center text-xs font-[400] text-gray-500 hover:bg-gray-50 hover:cursor-pointer hover:transform hover:scale-y-[1.01] hover:scale-x-[1.01] hover:shadow-md md:text-sm lg:text-[17px]" onClick={() => onRowClick(expense)}>
                    <td className="px-6 py-4 text-left whitespace-nowrap">{expense.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(expense.date)}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">{expense.paymentMethod}</td>
                </tr>
            ))}
        </tbody>
    );
};

export default ExpenseData;
