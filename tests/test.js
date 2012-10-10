var snippets = require("../snippets"),
    fs = require("fs"),
    assert = require("assert");

var testHeaders = {'content-type': 'text/html; charset=windows-1251'};
var testHeaders2 = {'content-type': 'text/html'};
var testHeaders3 = {};

var rawData = fs.readFileSync("./test1251.txt"); // read a raw buffer

var data = snippets.decodeRaw(testHeaders, rawData);
var data2 = snippets.decodeRaw(testHeaders2, rawData);
var data3 = snippets.decodeRaw(testHeaders2, rawData);

assert.equal(data, data2, "Decoded data should be equal (data/data2)");
assert.equal(data, data3, "Decoded data should be equal (data/data3)");
