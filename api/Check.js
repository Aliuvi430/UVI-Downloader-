// server.js
const express = require('express');
const cors = require('cors'); // Essential to allow your website to talk to a different port/domain
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows the backend to read JSON sent from the website

// 1. GET Route: Sends data to your website
app.get('/api/data', (req, res) => {
    const sampleData = {
        message: "Hello from the backend!",
        status: "Success",
        timestamp: new Date()
    };
    res.json(sampleData); // Sends response back as JSON
});

// 2. POST Route: Receives data sent from your website
app.post('/api/submit', (req, res) => {
    const userData = req.body; 
    console.log("Received from website:", userData);
    
    // Process data here (e.g., save to a database)
    res.json({ message: `Data received for user: ${userData.name}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
                                                   
