function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Site Checker')
      .addItem('Run Checker', 'runChecker')
      .addItem('Run Checker 2', 'runChecker2')
      // .addSeparator()
      // .addSubMenu(ui.createMenu('Sub-menu')
      //     .addItem('Second item', 'menuItem2'))
      .addToUi();
}

function runChecker() {
  var length = SpreadsheetApp.getActiveSheet().getLastRow();
  // SpreadsheetApp.getUi().alert(length);
  for (var i = 1; i<=length;i++){
    var url = SpreadsheetApp.getActiveSheet().getRange('A'+i).getValue();
    var code = checkSite(url);
    var start = SpreadsheetApp.getActiveSheet().getRange('B'+i);
    writeValue(code, url, start);
  }
}

function runChecker2(){
  var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();

  values.forEach( function(row) {
    var url = row[0];
    var code = checkSite(url);
    writeValue(code, url);
  });
}

function checkSite(url){
  // var code = '';
    // Trying to connect to the website URL
    try {
      response = UrlFetchApp.fetch(url);
      code = 200;
    } catch(error) {
      // If URLFetchApp fails, the site is probably down
      code = -1;
    }

    return code;
}

function writeValue(code,url, start){
  var sheet = SpreadsheetApp.getActiveSheet();

    // var row = sheet.getLastRow() + 1;
    var row = start;
    // var msg = '';

    if (code == 200){
      msg = "Up";}
    else{
      msg = "Down";
    }


    // sheet.getRange(row,2).setValue(msg);
    row.setValue(msg);

    // findValue(url);
}


function findValue(url){
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var dataRangeSearch = activeSheet.getRange(1,1,activeSheet.getLastRow());
  var dataSearch = dataRangeSearch.getValues()
  var row = dataSearch.indexOf(url);
  return activeSheet.getRange(row+1,2).getValue(); 
}
