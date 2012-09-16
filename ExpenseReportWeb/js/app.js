var App = Em.Application.create();

/*
 * Types
 */
App.Account = Ember.Object.extend({
    Nr: null,
    Name: null
});

App.RepresentationType = Ember.Object.extend({
	Id: null,
	Name: null
});

App.RepresentationArticleTypes = Em.Object.create({
	Lunch:
		App.RepresentationType.create({Id: 1, Name: "Lunch, middag eller supé inklusive vin och sprit"}),
	Breakfast:
		App.RepresentationType.create({Id: 2, Name: "Annan måltid (frukost samt barbesök utan samband med måltid)"}),
	Other:
		App.RepresentationType.create({Id: 3, Name: "Kostnader för teaterbiljetter och dyl"})
});

App.ExpenseTypes = Em.Object.create({
	OfficeSupplies: 
		App.Account.create({Nr: 5, Name: "Kontorsmateriel" }),
	ConsumptionEquipment: 
		App.Account.create({Nr: 6, Name: "Förbrukningsinventarier" }),
	OtherStaffExpenses: 
		App.Account.create({Nr: 7, Name: "Övriga personalkostnader" }),
	WellnessGrants: 
		App.Account.create({Nr: 8, Name: "Friskvårdsbidrag" }),
	NewspapersAndBooks: 
		App.Account.create({Nr: 9, Name: "Tidningar och fackliteratur" }),
	Flights: 
		App.Account.create({Nr: 10, Name: "Flyg" }),
	Taxi: 
		App.Account.create({Nr: 11, Name: "Taxi" }),
	OtherTravelExpenses: 
		App.Account.create({Nr: 12, Name: "Övriga resekostnader" }),
	FoodAndAccommodation: 
		App.Account.create({Nr: 13, Name: "Kost och logi" }),
	BillableExpenses: 
		App.Account.create({Nr: 14, Name: "Faktureras kund" })
});

App.Expense = Em.Object.extend({
    Nr: 0,
    SelectedAccount: null,
    OtherAccount: "",
    VAT: "",
    Total: "",
    AccountDisplay: function() {
        if (Ember.empty(this.get('OtherAccount')))
    		return this.get('SelectedAccount').Name;
    	else
    		return this.get('OtherAccount');
    }.property()
});

App.Representation = App.Expense.extend({
	Place: "",
	Date: "",
	Purpose: "",
	Project: "",
	ProjectPhase: "",
	IsGift: false,
	Present: [],
	Article: null
});


/*
 * Models
 */
App.mainPage = Em.Object.create({
    msg: "test",
    Expenses: [
        App.Expense.create({
            Nr: 1,
            SelectedAccount: null,
            OtherAccount: "blaha",
            VAT: 25,
            Total: 125,
        }),
        App.Representation.create({
        	Nr: 2,
        	SelectedAccount: App.ExpenseTypes.Taxi,
        	OtherAccount: null,
        	VAT: 100,
        	Total: 400,
			Place: "Stockholm",
			Date: "2012-06-01",
			Purpose: "Knyta kontakter",
			Project: "Project X",
			ProjectPhase: "Startup",
			IsGift: false,
			Present: ["Sune Sunesson, X AB", "Anders Andersson, Y AB"],
			Article: App.RepresentationArticleTypes.Lunch
        })
    ]
});

App.editedExpense = App.Expense.create({
    Nr: 0,
    SelectedAccount: null,
    OtherAccount: "",
    VAT: "",
    Total: ""
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
App.expenseEditView = Ember.View.extend({
	content: null,
    add: function() {
		var model = this.get('content');
	    App.mainPage.Expenses.pushObject(
			App.Expense.create({
				Nr: model.get('Nr'),
				SelectedAccount: model.get('SelectedAccount'),
				OtherAccount: model.get('OtherAccount'),
				Cost: model.get('Cost'),
				VAT: model.get('VAT'),
				Total: model.get('Total')
			}));

    	$('#myModalExpense').modal('hide');
	}
})


App.expenseListItemView = Ember.View.extend({
    content: null,
    formView: null,
	edit: function(event) {
		var model = this.get('content');
		var formView = this.get('formView');

		App.editedExpense.set('Nr', model.get('Nr'));
		App.editedExpense.set('SelectedAccount', model.get('SelectedAccount'));
		App.editedExpense.set('OtherAccount', model.get('OtherAccount'));
		App.editedExpense.set('VAT', model.get('VAT'));
		App.editedExpense.set('Total', model.get('Total'));

		if (model instanceof App.Representation)
		{
			App.editedExpense.set('Place', model.get('Place'));
			App.editedExpense.set('Date', model.get('Date'));
			App.editedExpense.set('Purpose', model.get('Purpose'));
			App.editedExpense.set('Project', model.get('Project'));
			App.editedExpense.set('ProjectPhase', model.get('ProjectPhase'));
			App.editedExpense.set('IsGift', model.get('IsGift'));
			App.editedExpense.set('Present', model.get('Present'));
			App.editedExpense.set('Article', model.get('Article'));

			$('#myModalRepresentation').modal('show');
		}
		else if (model instanceof App.Expense)
		{
			if (formView != null)
			{
				formView.remove();
			}

			formView = Ember.View.create({
				templateName: 'expenseEditViewForm'
			})

			formView.appendTo("#expense-edit-form-container");
			this.set('formView', formView);

			$('#myModalExpense').modal('show');
		}
	}
});


/*
 * Startup
 */

$('#myModalExpense').on('shown', function () {
	$("#myModalExpense select:first").focus();
});


