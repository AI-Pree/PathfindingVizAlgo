const express = require('express')
const app = express();
const path = require('path')
const port = 5000;

/* using middleware to serve static files */
app.use('/public', express.static(__dirname + '/public'));

/* setting the default index route */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () =>{
	console.log("server is starting at http://localhost:" + port);
});
