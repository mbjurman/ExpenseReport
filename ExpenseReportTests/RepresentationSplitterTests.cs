using System;
using System.Collections.Generic;
using ExpenseReport;
using NUnit.Framework;

namespace ExpenseReportTests
{
    [TestFixture]
    public class RepresentationSplitterTests
    {
        [TestCase(75, 1, 60, 15, 0)]
        [TestCase(100, 1, 60, 15, 25)]
        [TestCase(150, 2, 120, 30, 0)]
        [TestCase(200, 2, 120, 30, 50)]
        public void Create_Breakfast_DeductableAmmountIsCorrect(int ammount, int receiverCount, int expectedDeductableAmmount, int expectedDeductableVat, int expectedNonDeductableAmmount)
        {
            RepresentationSplitter representationSplitter = new RepresentationSplitter(ammount, 25, RepresentationType.BreakfastOrBar, receiverCount);

            Assert.AreEqual(expectedDeductableAmmount, representationSplitter.DeductableAmmount);
            Assert.AreEqual(expectedDeductableVat, representationSplitter.DeductableVat);
            Assert.AreEqual(expectedNonDeductableAmmount, representationSplitter.NonDeductableAmmount);
        }

        [TestCase(100, 1, 80, 20, 0)]
        [TestCase(140, 1, 90, 23, 27)]
        [TestCase(200, 2, 160, 40, 0)]
        [TestCase(280, 2, 180, 45, 55)]
        public void Create_LunchOrDinner_DeductableAmmountIsCorrect(int ammount, int receiverCount, int expectedDeductableAmmount, int expectedDeductableVat, int expectedNonDeductableAmmount)
        {
            RepresentationSplitter representationSplitter = new RepresentationSplitter(ammount, 25, RepresentationType.LunchOrDinner, receiverCount);

            Assert.AreEqual(expectedDeductableAmmount, representationSplitter.DeductableAmmount);
            Assert.AreEqual(expectedDeductableVat, representationSplitter.DeductableVat);
            Assert.AreEqual(expectedNonDeductableAmmount, representationSplitter.NonDeductableAmmount);
        }

        [TestCase(200, 1, 160, 40, 0)]
        [TestCase(280, 1, 180, 45, 55)]
        [TestCase(400, 2, 320, 80, 0)]
        [TestCase(560, 2, 360, 90, 110)]
        public void Create_Tickets_DeductableAmmountIsCorrect(int ammount, int receiverCount, int expectedDeductableAmmount, int expectedDeductableVat, int expectedNonDeductableAmmount)
        {
            RepresentationSplitter representationSplitter = new RepresentationSplitter(ammount, 25, RepresentationType.TicketsEtc, receiverCount);

            Assert.AreEqual(expectedDeductableAmmount, representationSplitter.DeductableAmmount);
            Assert.AreEqual(expectedDeductableVat, representationSplitter.DeductableVat);
            Assert.AreEqual(expectedNonDeductableAmmount, representationSplitter.NonDeductableAmmount);
        }
    }
}
