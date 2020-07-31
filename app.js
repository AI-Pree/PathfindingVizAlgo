const express = require('express')
const app = express();

const port = 5000;

/* using middleware to serve static files */
app.use('/public', express.static(__dirname + 'public')));


app.get('/', (req, res) => {
	res.sendFile(__dirname + 'index.html'));
});

app.listen(port, () =>{
	console.log("server is starting");
});
