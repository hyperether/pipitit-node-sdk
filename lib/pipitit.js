//Get required modules
var util         = require('util');
var Request      = require('request');
var pipititError = require('./pipititError');

//var doc = xmlBuilder.create('');

var METHODS = {
  POST: 'post',
  GET: 'get',
  DELETE: 'del',
  PUT: 'put'
};

var pipitit = function (config) {
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

  if (!config.authId || !config.auth_secret) {
    throw new pipititError('Auth ID and Auth Secret are mandatory');
  }

  // override default config according to the config provided.
  for (key in config) {
    this.options[key] = config[key];
  }
};

//APP APIs

/**
 * Create new application
 * @param params - {name : "application name", description: "application description"}
 * @param callback
 */
pipitit.prototype.app_create = function (params, callback) {
  var base   = 'app/create/';
  var method = 'POST';

  this.api(base, method, params, callback);
};

/**
 * Delete application
 * @param app_id - application id
 * @param callback
 */
pipitit.prototype.app_delete = function (app_id, callback) {
  var base   = app_id + '/app';
  var method = 'DELETE';

  this.api(base, method, {}, callback);
};

/**
 * Update application push params
 *
 * @param app_id - application id
 * @param type - Type of platform android, ios, amazon, ...
 * @param params
 * @param callback
 */
pipitit.prototype.app_update_params = function (app_id, type, params, callback) {
  var base   = app_id + '/'+type;
  var method = 'POST';

  this.api(base, method, params, callback);
};

//JOB APIs

/**
 * Create new job
 * @param app_id - application id
 * @param params
 * @param callback
 */
pipitit.prototype.job_create = function (app_id, params, callback) {
  var base   = app_id + '/job/create';
  var method = 'POST';

  this.api(base, method, params, callback);
};

/**
 * List application jobs
 * @param app_id - application id
 * @param callback
 */
pipitit.prototype.job_list = function (app_id, callback) {
  var base   = app_id + '/job/list';
  var method = 'GET';

  this.api(base, method, {}, callback);
};

/**
 * Returns application job details
 * @param app_id - application id
 * @param job_id - job id
 * @param callback
 */
pipitit.prototype.job_detail = function (app_id, job_id, callback) {
  var base   = app_id + '/job/list/'+job_id;
  var method = 'GET';

  this.api(base, method, {}, callback);
};

//STATS APIs

/**
 * Returns application basic stats
 * @param app_id - application id
 * @param callback
 */
pipitit.prototype.states_base = function (app_id, callback) {
  var base   = app_id + '/stats/basestats';
  var method = 'GET';

  this.api(base, method, {}, callback);
};

/**
 * Returns application stats per day
 * @param app_id - application id
 * @param days - number of days
 * @param callback
 */
pipitit.prototype.states_per_day = function (app_id, days, callback) {
  var base   = app_id + '/stats/processCountByTypePerDayInPeriod/'+days;
  var method = 'GET';

  this.api(base, method, {}, callback);
};

module.exports = {
  init: function (config) {
    return new pipitit(config);
  }
};


pipitit.prototype.api = function (base, method, params, callback) {
  var uri = this.options.protocol+'://' + this.options.host + '/' + base;

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

  Request[METHODS[method]](request_options, function (error, response, body) {
    if (callback) callback(response.statusCode, body);
  });

};