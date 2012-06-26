function loadFunc(e)
{
    alert($(e).parent().next().text());
}

function getCommonExpenseObject()
{
    var result = new Object();
    result.selectAccount = $('#select-account').val();
    result.manualAccount = $('#manual-account').val();
    result.totalSum = parseFloat($('#total-sum').val());
    result.vatOnly = parseFloat($('#vat-only').val());
    return result;
}

function addCommonExpense()
{
    var result = getCommonExpenseObject();
    
    var tablebody = $('#tablebody');
    var row = $('<tr></tr>');
    row.append('<td></td>');
    row.append('<td><a href="#" data-toggle="modal" href="#myModalExpense" >' + result.selectAccount + '</a></td>');
    row.append('<td>' + (result.totalSum - result.vatOnly) + '</td>');
    row.append('<td>' + result.vatOnly + '</td>');
    row.append('<td>' + result.totalSum + '</td>');
    tablebody.append(row);
    
    row.data("expense", result);
}
