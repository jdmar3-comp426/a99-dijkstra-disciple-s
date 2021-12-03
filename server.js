// Define app using express
var express = require("express")
var app = express()

// Require database SCRIPT file
var db = require("./database.js")

// Require md5 MODULE
var md5 = require("md5")

// Require cors MODULE
const cors = require("cors")

// also use multer for form-data
const multer = require("multer")
const upload = multer()

const bodyParser = require('body-parser'); // Middleware 

app.use(bodyParser.urlencoded({ extended: false }));



// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make Express use CORS
app.use(cors());

// Set server port
var HTTP_PORT = 5000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

/*app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
  });
  
// Route to Login Page
app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/login.html');
  });
*/
//for loggin in 
app.post('/logout', (req, res) => {
	// Insert Login Code Here
	request.session.loggedin = false;
	request.session.username = null;
	response.send('Logged out succesfully');
});

app.post('/app/login', function(request, response) {
	var email = request.body.email;
	var pass = request.body.pass;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE eamil = ? AND pass = ?', [email, pass], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({ "message": "Your API works! (200)" });
    res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3

// EXAMPLE CODE: var data = {user: req.body.user, pass: req.body.pass ? md5(req.body.pass) : null}
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/user", upload.none(), (req, res, next) => {
    var data = {
        email: req.body.email,
        pass: req.body.pass ? md5(req.body.pass) : null
    }
    
    const stmt = db.prepare("INSERT INTO userinfo(email, pass) VALUES (?, ?)");
    const info = stmt.run(data.pass, data.email);
    
    res.json({ "message": info.changes + " record created: ID " + info.lastInsertRowid + " (201)" });
    res.status(201);
})



// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {
    const stmt = db.prepare("SELECT * FROM userinfo").all();
    res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {
    const stmt = db.prepare("SELECT * FROM userinfo WHERE id = ?").get(req.params.id);
    res.status(200).json(stmt);
})

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", upload.none(), (req, res) => {
    
    var data = {
        email: req.body.email,
        pass: req.body.pass ? md5(req.body.pass) : null
    }

    const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?, user), pass = COALESCE(?, pass), email = COALESCE(?, email) WHERE id = ?");
    const info = stmt.run( data.pass, data.email, req.params.id);
    
    res.json({ "message": info.changes + " record updated: ID " + req.params.id + " (200)" });
    res.status(200);
})

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
    const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?").run(req.params.id);
    res.json({ "message": stmt.changes + " record deleted: ID " + req.params.id + " (200)" });
    res.status(200);
})

// Default response for any other request
app.use(function (req, res) {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
});