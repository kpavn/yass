/*jslint nomen: true, node: true, stupid: true */
"use strict";
// code snippets from node console

var _ = require("underscore"),
    fs = require("fs"),
    request = require("request"),
    iconv = require("iconv-lite"),
	htmlparser = require("htmlparser"),
	sys = require("sys"),
	utils = require("./utils");

// convert author's data from | delimited text file to JSON array
var convertData = function () {
	var rawData, lines, auData, fields;

	rawData = fs.readFileSync("d:/tmp/data/authors.txt", "utf8");
	if (!rawData) {
		console.error("Error while reading file");
	}

	lines = rawData.split("\r\n");

	auData = _.map(lines, function (line) {
		fields = line.split("|");
		return {authorName: fields[0], authUrl: fields[1], bookUrls: _.rest(fields, 2)};
	});

	fs.writeFileSync("d:/tmp/data/authors.json", JSON.stringify(auData), "utf8");

	console.log("Convertation is finished");
};

var parseHtml = function (htmlData, onOk, onError) {
	var handler, parser;
	handler = new htmlparser.DefaultHandler(
		function (error, dom) {
			if (error) {
				onError(error);
			} else {
				// 1. Поиск имени автора body -> h3 -> имя -> br
				// 2. Поиск произведений dl -> dt -> li -> данные по книжке
				onOk();
			}
		},
		{verbose: false, ignoreWhitespace: true}
	);
	parser = new htmlparser.Parser(handler);
	parser.parseComplete(htmlData);
};

var parsePage = function (url, callbackFn, errorFn) {
	request({uri: url, encoding: null}, function (err, response, body) {
		if (!err && response.statusCode === 200) {
			// 1. convert from 'content-type': 'text/html; charset=windows-1251' to utf8
			var data = utils.decodeRaw(response.headers, body);
			// 2. parse html page and extract required data
			parseHtml(data, callbackFn, errorFn);
		} else {
			errorFn(err);
		}
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
