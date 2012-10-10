/*jslint nomen: true, node: true, stupid: true */
"use strict";
var iconv = require("iconv-lite");

/**
  Convert raw html page (encoding determines by content-type http header) to utf-8
*/
var decodeRaw = function (httpHeaders, rawData) {
	var contentType, matches, encoding;

	contentType = httpHeaders['content-type'];

	if (typeof contentType !== "undefined") {
		matches = contentType.match(/charset=([\w\d\-]+)$/);
	}

	encoding = (typeof matches === "undefined" || matches === null) ? "windows-1251" : matches[1];
	return iconv.decode(rawData, encoding);
};

exports.decodeRaw = decodeRaw;
