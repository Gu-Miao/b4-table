$(function () {
    var table = new Table();

    table.init('#table', option);

    setTimeout(function () {
        table.update(updateData);
        $('#table').click(null);
    }, 3000);


});