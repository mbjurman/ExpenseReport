using System;
using System.Linq;
using System.Collections.Generic;

namespace ExpenseReport
{
    public class Report
    {
        private List<Expense> Expenses = new List<Expense>();
        public List<Representation> Representations = new List<Representation>();

        public List<Expense> Rows
        {
            get
            {
                List<Expense> totalExpenses = new List<Expense>();
                
                totalExpenses.AddRange(Expenses);
                totalExpenses.AddRange(Representations.SelectMany(r => r.GetExpenses()));

                return (
                    from expense in totalExpenses
                    group expense by expense.Account
                    into g
                    select new Expense(g.Key, g.Sum(e => e.Ammount), g.Sum(e => e.Vat))).ToList();
            }
        }

        public void AddExpense(AccountType account, decimal ammount, decimal vat)
        {
            Expenses.Add(new Expense(account, ammount, vat));
        }

        public void AddRepresentation(
            DateTime date, string purpose, RepresentationCircumstance circumstance, 
            List<RepresentationReceiver> receivers, decimal ammount, decimal vat, RepresentationType type)
        {
            Representations.Add(new Representation(date, purpose, circumstance, receivers, ammount, vat, type));
        }
    }
}
