"use strict";

var utils = require("../utils"),
    fs = require("fs"),
    assert = require("assert");

var testHeaders = {'content-type': 'text/html; charset=windows-1251'};
var testHeaders2 = {'content-type': 'text/html'};
var testHeaders3 = {};
var testHeaders4 = {'content-type': 'text/html; charset=windows-1252'};

var rawData = fs.readFileSync("./test1251.txt"); // read a raw buffer

var data = utils.decodeRaw(testHeaders, rawData);
var data2 = utils.decodeRaw(testHeaders2, rawData);
var data3 = utils.decodeRaw(testHeaders3, rawData);
var data4 = utils.decodeRaw(testHeaders4, rawData);

assert.equal(data, data2, "Decoded data should be equal (data/data2)");
assert.equal(data, data3, "Decoded data should be equal (data/data3)");
assert.notEqual(data, data4, "Decoded data should be non-equal (data/data4)");
