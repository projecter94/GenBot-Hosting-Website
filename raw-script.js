// Get the filename from the URL path
const pathSegments = window.location.pathname.split('/').filter(Boolean);
const fileName = pathSegments[pathSegments.length - 1];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFile();
});

function loadFile() {
    if (!fileName) {
        showError('No file specified');
        return;
    }

    // Try to get from localStorage
    const storedData = localStorage.getItem(`raw_${fileName}`);
    
    if (storedData) {
        try {
            const fileData = JSON.parse(storedData);
            displayFile(fileData);
        } catch (error) {
            showError('Failed to load file');
        }
    } else {
        showError('File not found');
    }
}

function displayFile(fileData) {
    const { content } = fileData;
    
    // Display content as plain text
    document.getElementById('content').textContent = content;
}

function showError(message) {
    document.getElementById('content').textContent = `Error: ${message}`;
}
