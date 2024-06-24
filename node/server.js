const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to log device information
app.post('/log_device_info', (req, res) => {
    const deviceInfo = req.body;
    console.log(deviceInfo);  // Log to console

    // Append the device info to a log file
    fs.appendFile('device_info.log', JSON.stringify(deviceInfo) + '\n', (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
            return res.status(500).send('Internal Server Error');
        }
    });

    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
