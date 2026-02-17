// 1. Copy this code into extensions > Apps Script in your Google Sheet
// 2. Publish > Deploy as Web App
// 3. Set 'Who has access' to 'Anyone'
// 4. Copy the Web App URL and paste it into your .env file as VITE_GOOGLE_SCRIPT_URL

function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Expected fields: Name, StudentID, Score, TimeUsed, Date
    sheet.appendRow([
        data.Name,
        data.StudentID,
        data.Score,
        data.TimeUsed,
        data.Date
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
    // Run this function once to set up headers if sheet is empty
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Name", "Student ID", "Score", "Time Used", "Date"]);
    }
}
