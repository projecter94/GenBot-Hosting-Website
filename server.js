const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle raw file requests: /raw/filename
    if (pathname.startsWith('/raw/')) {
        const fileName = pathname.slice(5); // Remove '/raw/'
        
        if (!fileName || fileName === '') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        // Set content type for raw files
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        
        // Return a simple HTML that loads the raw file viewer
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raw File - ${fileName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', monospace;
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            line-height: 1.6;
        }

        .header {
            background: #333;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header h1 {
            font-size: 1.2em;
            color: #667eea;
        }

        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background: #1e1e1e;
            padding: 20px;
            border: 1px solid #333;
            border-radius: 4px;
            overflow-x: auto;
        }

        a {
            color: #667eea;
            text-decoration: none;
            padding: 8px 12px;
            background: #444;
            border-radius: 4px;
            font-size: 0.9em;
        }

        a:hover {
            background: #555;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📄 ${fileName}</h1>
        <a href="/">← Back</a>
    </div>
    <pre id="content">Loading...</pre>
    <script>
        const fileName = '${fileName}';
        
        // Try to load from localStorage
        const storedData = localStorage.getItem('raw_' + fileName);
        if (storedData) {
            try {
                const fileData = JSON.parse(storedData);
                document.getElementById('content').textContent = fileData.content;
                document.title = fileName;
            } catch (e) {
                document.getElementById('content').textContent = 'Error: Could not load file';
            }
        } else {
            document.getElementById('content').textContent = 'Error: File not found. Please create it in the editor first.';
        }
    </script>
</body>
</html>`;
        
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
        return;
    }

    // Serve static files
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    const filePath = path.join(__dirname, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access denied');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File not found');
            return;
        }

        if (stats.isDirectory()) {
            fs.readFile(path.join(filePath, 'index.html'), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - Not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            });
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const contentTypeMap = {
                '.html': 'text/html; charset=utf-8',
                '.css': 'text/css; charset=utf-8',
                '.js': 'text/javascript; charset=utf-8',
                '.json': 'application/json',
                '.txt': 'text/plain; charset=utf-8',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
            };

            const contentType = contentTypeMap[ext] || 'application/octet-stream';

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 - Server error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Text to Raw File Server Running      ║
╠════════════════════════════════════════╣
║   📍 http://localhost:${PORT}            ║
║   📂 Root: ${__dirname}   ║
╚════════════════════════════════════════╝
    `);
});
