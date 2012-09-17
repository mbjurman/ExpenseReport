var App = Em.Application.create({
	ready: function() {
		App.rootContainer.appendTo("#container");
		App.rootContainer.set('currentView', App.MainPageView.create({content: App.mainPage}));
	}
});

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

App.RepresentationArticleType = Ember.Object.extend({
	id: null,
	name: null
});

App.ProjectPhase = Ember.Object.extend({
	id: null,
	name: null
});

App.RepresentationTypes = Ember.Object.create({
	Intern: 
		App.RepresentationType.create({id: 1, name: "Intern"}),
	Extern:
		App.RepresentationType.create({id: 2, name: "Extern"})
});

App.RepresentationArticleTypes = Em.Object.create({
	Lunch:
		App.RepresentationArticleType.create({id: 1, name: "Lunch, middag eller supé inklusive vin och sprit"}),
	Breakfast:
		App.RepresentationArticleType.create({id: 2, name: "Annan måltid (frukost samt barbesök utan samband med måltid)"}),
	Other:
		App.RepresentationArticleType.create({id: 3, name: "Kostnader för teaterbiljetter och dyl"})
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

App.ProjectPhases = Em.Object.create({
	Startup: 
		App.ProjectPhase.create({id: 1, name: "Uppstart"}),
	Ongoing:
		App.ProjectPhase.create({id: 2, name: "Pågående"}),
	Closing:
		App.ProjectPhase.create({id: 3, name: "Avslut"})
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
	projectPhase: null,
	representationType: "",
	isGift: false,
	present: [],
	article: null
});


/*
 * Models
 */
App.mainPage = Em.Object.create({
    expenses: [
        App.Expense.create({
            nr: 1,
            selectedAccount: null,
            otherAccount: "testsasdf",
            vat: 25,
            total: 125,
        }),
        App.Expense.create({
            nr: 2,
            selectedAccount: App.ExpenseTypes.WellnessGrants,
            otherAccount: null,
            vat: 200,
            total: 1000,
        }),
        App.Representation.create({
        	nr: 3,
        	selectedAccount: App.ExpenseTypes.Taxi,
        	otherAccount: null,
        	vat: 100,
        	total: 400,
			place: "Stockholm",
			date: "2012-06-01",
			purpose: "Knyta kontakter",
			project: "Project X",
			projectPhase: App.ProjectPhases.Closing,
			representationType: App.RepresentationTypes.Extern,
			isGift: true,
			present: "Sune Sunesson, X AB",
			article: App.RepresentationArticleTypes.Lunch
        })
    ]
});


/*
 * Controllers
 */
App.accountController = Ember.ArrayController.create({
    content: [
    	null,
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

App.representationTypeController = Ember.ArrayController.create({
	content: [
		null,
		App.RepresentationTypes.Intern,
		App.RepresentationTypes.Extern
	]
});

App.representationArticleTypeController = Ember.ArrayController.create({
	content: [
		null,
		App.RepresentationArticleTypes.Lunch,
		App.RepresentationArticleTypes.Breakfast,
		App.RepresentationArticleTypes.Other
	]
});

App.projectPhaseController = Ember.ArrayController.create({
	content: [
		null,
		App.ProjectPhases.Startup,
		App.ProjectPhases.Ongoing,
		App.ProjectPhases.Closing
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
	content: App.mainPage,
	newExpense: function() {
		App.rootContainer.set('currentView', App.ExpenseEditView.create({
			content: App.Expense.create()
		}));
	}
});

App.EditView = Ember.View.extend({
	hide: function() {
		App.rootContainer.set('currentView', App.MainPageView.create());
	}
})

App.ExpenseEditView = App.EditView.extend({
	templateName: 'expense-editor',
	content: null,
    add: function() {
	    App.mainPage.Expenses.pushObject(this.get('content'));
		this.hide();
	},
	cancel: function() {
		this.hide();
	},
	keyDown: function(event) {
		if (event.keyCode === 27)
		{
			this.hide();
		}
	}
})

App.RepresentationEditView = App.EditView.extend({
	templateName: 'representation-editor',
	content: null,
	add: function() {
		this.hide();
	},
	cancel: function() {
		this.hide();
	}
})

App.ExpenseListItemView = Ember.View.extend({
    content: null,
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



