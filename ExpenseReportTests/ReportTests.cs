using System;
using System.Collections.Generic;
using ExpenseReport;
using NUnit.Framework;

namespace ExpenseReportTests
{
    [TestFixture]
    public class ReportTests
    {
        [Test]
        public void Create_ReportIsEmpty()
        {
            Report report = new Report();

            Assert.AreEqual(0, report.Rows.Count);
        }

        [Test]
        public void AddExpense_SingleExpense_SummaryContainsIt()
        {
            Report report = new Report();

            report.AddExpense(AccountType.FakturerasKund, 2, 1);

            Assert.AreEqual(1, report.Rows.Count);
            Assert.AreEqual(AccountType.FakturerasKund, report.Rows[0].Account);
            Assert.AreEqual(2, report.Rows[0].Ammount);
            Assert.AreEqual(1, report.Rows[0].Vat);
        }

        [Test]
        public void AddExpense_TwoExpensesSameAccount_SummaryContainsThem()
        {
            Report report = new Report();

            report.AddExpense(AccountType.FakturerasKund, 2, 1);
            report.AddExpense(AccountType.FakturerasKund, 3, 2);

            Assert.AreEqual(1, report.Rows.Count);
            Assert.AreEqual(AccountType.FakturerasKund, report.Rows[0].Account);
            Assert.AreEqual(5, report.Rows[0].Ammount);
            Assert.AreEqual(3, report.Rows[0].Vat);
        }

        [Test]
        public void AddExpense_TwoExpensesDifferentAccounts_SummaryContainsThem()
        {
            Report report = new Report();

            report.AddExpense(AccountType.FakturerasKund, 2, 1);
            report.AddExpense(AccountType.Flyg, 3, 2);

            Assert.AreEqual(2, report.Rows.Count);
            Assert.AreEqual(AccountType.FakturerasKund, report.Rows[0].Account);
            Assert.AreEqual(2, report.Rows[0].Ammount);
            Assert.AreEqual(1, report.Rows[0].Vat);
            Assert.AreEqual(AccountType.Flyg, report.Rows[1].Account);
            Assert.AreEqual(3, report.Rows[1].Ammount);
            Assert.AreEqual(2, report.Rows[1].Vat);
        }

        [Test]
        public void AddRepresentation_DeductableLunch_SummaryContainsExpense()
        {
            Report report = new Report();
            var receivers = new List<RepresentationReceiver> {new RepresentationReceiver("a", "b")};

            report.AddRepresentation(DateTime.Now, "p", RepresentationCircumstance.Rekrytering, receivers, 80, 25, RepresentationType.LunchOrDinner);

            Assert.AreEqual(1, report.Rows.Count);
            Assert.AreEqual(AccountType.RekryteringAvdragsgill, report.Rows[0].Account);
            Assert.AreEqual(64, report.Rows[0].Ammount);
            Assert.AreEqual(16, report.Rows[0].Vat);
        }

        [Test]
        public void AddRepresentation_NonDeductableLunch_SummaryContainsExpenses()
        {
            Report report = new Report();
            var receivers = new List<RepresentationReceiver> {new RepresentationReceiver("a", "b")};

            report.AddRepresentation(DateTime.Now, "p", RepresentationCircumstance.Rekrytering, receivers, 160, 25, RepresentationType.LunchOrDinner);

            Assert.AreEqual(2, report.Rows.Count);
            Assert.AreEqual(AccountType.RekryteringAvdragsgill, report.Rows[0].Account);
            Assert.AreEqual(90, report.Rows[0].Ammount);
            Assert.AreEqual(23, report.Rows[0].Vat);
            Assert.AreEqual(AccountType.RekryteringEjAvdragsgill, report.Rows[1].Account);
            Assert.AreEqual(47, report.Rows[1].Ammount);
            Assert.AreEqual(0, report.Rows[1].Vat);
        }
    }
}
