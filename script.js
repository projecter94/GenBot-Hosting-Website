// Store for managing raw files in memory and localStorage
const fileStore = {};

document.getElementById('uploadBtn').addEventListener('click', function() {
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value;

    if (!title) {
        alert('Please enter a title for your file');
        return;
    }

    if (!content) {
        alert('Please enter some content');
        return;
    }

    // Create file with title as the filename
    const fileName = title.replace(/\s+/g, '-').toLowerCase();
    
    // Store the file data
    fileStore[fileName] = {
        title: title,
        content: content,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem(`raw_${fileName}`, JSON.stringify(fileStore[fileName]));

    // Redirect to raw file (direct link like GitHub)
    window.location.href = `raw/${fileName}`;
});

document.getElementById('clearBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all content?')) {
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('content').focus();
    }
});

// Generate a clean filename from title
function generateFileName(title) {
    return title.replace(/\s+/g, '-').toLowerCase();
}

// Allow Enter+Ctrl or Enter+Cmd for quick submit (optional enhancement)
document.getElementById('content').addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('uploadBtn').click();
    }
});
