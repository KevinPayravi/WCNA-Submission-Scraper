# WCNA-Submission-Scraper
A Google Apps Script script that parses [WikiConference North America](https://wikiconference.org/) submissions and outputs metadata into a Google Sheet.

## Notes
* The searched category should include submissions and only submissions.
* [XML Service documentation](https://developers.google.com/apps-script/reference/xml-service/)
  * As XML Service requires parsed doms to be strictly correct, the parsing is wrapped in a try-catch and any errors are logged (View->Logs). These logs should be checked after a run to ensure there were no errors/skipped submissions.
* getElementById courtesy [Romain Vialard](https://sites.google.com/site/scriptsexamples/learn-by-example/parsing-html).
