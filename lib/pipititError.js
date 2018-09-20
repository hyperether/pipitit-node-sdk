/*
 Pipitit error
 */
function PipititError(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = (
    msg || '') + '\n';
  this.name    = 'PipititError';
}
PipititError.prototype = Error.prototype;

module.exports = PipititError;