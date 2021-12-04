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



app.post('/login', function(request, response) {
	var email = request.body.email;
	var pass = request.body.pass;
	if (email && pass) {
		connection.query('SELECT * FROM accounts WHERE email = ? AND pass = ?', [email, pass], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
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
// CREATE a new user (HTTP method POST) at endpoint /app/new/																			*********************
app.post("/app/new/user", (req, res) => {
    var data = {
        email: req.body.email,
        pass: req.body.pass ? md5(req.body.pass) : null,
    }
    
    const stmt = db.prepare("INSERT INTO userinfo(email, pass, logged) VALUES (?, ?, 0)");
    const info = stmt.run(data.email, data.pass);
    
    res.status(201).json({ "message": info.changes + " record created: ID " + info.lastInsertRowid + " (201)" });
})

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users/", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:user
app.get("/app/user/:logged", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE logged = ?").get(req.params.logged);
	res.status(200).json(stmt);
});

app.patch("/app/update/user/:logged", (req, res) => {	
	var data = {
		email: req.body.email,
		pass: req.body.pass ? md5(req.body.pass): null,
	}
	const stmt = db.prepare("UPDATE userinfo SET email = COALESCE(?,email), pass = COALESCE(?,pass) WHERE logged = ?");
	const info = stmt.run(data.email, data.pass, req.params.logged);
	res.status(200).json({"message":info.changes +" record updated: ID " + data.email + " (200)"});
});

// UPDATE a single user to be logged in (HTTP method PATCH) at endpoint /app/update/user/:user/password/:password						**************************************
app.patch("/app/update/user/logged/:logged", (req, res) => {	
	const stmt = db.prepare("UPDATE userinfo SET logged = COALESCE(?, logged) WHERE email = ? AND pass = ?");
	const info = stmt.run(req.params.logged, req.body.email, md5(req.body.pass));
	res.status(200).json({"message":info.changes +" record updated: ID " + req.body.email + " (200)"});
});


// UPDATE a single user to be logged out (HTTP method PATCH) at endpoint /app/update/user/:user/password/:password						TODO ************* LOGOUT
//might also need to add an update score portion
app.patch("/app/update/user/logoff/:logged", (req, res) => {	
	const stmt = db.prepare("UPDATE userinfo SET logged = COALESCE(0, logged) WHERE logged = ?");
	const info = stmt.run(req.params.logged);
	res.status(200).json({"message":info.changes +" record updated: ID " + req.body.email + " (200)"});
});

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

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id															**************** 
app.delete("/app/delete/logged/:logged", (req, res) => {	
	const stmt = db.prepare("DELETE FROM userinfo WHERE logged = ?").run(req.params.logged);
	res.status(200).json({"message":stmt.changes +" record deleted: ID " + req.body.email + " (200)"});
});

// Default response for any other request																								****************
app.use(function (req, res) {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
});