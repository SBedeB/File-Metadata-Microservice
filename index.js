// Import necessary modules
var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Import multer for handling file uploads
require('dotenv').config();

var app = express();
var upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Middleware for logging requests
// This middleware logs the HTTP method, URL, and IP address for every incoming request.
app.use((req, res, next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
  next();
});

app.use(cors()); // Enable CORS
app.use('/public', express.static(process.cwd() + '/public')); // Serve static files

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html'); // Serve HTML file
});

// Route for handling file uploads
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' }); // Test 2: If no file is uploaded, return an error
  }

  const { originalname, mimetype, size } = req.file;

  // Test 4: When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
  res.json({ name: originalname, type: mimetype, size: size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
