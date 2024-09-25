const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve the 'reels' folder statically
app.use('/reels', express.static(path.join(__dirname, 'reels')));

// GET request to fetch all video files from the reels folder
app.get('/api/reels', (req, res) => {
    const directoryPath = path.join(__dirname, 'reels');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan directory' });
        }
        
        // Filter out non-video files (you can add more extensions if needed)
        const videoFiles = files.filter(file => file.endsWith('.mp4'));

        // Construct the response structure
        const reels = videoFiles.map((file, index) => ({
            thumb: "https://stockomarket.com/apps/reel-preview.png", // Placeholder thumbnail
            video: `${req.protocol}://${req.get('host')}/reels/${file}`, // Full URL of the video
            video_text: "" // Optional: Add video text if needed
        }));

        res.json({
            reels,
            totalCounts: reels.length
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
