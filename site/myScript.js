$(document).ready(function(){   
    generateTable();
});

$(document).on('click','#myTable th',sortTable);

function generateTable() {
    $.getJSON("data.json", function(json) {
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.setAttribute('id', 'myTable');
        table.border = "1";
        //Get the count of columns.
        var columnCount = Object.keys(json[0]).length;
        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.setAttribute('data-index', i);
            headerCell.innerHTML = Object.keys(json[0])[i];
            row.appendChild(headerCell);
        }
        //Add the data rows.
        for (var i = 0; i < json.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = Object.values(json[i])[j];
            }
        }

        var dvTable = document.getElementById("outerWrapper");
        var info = document.createElement("span");
        info.innerHTML = "Click on the column name for Sorting";
        dvTable.appendChild(info);
        dvTable.appendChild(table);
    });
}

function sortTable() {
    var col_index = this.getAttribute('data-index');
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("TR");
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[col_index];
        y = rows[i + 1].getElementsByTagName("TD")[col_index];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }


