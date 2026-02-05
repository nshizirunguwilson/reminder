# Selenium Assignment Scraper

This project automates a browser to log in (using an existing profile) and scrape formative assignment data.

## Setup

1.  **Install Node.js**: Ensure you have Node.js installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Chrome Profile**:
    To avoid logging in every time, this script uses your existing Chrome profile.
    - Open Chrome and go to `chrome://version`.
    - Look for **"Profile Path"**.
    - Copy the path up to `User Data` (e.g., `/Users/wilson/Library/Application Support/Google/Chrome/User Data`).
    - Open `config.js` and update `userDataDir` with this path.
    - Update `profileDirectory` (usually "Default" or "Profile 1").

    **Important**: You must close all open Chrome windows before running the script, or it will crash because the profile is locked.

4.  **Configure Target Site**:
    - Open `config.js`.
    - Update `baseUrl` to the website you want to scrape.
    - Update `targetLinkText` to the link you want to click.
    - Inspect the web page (Right Click -> Inspect) to find the CSS classes for assignments. Update the `selectors` object in `config.js`.

## Usage

Run the scraper:

```bash
npm start
```

The data will be saved to `assignments.json`.

## Troubleshooting

- **"Chrome failed to start"**: Make sure you have completely quit your normal Chrome browser.
- **"Element not found"**: Check your selectors in `config.js`. Websites change often.
