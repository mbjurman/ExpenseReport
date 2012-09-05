var App = Em.Application.create();

App.MyView = Em.View.extend({
    mouseDown: function () {
        //App.MainPage.set('msg', "test");
        App.MainPage.set('msg', App.MainPage.get('msg') + ".");
    }
});

App.ExpenseClass = Em.Object.extend({
    Nr: 0,
    SelectedAccount: null,
    OtherAccount: "",
    Cost: "",
    VAT: "",
    Total: "",
    AccountDisplay: function() {
        if (Ember.empty(this.get('OtherAccount')))
    		return this.get('SelectedAccount').Name;
    	else
    		return this.get('OtherAccount');
    }.property()
});

App.Account = Ember.Object.extend({
    Nr: null,
    Name: null
});

App.MainPage = Em.Object.create({
    msg: "test",
    Expenses: [
        App.ExpenseClass.create({
            Nr: 1,
            SelectedAccount: App.Account.create({Nr: 6, Name: "Förbrukningsinventarier" }),
            OtherAccount: "blaha",
            Cost: 100,
            VAT: 25,
            Total: 125,
        })]
});

App.EditedExpense = App.ExpenseClass.create({
    Nr: 0,
    SelectedAccount: null,
    OtherAccount: "",
    Cost: "",
    VAT: "",
    Total: ""
});

App.selectedAccountController = Ember.Object.create({
    account: null
});

App.accountController = Ember.ArrayController.create({
    content: [
		App.Account.create({Nr: 5, Name: "Kontorsmateriel" }),
		App.Account.create({Nr: 6, Name: "Förbrukningsinventarier" }),
		App.Account.create({Nr: 7, Name: "Övriga personalkostnader" }),
		App.Account.create({Nr: 8, Name: "Friskvårdsbidrag" }),
		App.Account.create({Nr: 9, Name: "Tidningar och fackliteratur" }),
		App.Account.create({Nr: 10, Name: "Flyg" }),
		App.Account.create({Nr: 11, Name: "Taxi" }),
		App.Account.create({Nr: 12, Name: "Övriga resekostnader" }),
		App.Account.create({Nr: 13, Name: "Kost och logi" }),
		App.Account.create({Nr: 14, Name: "Faktureras kund" })
    ]
});

