# Text to Raw File Website

A simple website to convert text with titles into raw files accessible via direct URLs, similar to GitHub's raw content links.

## 🚀 Quick Start

### Option 1: Using Node.js (Recommended)

1. Make sure you have Node.js installed
2. Open a terminal in this folder
3. Run:
```bash
npm start
```
4. Open `http://localhost:3000` in your browser

### Option 2: Using Python

If you have Python 3 installed:

```bash
python -m http.server 3000
```

Then open `http://localhost:3000` in your browser

### Option 3: Using Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📖 How to Use

1. **Enter a Title**: Write a title for your file (e.g., "My Document")
2. **Write Content**: Paste or write your content in the large text box
3. **Click Upload**: Click "Download as Raw File"
4. **Get Raw Link**: You'll be redirected to a raw file URL like:
   - `http://localhost:3000/raw/my-document`
5. **Share**: Copy this link to share your raw file with others

## 📁 File Structure

```
vanta web/
├── index.html          # Main editor page
├── script.js           # Editor functionality
├── styles.css          # Editor styling
├── raw-script.js       # Raw file viewer script
├── server.js           # Node.js server (for routing)
├── package.json        # Project metadata
├── README.md           # This file
└── raw/
    └── index.html      # Raw file display template
```

## 💾 How Files Are Stored

- Files are stored in your browser's **localStorage**
- Each file is saved with key `raw_[filename]`
- Data persists during your session
- Perfect for local/personal use

## 🎯 Features

✅ Clean, modern interface
✅ Direct raw file URLs (like GitHub)
✅ localStorage persistence
✅ Responsive design
✅ Works on mobile and desktop
✅ Copy and download support

## ⚙️ Configuration

The server runs on port `3000` by default. To change it, edit `server.js` and change:
```javascript
const PORT = 3000; // Change this number
```

## 📝 Notes

- File titles are converted to URLs: "My Document" → `my-document`
- Special characters are removed, spaces become hyphens
- All filenames are lowercase
- Files are stored locally in localStorage

Enjoy! 🎉
