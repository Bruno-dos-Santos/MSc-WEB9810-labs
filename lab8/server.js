const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
// create new app
const app = express();
app.use(express.json());
require('./routes/articles.routes.js')(app);

// Connect to our database
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb+srv://dbUser:5Jb8kWSOfQUQjiM1@weblab8.p1htq.mongodb.net/Blog'
mongoose.connect(dbUrl, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
})
	.then(() => { console.log("Database connected successfully"); })
	.catch(err => {
    			console.log("Couldn't connect to the database");
    			process.exit();
		});

//Start HTTP server
const server = http.createServer(app);
const port = 3000;
server.listen(port);
