namespace ExpenseReport
{
    public class Expense
    {
        public AccountType Account;
        public decimal Ammount;
        public decimal Vat;

        public Expense(AccountType account, decimal ammount, decimal vat)
        {
            Account = account;
            Ammount = ammount;
            Vat = vat;
        }
    }
}
