var db = require('../db');
var swiftping = require('../helpers/swiftping');

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
};

/**
 *
 * @param {object} req - Express request
 * @param {object} res - Express response
 */
function createUser(req, res)
{
  // TODO: Sanitize
  db.insert('users', req.body,
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not create user.'});
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
function deleteUser(req, res)
{
  // TODO: Sanitize
  db.remove('users', {_id: req.params.id},
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not delete user.'});
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
function getUser(req, res)
{
  // TODO: Sanitize
  db.findOneWhere('users', {_id: req.params.id}, {},
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not fetch user.'});
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
function getUsers(req, res)
{
  // TODO: Sanitize
  db.find('users',
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not fetch all users.'});
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
function updateUser(req, res)
{
  // TODO: Sanitize
  db.modify('users', {_id: req.params.id}, req.body,
    function(err, doc)
    {
      if (err)
      {
        return swiftping.apiResponse('error', res, {code: 'server_error', message: 'Could not update user.'});
      }
      return swiftping.apiResponse('ok', res, doc);
    }
  );
}
