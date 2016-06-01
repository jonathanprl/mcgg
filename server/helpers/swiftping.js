var db = require('../db');

module.exports = {
  apiResponse,
  log
};

function apiResponse(type, res, data, code)
{
  switch (type)
  {
  case 'ok':
    _ok(res, data);
    break;
  case 'error':
    if (typeof code === 'undefined') code = 500;
    _error(res, data, code);
    break;
  }
}

function log(type, subject, message)
{
  console.log('[' + type.toUpperCase() + ']', subject, '-', message);
}

function isNumeric(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Sends a formatted OK response
 * @param {object} res - Express response
 * @param {object} data - Requested data
 */
function _ok(res, data)
{
  res.send({status: 'OK', results: data});
}

/**
 * Sends a formatted error response
 * @param {object} res - Express response
 * @param {object} err - Error object/string
 */
function _error(res, err, code)
{
  if (typeof code === 'undefined')
  {
    code = 500;
  }
  res.status(code).send({status: 'ERR', error: err});
}
