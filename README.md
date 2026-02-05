# Selenium Assignment Scraper

A Node.js tool that automates Google Chrome to scrape assignment data (name, grade, due date) from a Canvas LMS course page. It calculates the remaining time for each assignment and saves the data to a JSON file.

## 🚀 Features

- **Automated Scraping**: Uses Selenium WebDriver to navigate and extract data.
- **Session Persistence**: Connects to your existing Chrome profile to bypass login screens (no need to store credentials in the script).
- **Smart Date Calculation**: Automatically calculates remaining days, hours, and minutes for upcoming assignments.
- **Headless-Ready logic**: (Currently configured for visible mode for debugging) designed to work with Chrome options.
- **JSON Output**: structured data export for easy consumption by other tools or dashboards.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v14 or higher recommended)
- **Google Chrome** browser
- **Operating System**: macOS (script paths are optimized for macOS, but adaptable for Windows/Linux)

## 🛠️ Installation

1.  **Clone the repository** (or download the files):

    ```bash
    git clone https://github.com/nshizirunguwilson/reminder
    cd reminder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## ⚙️ Configuration

The project reads all settings from `config.js`. You **must** configure this file before running the script.

### 1. Set up Chrome Profile Path

To avoid logging into Canvas every time the script runs, we use your existing Chrome profile cookies.

1.  Open your Google Chrome browser.
2.  Navigate to `chrome://version`.
3.  Find the **"Profile Path"** entry.
    - Example: `/Users/username/Library/Application Support/Google/Chrome/Default`
4.  Open `config.js` in your code editor.
5.  Update the `userDataDir` path:
    - Set it to the path **up to** `User Data` (remove the final profile folder name like `/Default`).
    - Example: `/Users/wilson/Library/Application Support/Google/Chrome/User Data`
6.  Update `profileDirectory` (optional, usually leaves as `null` or set to specific profile folder name if needed by your specific Chrome setup, mostly handled by `userDataDir` argument in this script).

> [!IMPORTANT]
> **Close all Chrome windows** before running the script. Selenium cannot attach to a profile that is already in use by the main Chrome process.

### 2. Configure Target URL

In `config.js`, update the `baseUrl` to point to the specific Canvas assignments page you want to scrape:

```javascript
baseUrl: "https://alueducation.instructure.com/courses/YOUR_COURSE_ID/assignments",
```

### 3. Update CSS Selectors

Websites change. If the scraper stops working, inspect the page (`Right Click` -> `Inspect`) and update the `selectors` object in `config.js`:

- `assignmentItem`: The container for a single assignment row.
- `name`: Selector for the assignment title link.
- `dueDate`: Selector for the due date text.
- `grade`: Selector for the grade display.

## 🏃 Usage

Run the scraper using npm:

```bash
npm start
```

### What happens next?

1.  A new Chrome window will open.
2.  It will navigate to the `baseUrl`.
3.  It finds assignments and scrapes the details.
4.  The browser window might remain open (depending on script config) or close.
5.  Data is saved to `assignments.json`.

## 📂 Project Structure

- **`scraper.js`**: Main entry point. Initializes Selenium, launches Chrome, scrapes data, and saves it.
- **`config.js`**: Central configuration for URLs, file paths, and CSS selectors.
- **`assignments.json`**: (Generated) The output file containing the scraped data.
- **`package.json`**: Project dependencies and scripts.

## ❓ Troubleshooting

| Issue                                 | Possible Solution                                                                                                                                                             |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"Chrome failed to start: crashed"** | You likely have Chrome open. **Quit Chrome completely** (Cmd+Q) and try again.                                                                                                |
| **"Element not found"**               | The CSS selectors in `config.js` might be outdated or the page failed to load fully. Check your internet connection or update selectors.                                      |
| **Login required?**                   | If the script opens a login page instead of assignments, your session might have expired. Open Chrome manually, log in to Canvas, then close Chrome and run the script again. |

## 📝 License

This project is for educational purposes.
