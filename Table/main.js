var player = ['Hazard', 'Oscar', 'Cahill', 'Messi', 'Ronaldo'];
var age = ['21', '22', '23', '30', '29'];
var national = ['Belgium', 'Brasil', 'England', 'Brasil', 'Portugal'];
var count = player.length;

function fillcontent() {
    var bodytr;
    var bodytd;
    var tablebody;
    for (var i = 0; i < count; i++) {
        bodytr += '<tr>';
        for (var j = 0; j < count; j++) {
            if (j == i) {
                bodytr += '<td>' + player[j] + '</td>';
                bodytr += '<td>' + age[j] + '</td>';
                bodytr += '<td>' + national[j] + '</td>';
            }
        }
        bodytr += '</tr>';
    }
    $('.main-table tbody').html(bodytr);
}
$(function() {
    fillcontent();
})
$('th').click(function() {  
    var table =  $(this).parents('table').eq(0);   
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));   
    this.asc = !this.asc   
    if (!this.asc) { rows = rows.reverse() }   
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
})

function comparer(index) {  
    return function(a, b) {      
        var valA = getCellValue(a, index),
            valB = getCellValue(b, index);    
        return $.isNumeric(valA) && $.isNumeric(valB) ?  valA - valB  : valA.localeCompare(valB) ; 
    }
}

function getCellValue(row, index) {
    return $(row).children('td').eq(index).html();
}
