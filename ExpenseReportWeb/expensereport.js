function loadFunc(e) {
    var ctrl = $(e).parent();
    account = ctrl.text();
    ctrl = ctrl.next();
    ctrl = ctrl.next();
    var vatOnly = ctrl.text();
    ctrl = ctrl.next();
    var totalSum = ctrl.text();

    $('#select-account').val(account);
    $('#manual-account').val(account);
    $('#total-sum').val(totalSum);
    $('#vat-only').val(vatOnly);
    $('#myModalExpense').modal('show');
}

function getCommonExpenseObject()
{
    var result = new Object();
    var selectAccount = $('#select-account').val();
    var manualAccount = $('#manual-account').val();
    result.account = selectAccount;

    if (manualAccount) {
        result.account = manualAccount;
    }

    result.totalSum = parseFloat($('#total-sum').val());
    result.vatOnly = parseFloat($('#vat-only').val());
    return result;
}

function addCommonExpense() 
{
//    App.MainPage.Expenses.pushObject(Em.copy(App.EditedExpense, true));

    App.MainPage.Expenses.pushObject(
      Em.Object.create({
          No: App.EditedExpense.get('No'),
          Account: App.EditedExpense.get('Account'),
          Cost: App.EditedExpense.get('Cost'),
          VAT: App.EditedExpense.get('VAT'),
          Total: App.EditedExpense.get('Total')
      }));

    $('#myModalExpense').modal('hide');
}
