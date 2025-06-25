# Gemini Ctrl+N - New Chat Hotkey

A browser script that adds keyboard shortcuts to quickly create new chats in Google's Gemini AI interface, similar to how Ctrl+M creates new slides in Google Slides.

## 🚀 What This Does

This script adds platform-specific keyboard shortcuts to Gemini that instantly create a new chat:

- **macOS**: `Ctrl+M` or `Ctrl+N`
- **Windows/Linux**: `Ctrl+M` or `Ctrl+Shift+N`

No more clicking around - just press the hotkey and start a fresh conversation with Gemini!

## 📁 Script Location

The main script is located at: [`src/script.js`](src/script.js)

## 🛠️ Installation

### For Arc Browser (Recommended)

Arc Browser has built-in support for custom scripts through **Boosts**:

1. **Open Gemini** in Arc Browser (`gemini.google.com`)
2. **Right-click** on the page and select **"New Boost for this site"**
3. **Choose "Custom"** boost type
4. **Copy the script** from [`src/script.js`](src/script.js)
5. **Paste it** into the boost editor
6. **Save** the boost
7. The script will now run automatically whenever you visit Gemini!

### For Chrome, Edge, Brave, and Other Browsers

Use a userscript manager like Tampermonkey:

#### Step 1: Install Tampermonkey

- **Chrome**: [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Edge**: [Install from Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- **Firefox**: [Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

#### Step 2: Create the Userscript

1. **Click** the Tampermonkey extension icon
2. **Select** "Create a new script"
3. **Replace** the default template with this:

```javascript
// ==UserScript==
// @name         Gemini New Chat Hotkey
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add Ctrl+N hotkey for new chat in Gemini
// @author       You
// @match        https://gemini.google.com/*
// @grant        none
// ==/UserScript==

// Paste the contents of src/script.js here
```

4. **Copy the entire contents** of [`src/script.js`](src/script.js)
5. **Paste it** after the userscript header (replacing the comment)
6. **Save** the script (Ctrl+S)

#### Step 3: Enable and Test

1. **Refresh** your Gemini tab
2. **Press** your platform's hotkey to test:
   - **macOS**: `Ctrl+M` or `Ctrl+N`
   - **Windows/Linux**: `Ctrl+M` or `Ctrl+Shift+N`

## 🎯 Supported Hotkeys

| Platform          | Hotkeys        | Description                     |
| ----------------- | -------------- | ------------------------------- |
| **macOS**         | `Ctrl+M`       | Google Slides style (universal) |
| **macOS**         | `Ctrl+N`       | macOS-specific new chat         |
| **Windows/Linux** | `Ctrl+M`       | Google Slides style (universal) |
| **Windows/Linux** | `Ctrl+Shift+N` | Windows convention              |

## 🐛 Troubleshooting

### Script Not Working?

1. **Open browser console** (F12 → Console tab)
2. **Look for** initialization messages like:
   ```
   Gemini new chat hotkey script loaded
   Platform detected: macOS
   Gemini new chat hotkey script initialized.
   ```

### Can't Find the New Chat Button?

Run this in the console to debug:

```javascript
debugGeminiNewChat();
```

This will show all potential new chat buttons on the page and test each selector.

### Check Available Hotkeys

Run this in the console:

```javascript
showGeminiHotkeys();
```

## 🔧 Customization

Want to modify the hotkeys? Edit the `HOTKEY_CONFIG` object in [`src/script.js`](src/script.js):

```javascript
const HOTKEY_CONFIG = {
  mac: [
    {
      keys: { ctrl: true, key: "m" },
      name: "Ctrl+M",
      description: "Google Slides style",
    },
    // Add your custom hotkey here
  ],
  windows: [
    {
      keys: { ctrl: true, key: "m" },
      name: "Ctrl+M",
      description: "Google Slides style",
    },
    // Add your custom hotkey here
  ],
};
```

## 📝 How It Works

1. **Platform Detection**: Automatically detects if you're on macOS or Windows/Linux
2. **Event Listening**: Monitors keyboard events for the configured hotkeys
3. **Button Finding**: Searches for the new chat button using multiple selectors
4. **Click Simulation**: Programmatically clicks the button when hotkey is pressed

## 🤝 Contributing

Found a bug or want to improve the script? Feel free to:

- Open an issue
- Submit a pull request
- Suggest new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy faster Gemini conversations! 🚀**
