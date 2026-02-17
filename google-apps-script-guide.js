// Step 1: Open your Google Sheet
// Step 2: Click "Extensions" > "Apps Script" in the top menu
// Step 3: Delete all code in the editor and paste the code below:

function doPost(e) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // *** Configuration: Sheet Name ***
    // Change this to the exact name of your sheet (tab) at the bottom
    var sheetName = "Sheet2";

    var sheet = ss.getSheetByName(sheetName);

    // If sheet doesn't exist, create it automatically
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        // Headers: Name, ID, Score, Time Record, Date
        sheet.appendRow(["Name", "ID", "Score", "Time Record", "Date"]);
    }

    // Parse incoming data
    var data = JSON.parse(e.postData.contents);

    // Append data row (Order must match the headers)
    sheet.appendRow([
        data.Name,
        data.StudentID,  // Maps to ID
        data.Score,
        data.TimeUsed,   // Maps to Time Record
        data.Date
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

// Step 4: Save (Ctrl + S)
// Step 5: Click "Deploy" > "New deployment"
// Step 6: Settings:
//    - Select type: "Web app"
//    - Description: "Quiz Logger"
//    - Execute as: Me
//    - *** Who has access: Anyone *** (CRITICAL!)
// Step 7: Click "Deploy".
// Step 8: Copy the "Web app URL" (starts with https://script.google.com/...)
// Step 9: Paste the URL into your .env file as VITE_GOOGLE_SCRIPT_URL
