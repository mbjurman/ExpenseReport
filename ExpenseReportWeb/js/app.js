var App = Em.Application.create();

App.MyView = Em.View.extend({
    mouseDown: function () {
        //App.MainPage.set('msg', "test");
        App.MainPage.set('msg', App.MainPage.get('msg') + ".");
    }
});

App.MainPage = Em.Object.create({
    msg: "test",
    Expenses: [
        Em.Object.create({
            No: 1,
            Account: "blaha",
            Cost: 100,
            VAT: 25,
            Total: 125
        })],
});

App.EditedExpense = Em.Object.create({
    No: 0,
    Account: "",
    Cost: "",
    VAT: "",
    Total: ""
});
