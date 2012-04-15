using System;
using System.Collections.Generic;

namespace ExpenseReport
{
    public class Representation
    {
        private readonly DateTime Date;
        private readonly string Purpose;
        private readonly RepresentationCircumstance Circumstance;
        private readonly List<RepresentationReceiver> Receivers;
        private readonly decimal Ammount;
        private readonly decimal VatPercent;
        private readonly RepresentationType Type;

        public Representation(DateTime date, string purpose, RepresentationCircumstance circumstance, List<RepresentationReceiver> receivers, decimal ammount, decimal vatPercent, RepresentationType type)
        {
            Date = date;
            Purpose = purpose;
            Circumstance = circumstance;
            Receivers = receivers;
            Ammount = ammount;
            VatPercent = vatPercent;
            Type = type;
        }

        public List<Expense> GetExpenses()
        {
            AccountType deductableAccount;
            AccountType nonDeductableAccount;

            RepresentationSplitter splitter = new RepresentationSplitter(Ammount, VatPercent, Type, Receivers.Count);

            switch (Circumstance)
            {
                case RepresentationCircumstance.Extern:
                    deductableAccount = AccountType.ExternRepresentationAvdragsgill;
                    nonDeductableAccount = AccountType.ExternRepresentationEjAvdragsgill;
                    break;
                case RepresentationCircumstance.Intern:
                    deductableAccount = AccountType.InternRepresentationAvdragsgill;
                    nonDeductableAccount = AccountType.InternRepresentationEjAvdragsgill;
                    break;
                case RepresentationCircumstance.Rekrytering:
                    deductableAccount = AccountType.RekryteringAvdragsgill;
                    nonDeductableAccount = AccountType.RekryteringEjAvdragsgill;
                    break;
                default:
                    return null;
            }

            var result = new List<Expense>
            {
                new Expense(deductableAccount, splitter.DeductableAmmount, splitter.DeductableVat)
            };

            if (splitter.NonDeductableAmmount > 0)
            {
                result.Add(new Expense(nonDeductableAccount, splitter.NonDeductableAmmount, 0));
            }

            return result;
        }   
    }
}
