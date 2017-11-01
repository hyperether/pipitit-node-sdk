//Get required modules
var util         = require('util');
var Request      = require('request');
var pipititError = require('./pipititError');

var METHODS = {
  POST: 'post',
  GET: 'get',
  DELETE: 'del',
  PUT: 'put'
};

var pipitit = function(config) {
  this.options = {
    protocol: 'http',
    host: 'api.pipitit.com',
    userAgent: "Pipitit-Node-SDK"
  };
  if (!config) {
    throw new pipititError('Must provide pipitit basic configuration');
  }

  if (typeof config != 'object') {
    throw new pipititError('Config need to be object');
  }

  if (!config.authId || !config.authSecret) {
    throw new pipititError('Auth ID and Auth Secret are mandatory');
  }

  // override default config according to the config provided.
  for (var key in config) {
    this.options[key] = config[key];
  }
};

//APP APIs

/**
 * Create new application
 * @param params - {name : "application name", description: "application description"}
 * @param callback
 */
pipitit.prototype.appCreate = function(params, callback) {
  var base   = 'app/create/';
  var method = 'POST';

  this.request(base, method, params, callback);
};

/**
 * Delete application
 * @param appId - application id
 * @param callback
 */
pipitit.prototype.appDelete = function(appId, callback) {
  var base   = appId + '/app';
  var method = 'DELETE';

  this.request(base, method, {}, callback);
};

/**
 * Update application push params
 *
 * @param appId - application id
 * @param type - Type of platform android, ios, amazon, ...
 * @param params
 * @param callback
 */
pipitit.prototype.appUpdateParams = function(appId, type, params, callback) {
  var base   = appId + '/' + type;
  var method = 'POST';

  this.request(base, method, params, callback);
};

//JOB APIs

/**
 * Create new job
 * @param appId - application id
 * @param params
 * @param callback
 */
pipitit.prototype.jobCreate = function(appId, params, callback) {
  var base   = appId + '/job/create';
  var method = 'POST';

  this.request(base, method, params, callback);
};

/**
 * List application jobs
 * @param appId - application id
 * @param callback
 */
pipitit.prototype.jobList = function(appId, callback) {
  var base   = appId + '/job/list';
  var method = 'GET';

  this.request(base, method, {}, callback);
};

/**
 * Returns application job details
 * @param appId - application id
 * @param jobId - job id
 * @param callback
 */
pipitit.prototype.jobDetail = function(appId, jobId, callback) {
  var base   = appId + '/job/list/' + jobId;
  var method = 'GET';

  this.request(base, method, {}, callback);
};

//STATS APIs

/**
 * Returns application basic stats
 * @param appId - application id
 * @param callback
 */
pipitit.prototype.baseStats = function(appId, callback) {
  var base   = appId + '/stats/basestats';
  var method = 'GET';

  this.request(base, method, {}, callback);
};

/**
 * Returns application stats per day
 * @param appId - application id
 * @param days - number of days
 * @param callback
 */
pipitit.prototype.statsPerDay = function(appId, days, callback) {
  var base   = appId + '/stats/processCountByTypePerDayInPeriod/' + days;
  var method = 'GET';

  this.request(base, method, {}, callback);
};

/**
 * Prepare headers and Sends a request to Pipit API server
 * @param base
 * @param method
 * @param params
 * @param callback
 */
pipitit.prototype.request = function(base, method, params, callback) {
  var uri = this.options.protocol + '://' + this.options.host + '/' + base;

  var auth = 'Basic ' + new Buffer(this.options.authId + ':' + this.options.auth_secret)
      .toString('base64');

  var headers = {
    'Authorization': auth,
    'User-Agent': this.userAgent,
    'Content-Type': 'application/json'
  };

  var request_options = {
    uri: uri,
    headers: headers,
    json: true
  };

  switch (method) {
    case 'POST':
    case 'PUT':
      request_options.json = params;
      break;
    case 'GET':
      request_options.qs = params;
      break;
  }

  Request[METHODS[method]](request_options, function(error, response, body) {
    if (callback) callback(response.statusCode, body);
  });

};

module.exports = {
  init: function(config) {
    return new pipitit(config);
  }
};
