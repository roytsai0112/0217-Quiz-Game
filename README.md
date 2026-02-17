# 0217 Quiz Game

A modern web-based quiz game featuring a glassmorphism UI, global timer, and Google Sheets integration.

## 🚀 Features
- **Online Question Bank**: Load questions from a local CSV or live Google Sheet.
- **Auto-Grading**: real-time scoring and result calculation.
- **Cloud Logging**: automatically logs student results to a Google Sheet (optional).
- **Result Export**: download results as a CSV file.

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
4.  Copy the link and paste it into `.env` (use `.env.example` as a template):
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

## 🚀 Deployment to GitHub Pages (Automated)

This project includes a **GitHub Action** to automatically build and deploy to GitHub Pages.

### Setup Instructions:
1.  **Push Code to GitHub**:
    Initialize a repository and push your code to the `main` branch.

2.  **Configure Environment Secrets**:
    Go to your GitHub Repository > **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
    Add the following secrets (values from your `.env` file):
    -   `VITE_GOOGLE_SHEET_CSV_URL`: Your published CSV URL.
    -   `VITE_GOOGLE_SCRIPT_URL`: Your Apps Script Web App URL.

3.  **Check Permissions**:
    Go to **Settings** > **Actions** > **General** > **Workflow permissions**.
    Ensure **Read and write permissions** is selected.

4.  **Wait for Build**:
    The Action will automatically run on every push to `main`.
    Go to the **Actions** tab to see the progress.

5.  **Enable Pages**:
    Once the first build is successful, a `gh-pages` branch will be created.
    Go to **Settings** > **Pages**.
    Set **Source** to `Deploy from a branch`.
    Select **Branch**: `gh-pages` / `root`.
    Click **Save**.

Your site will be live at: `https://<your-username>.github.io/<repo-name>/`
