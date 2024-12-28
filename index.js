const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ZKTeco = require('zkteco');  // Import the ZKTeco package

// Create an Express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: '*'
}));

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/Crud_Node');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Sample routes (replace these with your actual routes)
const post_route = require('./routes/postRoutes');
const blog_route = require('./routes/blogRoutes');
app.use('/api', post_route);
app.use('/api_blog', blog_route);

// Define ZKTeco device details
const deviceIp = '203.99.181.17';  // Replace with your device's IP address
const port = 4370;  // Default port for ZKTeco devices

// Ensure devices is passed as an array
const devices = [
    { deviceIp, devicePort: port },
];

// Create a new ZKTeco object
const zk = new ZKTeco(devices);

// Route to get attendance data
app.get('/api/attendance', async (req, res) => {
    try {
        // Connect to the device and retrieve attendance data
        await zk.connect();
        console.log('Connected to device');

        // Fetch attendance logs
        const attendanceData = await zk.getAttendances();

        // Log the response to check
        console.log('Attendance Data:', attendanceData);
        
        if (!attendanceData || attendanceData.length === 0) {
            res.status(404).json({ error: 'No attendance data found' });
        } else {
            res.json(attendanceData);
        }
    } catch (err) {
        console.error('Error fetching attendance:', err);
        res.status(500).json({ error: 'Failed to fetch attendance data' });
    }
});

// Start the server on port 5002
app.listen(5003, () => {
    console.log('Server is listening on port 5002');
});
