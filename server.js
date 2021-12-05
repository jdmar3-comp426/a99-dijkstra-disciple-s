var express = require("express")
var app = express()

var logindb = require("./database.js")
var scoredb = require("./score.js")

//require cors module
const cors = require("cors")
const md5 = require("md5")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//make express use cors
app.use(cors());

var HTTP_PORT = 5000

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/app/", (req, res, next) => {
    res.json({"message": "OK (200)"});
    res.status(200);
});

app.get("/app/users/", (req, res) => {	
	const stmt = logindb.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

app.post("/app/new/user", (req, res, next) => {
	console.log(req.body);
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass) : null
	}
	const stmt = logindb.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
	const info = stmt.run(data.user, data.pass);
	res.status(201).json({"message": info.changes+ " record created: ID " + info.lastInsertRowid + " (201)"});
});

// Create a new user; adds login info to login db and creates new stats db entry with base stats
app.post("/app/new/", (req, res) => {
    const stmtA = logindb.prepare('INSERT INTO userinfo (user, pass) VALUES (?, ?)');
	const info = stmtA.run(req.body.user, req.body.pass);
    const stmtB = scoredb.prepare('INSERT INTO scoresinfo (scores)');
	// Currently have it just assigning null to the opposing team name when an account is first created since team simuation stuff hasn't run yet
    stmtB.run(0);
	res.json({"message":"1 record created: ID %id% (201)".replace("%id%", info.lastInsertRowid)})
	res.status(201);
});

// Read a user's login info from login db at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {
    const stmt = logindb.prepare("SELECT * FROM userinfo WHERE id = ?");
	const user = stmt.get( req.params.id );
	if (userInfo != undefined) {
		res.status(200).json(userInfo);
	  } else {
		res.status(404).json({"message": "User not found"})
	  }
	  res.json(userInfo);
});

// LOGIN for a single user at endpoint /app/login
app.get("/app/login/:user/:pass", (req, res) => {	
	const stmt = logindb.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?");
  const userInfo = stmt.get(req.params.user, md5(req.params.pass))
  if (userInfo != undefined) {
    res.status(200).json(userInfo);
  } else {
    res.status(404).json({"message": "User not found"})
  }
  res.json(userInfo);
});
// READ a user's stats at endpoint /app/stats/:id
app.get("/app/stats/:id", (req, res) => {
	const stmt = statsdb.prepare("SELECT * FROM statsinfo WHERE id = ?");
	const output = stmt.get(req.params.id);
	res.status(200).json(output);
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req, res) => {
	const stmt = logindb.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?");
	const output = stmt.run(req.body.user, req.body.pass, req.params.id);
	res.json({"message":"1 record updated: ID %id% (200)".replace("%id%", req.params.id)});
	res.status(200);
});

//Update a user's stats at endpoint /app/update/stats/:id
app.patch("/app/update/stats/:id", (req, res) => {
    const stmt = statsdb.prepare("UPDATE statsinfo SET wins = COALESCE(?, wins), losses = COALESCE(?, losses), points = COALESCE(?, points), draftPoints = COALESCE(?, draftPoints), basketballs = COALESCE(?, basketballs), basketballCost = COALESCE(?, basketballCost), jordans = COALESCE(?, jordans), jordansCost = COALESCE(?, jordansCost), jerseys = COALESCE(?, jerseys), jerseysCost = COALESCE(?, jerseysCost), gatorade = COALESCE(?, gatorade), gatoradeCost = COALESCE(?, gatoradeCost), assistantCoaches = COALESCE(?, assistantCoaches), assistantCoachCost = COALESCE(?, assistantCoachCost), ballHandlingLevel = COALESCE(?, ballHandlingLevel), ballHandlingCost = COALESCE(?, ballHandlingCost), shootingLevel = COALESCE(?, shootingLevel), shootingCost = COALESCE(?, shootingCost), defenseLevel = COALESCE(?, defenseLevel), defenseCost = COALESCE(?, defenseCost), playmakingLevel = COALESCE(?, playmakingLevel), playmakingCost = COALESCE(?, playmakingCost), finishingLevel = COALESCE(?, finishingLevel), finishingCost = COALESCE(?, finishingCost), rosterMultiplier = COALESCE(?, rosterMultiplier), love = COALESCE(?, love), black = COALESCE(?, black), garcia = COALESCE(?, garcia), manek = COALESCE(?, manek), bacot = COALESCE(?, bacot), time = COALESCE(?, time), opposingName = COALESCE(?, opposingName), opposingBallHandling = COALESCE(?, opposingBallHandling), opposingShooting = COALESCE(?, opposingShooting), opposingDefense = COALESCE(?, opposingDefense), opposingPlaymaking = COALESCE(?, opposingPlaymaking), opposingFinishing = COALESCE(?, opposingFinishing) WHERE id = ?");
    stmt.run(req.body.wins, req.body.losses, req.body.points, req.body.draftPoints, req.body.basketballs, req.body.basketballCost, req.body.jordans, req.body.jordansCost, req.body.jerseys, req.body.jerseysCost, req.body.gatorade, req.body.gatoradeCost, req.body.assistantCoaches, req.body.assistantCoachCost, req.body.ballHandlingLevel, req.body.ballHandlingCost, req.body.shootingLevel, req.body.shootingCost, req.body.defenseLevel, req.body.defenseCost, req.body.playmakingLevel, req.body.playmakingCost, req.body.finishingLevel, req.body.finishingCost, req.body.rosterMultiplier, req.body.love, req.body.black, req.body.garcia, req.body.manek, req.body.bacot, req.body.time, req.body.opposingName, req.body.opposingBallHandling, req.body.opposingShooting, req.body.opposingDefense, req.body.opposingPlaymaking, req.body.opposingFinishing, req.params.id);
    res.json({"message":"1 record updated: ID %id% (200)".replace("%id%", req.params.id)});
	res.status(200);
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
	const stmtA = logindb.prepare("DELETE FROM userinfo WHERE id = ?");
    const stmtB = statsdb.prepare("DELETE FROM statsinfo WHERE id = ?");
	stmtA.run(req.params.id);
    stmtB.run(req.params.id);
	res.json({"message":"1 record deleted: ID %id% (200)".replace("%id%", req.params.id)});
	res.status(200);
});
// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});