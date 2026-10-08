const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint for Video Download URL
app.post('/api/download', (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: 'ویڈیو کی لنک درج کریں!' });
  }

  // yt-dlp کا استعمال کرتے ہوئے ویڈیو کا ڈائریکٹ ڈاؤن لوڈ لنک نکالنا
  const command = `yt-dlp -g -f "best[ext=mp4]/best" "${videoUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: 'ویڈیو پروسیس کرنے میں ناکامی ہوئی۔' });
    }

    const downloadUrl = stdout.trim();
    
    return res.json({
      success: true,
      downloadUrl: downloadUrl,
      filename: 'video.mp4'
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
