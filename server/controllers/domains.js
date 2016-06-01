var db = require('../db');
var swiftping = require('../helpers/swiftping');
var Joi = require('joi');
var gcloud = require('../services/gcloud');

module.exports = {
  createDomain,
  deleteDomain,
  getDomain,
  getDomains,
  updateDomain
};

var domainSchema = Joi.string().regex(/^[a-zA-Z]+[a-zA-Z0-9\-]*[a-zA-Z]$/g);

/**
 *
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
function createDomain(req, res)
{
  if (!req.body.domain)
  {
    swiftping.log('error', 'createDomain', 'No domain in body.');
    return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not create domain.'});
  }

  Joi.validate(req.body.domain, domainSchema,
    function (err, value) {
      if (err)
      {
        swiftping.log('error', 'createDomain', 'Domain has invalid format.');
        return swiftping.apiResponse('error', res, {code: 'invalid_domain', message: 'Domain has invalid format.'});
      }

      db.insert('domains', req.body,
        function(err, doc)
        {
          if (err)
          {
            return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not create domain.'});
          }
          return swiftping.apiResponse('ok', res, doc);
        }
      );
    }
  );
}

/**
 *
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
function deleteDomain(req, res)
{
  // TODO: Sanitize
  db.remove('domains', {_id: req.params.id},
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not delete domain.'});
      }
      return swiftping.apiResponse('ok', res, doc);
    }
  );
}

/**
 *
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
function getDomain(req, res)
{
  // TODO: Sanitize
  db.findOneWhere('domains', {_id: req.params.id}, {},
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not fetch domain.'});
      }
      return swiftping.apiResponse('ok', res, doc);
    }
  );
}

/**
 *
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
function getDomains(req, res)
{
  // TODO: Sanitize
  db.find('domains',
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not fetch all domains.'});
      }
      return swiftping.apiResponse('ok', res, doc);
    }
  );
}

/**
 *
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
function updateDomain(req, res)
{
  // TODO: Sanitize
  db.modify('domains', {_id: req.params.id}, req.body,
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not update domain.'});
      }
      return swiftping.apiResponse('ok', res, doc);
    }
  );
}
