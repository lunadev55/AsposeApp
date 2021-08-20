//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/aspose-test-app'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/aspose-test-app/index.html');
});

const PORT = process.env.PORT || 8080

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
    console.log('Running' + PORT);
});