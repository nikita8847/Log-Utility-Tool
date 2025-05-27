const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// For all other routes, serve index.html (React Router support)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
//   app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
