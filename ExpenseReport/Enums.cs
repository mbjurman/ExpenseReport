namespace ExpenseReport
{
    public enum CostPlace
    {
        Stockholm = 1099
    }

    public enum AccountType
    {
        Övrigt = 0,
        Kontorsmateriel = 7161,
        Förbrukningsinventarier = 7110,
        ÖvrigaPersonalkostnader = 5899,
        Friskvårdsbidrag = 5830,
        TidningarOchFackliteratur = 7670,
        Flyg = 7351,
        Taxi = 7352,
        ÖvrigaResekostnader = 7379,
        KostOchLogi = 7370,
        FakturerasKund = 4200,
        RekryteringAvdragsgill = 5891,
        RekryteringEjAvdragsgill = 5892,
        InternRepresentationAvdragsgill = 5821,
        InternRepresentationEjAvdragsgill = 5822,
        ExternRepresentationAvdragsgill = 6110,
        ExternRepresentationEjAvdragsgill = 6120
    }

    public enum RepresentationCircumstance
    {
        Intern,
        Extern,
        Rekrytering
    }

    public enum RepresentationType
    {
        LunchOrDinner,
        BreakfastOrBar,
        TicketsEtc
    }
}
