// code snippets from node console

var _ = require("underscore"),
    fs = require("fs"),
    request = require("request");

// convert author's data from | delimited text file to JSON array
var convertData = function() {
	var rawData = fs.readFileSync("d:/tmp/data/authors.txt", "utf8");
	if (!rawData) {
		console.error("Error while reading file");
	};

	var lines = rawData.split("\r\n");

	var auData = _.map(lines, function(line) {
		var fields = line.split("|");
		return {authorName: fields[0], authUrl: fields[1], bookUrls: _.rest(fields, 2)};
	});

	fs.writeFileSync("d:/tmp/data/authors.json", JSON.stringify(auData), "utf8");

	console.log("Convertation is finished");	
};

var getPage = function(url) {

};

var http = require("http");

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("Hello World");
  	response.end();
}).listen(8080);
