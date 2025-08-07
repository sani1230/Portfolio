const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load valid codes from JSON file
const codesDB = JSON.parse(fs.readFileSync('validCodes.json', 'utf-8'));

app.use(express.static(path.join(__dirname, 'public')));

// Route to handle code submission
app.get('/check/:code', (req, res) => {
  const code = req.params.code;

  if (codesDB.validCodes.includes(code)) {
    const filePath = path.join(__dirname, 'public', 'pages', `${code}.html`);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
  } else {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  }
});

// Custom 404 for any unmatched routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
