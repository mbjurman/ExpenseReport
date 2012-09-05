
function addCommonExpense() 
{
//    App.MainPage.Expenses.pushObject(Em.copy(App.EditedExpense, true));

    App.MainPage.Expenses.pushObject(
      App.ExpenseClass.create({
          Nr: App.EditedExpense.get('No'),
          SelectedAccount: App.EditedExpense.get('SelectedAccount'),
          OtherAccount: App.EditedExpense.get('OtherAccount'),
          Cost: App.EditedExpense.get('Cost'),
          VAT: App.EditedExpense.get('VAT'),
          Total: App.EditedExpense.get('Total')
      }));

    $('#myModalExpense').modal('hide');
}
