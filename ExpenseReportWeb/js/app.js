var App = Em.Application.create();

/*
 * Types
 */
App.Account = Ember.Object.extend({
    nr: null,
    name: null
});

App.RepresentationType = Ember.Object.extend({
	id: null,
	name: null
});

App.RepresentationArticleTypes = Em.Object.create({
	Lunch:
		App.RepresentationType.create({id: 1, name: "Lunch, middag eller supé inklusive vin och sprit"}),
	Breakfast:
		App.RepresentationType.create({id: 2, name: "Annan måltid (frukost samt barbesök utan samband med måltid)"}),
	Other:
		App.RepresentationType.create({id: 3, name: "Kostnader för teaterbiljetter och dyl"})
});

App.ExpenseTypes = Em.Object.create({
	OfficeSupplies: 
		App.Account.create({nr: 5, name: "Kontorsmateriel" }),
	ConsumptionEquipment: 
		App.Account.create({nr: 6, name: "Förbrukningsinventarier" }),
	OtherStaffExpenses: 
		App.Account.create({nr: 7, name: "Övriga personalkostnader" }),
	WellnessGrants: 
		App.Account.create({nr: 8, name: "Friskvårdsbidrag" }),
	NewspapersAndBooks: 
		App.Account.create({nr: 9, name: "Tidningar och fackliteratur" }),
	Flights: 
		App.Account.create({nr: 10, name: "Flyg" }),
	Taxi: 
		App.Account.create({nr: 11, name: "Taxi" }),
	OtherTravelExpenses: 
		App.Account.create({nr: 12, name: "Övriga resekostnader" }),
	FoodAndAccommodation: 
		App.Account.create({nr: 13, name: "Kost och logi" }),
	BillableExpenses: 
		App.Account.create({nr: 14, name: "Faktureras kund" })
});

App.Expense = Em.Object.extend({
    nr: 0,
    selectedAccount: null,
    otherAccount: "",
    vat: "",
    total: "",
    accountDisplay: function() {
        if (Ember.empty(this.get('otherAccount')))
    		return this.get('selectedAccount').name;
    	else
    		return this.get('otherAccount');
    }.property()
});

App.Representation = App.Expense.extend({
	place: "",
	date: "",
	purpose: "",
	project: "",
	projectPhase: "",
	isGift: false,
	present: [],
	article: null
});


/*
 * Models
 */
App.mainPage = Em.Object.create({
    msg: "test",
    Expenses: [
        App.Expense.create({
            nr: 1,
            selectedAccount: null,
            otherAccount: "blaha",
            vat: 25,
            total: 125,
        }),
        App.Representation.create({
        	nr: 2,
        	selectedAccount: App.ExpenseTypes.Taxi,
        	otherAccount: null,
        	vat: 100,
        	total: 400,
			place: "Stockholm",
			date: "2012-06-01",
			purpose: "Knyta kontakter",
			project: "Project X",
			projectPhase: "Startup",
			isGift: true,
			present: ["Sune Sunesson, X AB", "Anders Andersson, Y AB"],
			article: App.RepresentationArticleTypes.Lunch
        })
    ]
});

App.editedExpense = App.Expense.create({
    nr: 0,
    selectedAccount: null,
    otherAccount: "",
    vat: "",
    total: ""
});


/*
 * Controllers
 */
App.selectedAccountController = Ember.Object.create({
    account: null
});

App.accountController = Ember.ArrayController.create({
    content: [
		App.ExpenseTypes.OfficeSupplies, 
		App.ExpenseTypes.ConsumptionEquipment, 
		App.ExpenseTypes.OtherStaffExpenses,
		App.ExpenseTypes.WellnessGrants,
		App.ExpenseTypes.NewspapersAndBooks,
		App.ExpenseTypes.Flights,
		App.ExpenseTypes.Taxi,
		App.ExpenseTypes.OtherTravelExpenses,
		App.ExpenseTypes.FoodAndAccommodation, 
		App.ExpenseTypes.BillableExpenses
    ]
});


/*
 * Views
 */
App.rootContainer = Ember.ContainerView.create({
	childViews: []
});

App.MainPageView = Ember.View.extend({
	templateName: 'main-page',
	newExpense: function() {
		App.rootContainer.set('currentView', App.ExpenseEditView.create({
			content: App.Expense.create()
		}));
	}
});

App.ExpenseEditView = Ember.View.extend({
	templateName: 'expense-editor',
	content: null,
    add: function() {
		var model = this.get('content');
	    App.mainPage.Expenses.pushObject(
			App.Expense.create({
				nr: model.get('nr'),
				selectedAccount: model.get('selectedAccount'),
				otherAccount: model.get('otherAccount'),
				cost: model.get('cost'),
				vat: model.get('vat'),
				total: model.get('total')
			}));

		App.rootContainer.set('currentView', App.MainPageView.create());
	},
	cancel: function() {
		App.rootContainer.set('currentView', App.MainPageView.create());
	}
})

App.RepresentationEditView = Ember.View.extend({
	templateName: 'representation-editor',
	content: null,
	add: function() {
		App.rootContainer.set('currentView', App.MainPageView.create());		
	},
	cancel: function() {
		App.rootContainer.set('currentView', App.MainPageView.create());
	}
})

App.expenseListItemView = Ember.View.extend({
    content: null,
    formView: null,
	edit: function(event) {
		var model = this.get('content');

		if (model instanceof App.Representation)
		{
			App.rootContainer.set('currentView', App.RepresentationEditView.create({
				content: model
			}));
		}
		else if (model instanceof App.Expense)
		{
			App.rootContainer.set('currentView', App.ExpenseEditView.create({
				content: model
			}));
		}
	}
});


/*
 * Startup
 */

App.rootContainer.appendTo("#container");
App.rootContainer.set('currentView', App.MainPageView.create());
