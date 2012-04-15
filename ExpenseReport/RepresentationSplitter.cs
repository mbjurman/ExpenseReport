using System;

namespace ExpenseReport
{
    public class RepresentationSplitter
    {
        public int DeductableAmmount { get; private set; }
        public int DeductableVat { get; private set; }
        public int NonDeductableAmmount { get; private set; }

        public RepresentationSplitter(decimal ammount, decimal vatPercent, RepresentationType type, int receiverCount)
        {
            decimal ammountBeforeVat = ammount / (vatPercent / 100 + 1);
            decimal vat = ammount - ammountBeforeVat;
            int deductionLimit = GetDeductionLimit(type, receiverCount);

            if (ammountBeforeVat > deductionLimit)
            {
                DeductableAmmount = deductionLimit;
                DeductableVat = RoundUp(deductionLimit * (vatPercent / 100));
                NonDeductableAmmount = (int)ammount - DeductableAmmount - DeductableVat;
            }
            else
            {
                DeductableVat = RoundUp(vat);
                DeductableAmmount = RoundUp(ammount - vat);
            }
        }

        private static int GetDeductionLimit(RepresentationType type, int receiverCount)
        {
            int deductionLimit = 0;
            switch (type)
            {
                case RepresentationType.LunchOrDinner:
                    deductionLimit = 90*receiverCount;
                    break;
                case RepresentationType.BreakfastOrBar:
                    deductionLimit = 60*receiverCount;
                    break;
                case RepresentationType.TicketsEtc:
                    deductionLimit = 180*receiverCount;
                    break;
            }
            return deductionLimit;
        }

        private static int RoundUp(decimal value)
        {
            return (int)Math.Round(value, MidpointRounding.AwayFromZero);
        }
    }
}