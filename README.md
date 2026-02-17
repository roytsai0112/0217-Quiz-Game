# 0217 Quiz Game

A modern web-based quiz game featuring a glassmorphism UI, global timer, and Google Sheets integration.

## 🚀 Features
- **Online Question Bank**: Load questions from a local CSV or live Google Sheet.
- **Auto-Grading**: Real-time scoring and result calculation.
- **Cloud Logging**: Automatically logs student results to a Google Sheet (optional).
- **Result Export**: Download results as a CSV file.

## 🛠️ Setup & Operation

### 1. Installation
Ensure you have Node.js installed.
```bash
npm install
```

### 2. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Google Sheets Integration (Questions)
To load questions from Google Sheets:
1.  Create a Google Sheet with headers: `Question`, `OptionA`, `OptionB`, `OptionC`, `OptionD`, `CorrectAnswer`.
2.  **File** > **Share** > **Publish to web**.
3.  Choose **Comma-separated values (.csv)** as the format.
4.  Copy the link and paste it into `.env`:
    ```env
    VITE_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/.../pub?output=csv
    ```
5.  Restart the dev server.

### 4. Google Sheets Integration (Results Logging)
To automatically save results to Google Sheets:
1.  Create a new Google Sheet.
2.  Go to **Extensions** > **Apps Script**.
3.  Copy the code from `google-apps-script-guide.js` in this project into the script editor.
4.  Run the `setup()` function once to create headers.
5.  Click **Deploy** > **New Deployment**.
    -   Select type: **Web app**.
    -   Execute as: **Me**.
    -   Who has access: **Anyone** (Important!).
6.  Copy the **Web App URL**.
7.  Paste it into `.env`:
    ```env
    VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
    ```
8.  Restart the dev server.

## 📦 Build for Production
To build the app for deployment:
```bash
npm run build
```
The output will be in the `dist` folder.
