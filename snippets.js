// code snippets from node console

var _ = require("underscore"),
    fs = require("fs"),
    request = require("request"),
    iconv = require("iconv-lite");

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

var parsePage = function(url, callbackFn, errorFn) {
	request({uri: url, encoding: null}, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			// 1. convert from 'content-type': 'text/html; charset=windows-1251' to utf8 
			var encoding = response.headers['content-type'].match(/charset=(.*)$/)[1];
			console.log("Found encoding: " + encoding);
			var data = iconv.decode(body, encoding);
			// 2. parse html page and extract required data
			callbackFn(response, data);
		} else {
			console.log("Error while get url " + url + "\r\n" + "Error: " + err +
				"\r\n" + "HTTP code " + response.statusCode);
			errorFn(err, response);
		};
	});
};

/**
var http = require("http");

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("Hello World");
  	response.end();
}).listen(8080);
*/

/*
parsePage("http://samlib.ru/k/kotikowa_m_w/indexdate.shtml", 
	function(response, body) {
		console.log(body);
	}, 
	function(err, response) {});
*/

var htmlparser = require("htmlparser"), sys = require("sys");

var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
        console.log(error);
    else
        console.log("done");
}, {verbose: false, ignoreWhitespace: true});
var rawHtml = fs.readFileSync("D:/prj/yass/tests/test.html", "utf8");
var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
var nameA = htmlparser.DomUtils.getElementsByTagName("h3", handler.dom);
sys.puts(sys.inspect(nameA, false, null));	
var nameA = htmlparser.DomUtils.getElementsByTagName("dl", handler.dom);
sys.puts(sys.inspect(nameA, false, null));	