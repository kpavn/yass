var request = require("request"),
    fs = require("fs"),
    http = require("http"),
    sys = require("sys"),
    url = require("url"),
    _ = require("underscore");

var Router = (function () {
	function Router() {
		this.routes = [];
	}
	/**
	  add new route rule
	  @routeMethod - GET, POST, DELETE
	  @routeMask   - mask of url to accept (support for REST urls)
	  @handler     - callback function to serve route, has 2 parameters
	                 @params - params from parsing query string and url
	                 @response - output stream to render
	*/
	Router.prototype.addRoute = function(routeMethod, routeMask, handler) {

	};
	Router.prototype.route = function(method, url, response) {

	};
	return Router;
})();

var router = new Router();
router.addRoute("root", "/", rootHandler);

/**
  route the request
  @method - GET, POST, DELETE
  @data   - result of url.parse of required url
  @response - output stream to render data
*/
var routeR = function(method, data, response) {

};

/**
  http listener
*/
var simpleListener = function(request, response) {
	var requestMethod = request.method;
	var requestData = url.parse(request.url, true);
	console.log("Method: " + requestMethod);
	console.log("Url: " + requestData.pathname);
	routeR(requestMethod, requestData, response);
};

// TODO add configuration for port and host
http.createServer(simpleListener).listen(8080);

console.log("Server is up and running...");