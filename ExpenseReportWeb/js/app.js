var App = Em.Application.create({
	rootContainer: null,
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
		App.Account.create({nr: 14, name: "Faktureras kund" }),
	InternalRepresentation:
		App.Account.create({nr: 15, name: "Intern representation"}),
	ExternalRepresentation:
		App.Account.create({nr: 16, name: "Extern representation"})
});

App.ProjectPhases = Em.Object.create({
	Startup: 
		App.ProjectPhase.create({id: 1, name: "Uppstart"}),
	Ongoing:
		App.ProjectPhase.create({id: 2, name: "Pågående"}),
	Closing:
		App.ProjectPhase.create({id: 3, name: "Avslut"})
});

App.Expense = Em.Object.extend(Ember.Copyable, {
    nr: null,
    selectedAccountValue: null,
    selectedAccount: function() {
    	return this.get('selectedAccountValue');
    }.property(),
    otherAccount: "",
    vat: "",
    total: "",
    accountDisplay: function() {
        if (Ember.empty(this.get('otherAccount')))
    		return this.get('selectedAccount').name;
    	else
    		return this.get('otherAccount');
    }.property('otherAccount', 'selectedAccount'),
    copy: function() {
    	return App.Expense.create({
			nr: this.get('nr'),
			selectedAccountValue: this.get('selectedAccountValue'),
			otherAccount: this.get('otherAccount'),
			vat: this.get('vat'),
			total: this.get('total')
    	})
    }
});

App.Representation = App.Expense.extend(Ember.Copyable, {
	place: "",
	date: "",
	purpose: "",
	project: "",
	projectPhase: null,
	representationType: "",
	isGift: false,
	present: [],
	article: null,
	selectedAccount: function() {
		if (this.get('representationType') === App.RepresentationTypes.Intern)
			return App.ExpenseTypes.InternalRepresentation;
		else
			return App.ExpenseTypes.ExternalRepresentation;
	}.property('representationType'),
	copy: function() {
		return App.Representation.create({
			nr: this.get('nr'),
			selectedAccountValue: this.get('selectedAccountValue'),
			otherAccount: this.get('otherAccount'),
			vat: this.get('vat'),
			total: this.get('total'),
			place: this.get('place'),
			date: this.get('date'),
			purpose: this.get('purpose'),
			project: this.get('project'),
			projectPhase: this.get('projectPhase'),
			representationType: this.get('representationType'),
			isGift: this.get('isGift'),
			present: this.get('present'),
			article: this.get('article')
		})
	}
});

App.mainPage = Em.Object.create({
	expenses: [
        App.Expense.create({
            nr: 1,
            selectedAccountValue: null,
            otherAccount: "testsasdf",
            vat: 25,
            total: 125,
        }),
        App.Expense.create({
            nr: 2,
            selectedAccountValue: App.ExpenseTypes.WellnessGrants,
            otherAccount: null,
            vat: 200,
            total: 1000,
        }),
        App.Representation.create({
        	nr: 3,
        	selectedAccountValue: App.ExpenseTypes.Taxi,
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
	},
	newRepresentation: function() {
		App.rootContainer.set('currentView', App.RepresentationEditView.create({
			content: App.Representation.create()
		}));
	}
});

App.EditView = Ember.View.extend({
	content: null,
	add: function() {
		var model = this.get('content');
		if (model.nr === null)
		{
			App.mainPage.expenses.pushObject(model);
		}
		else
		{
			App.mainPage.expenses = jQuery.grep(
				App.mainPage.expenses,
				function(n, i) {
					return n.nr !== model.nr
				});
			App.mainPage.expenses.pushObject(model);
			App.mainPage.expenses.sort(function(a, b) {
					var anr = a.get('nr');
					var bnr = b.get('nr');
					return ((anr < bnr) ? -1 : ((anr > bnr) ? 1 : 0));
				});
		}
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
	},
	hide: function() {
		App.rootContainer.set('currentView', App.MainPageView.create());
	},
	show: function() {
		App.rootContainer.set('currentView', this);
	},
	submitText: "Lägg till"
});

App.ExpenseEditView = App.EditView.extend({
	templateName: 'expense-editor'
});

App.RepresentationEditView = App.EditView.extend({
	templateName: 'representation-editor'
});

App.ExpenseListItemView = Ember.View.extend({
    content: null,
	edit: function(event) {
		var model = this.get('content');
		var modelcopy = model.copy();
		var dialog;

		if (modelcopy instanceof App.Representation)
		{
			dialog = App.RepresentationEditView.create({ content: modelcopy });
			dialog.show();
			
		}
		else if (modelcopy instanceof App.Expense)
		{
			dialog = App.ExpenseEditView.create({ content: modelcopy });
			App.rootContainer.set('currentView', dialog);
		}

		dialog.submitText = "Uppdatera";
	}
});



