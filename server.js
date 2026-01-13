const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Prevent crash on unhandled errors
process.on('uncaughtException', (err) => {
    console.error('CRITICAL ERROR (Uncaught Exception):', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL ERROR (Unhandled Rejection):', reason);
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving index.html
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const server = app.listen(PORT, () => {
    console.log('');
    console.log('=================================================');
    console.log('   SAWBHAVI POS SYSTEM - RUNNING');
    console.log('=================================================');
    console.log('');
    console.log('   The application is now running at:');
    console.log(`   http://localhost:${PORT}`);
    console.log('');
    console.log('   Opening in your browser...');
    console.log('');
    console.log('   DO NOT CLOSE THIS WINDOW');
    console.log('   Closing this window will stop the application');
    console.log('');
    console.log('=================================================');
    console.log('');

    // Open browser automatically after a short delay
    setTimeout(async () => {
        try {
            const { default: open } = await import('open');
            await open(`http://localhost:${PORT}`);
        } catch (err) {
            console.error('Failed to open browser:', err);
            console.log('Please open the URL manually.');
        }
    }, 1000);
});

// Handle launch errors (e.g. invalid port)
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('ERROR: Port 3000 is already in use!');
        console.error('Please close other running instances (like npm run dev) and try again.');
    } else {
        console.error('SERVER ERROR:', e);
    }
});
