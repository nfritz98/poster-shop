var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var fs = require("fs");
var Pusher = require('pusher');

var pusher = new Pusher({
	appId : "915560",
	key : "3e64ba1b4630ed6b847e",
	secret : "c4fa2cb4bb04d3ef06a8",
	cluster : "eu"
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

var directory;
fs.readFile("./directory.json", "utf8", function(err, data) {
	directory = JSON.parse(data);
	if (err) {
		throw err;
	}
});

app.get("/search", function(req, res) {
	var results = directory.reduce(function(acc, file) {
		if (file.tags.indexOf(req.query.q) !== -1) {
			acc.push({
				id: file.id,
				title: file.title,
				thumb: "/public/images/".concat(file.thumb),
				price: file.price
			});
		}
		return acc;
	}, []);
	res.send(results);
});

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/public", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV !== "production") {
	require("reload")(app);
}

var port = process.env.PORT || 3001;
server.listen(port, function () {
	console.log("Listening on port ".concat(port));
});

//handle pusher-requests
app.post('cart_update', function (req, res) {
	console.log('update receided :)');
	pusher.trigger('cart', 'update', req.body);
});
