function start() {
  fetchSubmissions();
}

function fetchSubmissions() {
  var url = '';
  // example URL: https://wikiconference.org/api.php?action=query&format=json&list=categorymembers&cmtitle=Category%3ASubmissions%2F2019%2FPending&cmprop=ids%7Ctitle&cmtype=page&cmlimit=500
  var submissions = UrlFetchApp.fetch(url);
  submissions = JSON.parse(submissions);
  
  var sheet = SpreadsheetApp.getActiveSheet();
  
  submissions.query.categorymembers.forEach(function(submission, index) {
    var url = 'https://wikiconference.org/?curid=' + submission.pageid;
    sheet.getRange(index + 1, 2).setValue(url);
    var submissionHtml = UrlFetchApp.fetch(url).getContentText();
    Logger.log('Checking submission: ' + submission.title);
    try {
      var dom = XmlService.parse(submissionHtml).getRootElement();
      sheet.getRange(index + 1, 1).setValue(getElementById(dom, 'submission-title').getValue());
      sheet.getRange(index + 1, 3).setValue(getElementById(dom, 'submission-theme').getValue());
      sheet.getRange(index + 1, 4).setValue(getElementById(dom, 'submission-type').getValue());
      sheet.getRange(index + 1, 5).setValue(getElementById(dom, 'submission-author').getValue());
      sheet.getRange(index + 1, 6).setValue(getElementById(dom, 'submission-username').getValue());
      sheet.getRange(index + 1, 7).setValue(getElementById(dom, 'submission-affiliates').getValue());
      sheet.getRange(index + 1, 8).setValue(getElementById(dom, 'submission-time').getValue());
      sheet.getRange(index + 1, 9).setValue(getElementById(dom, 'submission-academic').getValue());
    } catch(e) {
      Logger.log('Error: ' + e); 
    }
  });
}

function getElementById(element, idToFind) {  
  var descendants = element.getDescendants();  
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if(elt !=null) {
      var id = elt.getAttribute('id');
      if(id !=null && id.getValue()== idToFind) return elt;    
    }
  }
}
