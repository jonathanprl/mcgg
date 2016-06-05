var braintree = require('../services/braintree');
var swiftping = require('../helpers/swiftping');

module.exports = {
  getToken,
  postCheckout
};

function getToken(req, res)
{
  braintree.generateToken(function(err, token) {
    if (err)
    {
      // SHow error
      swiftping.logger('error', 'payment', 'Braintree could not generate token.', err);
      res.status(500).json({code: 'server_error', message: 'There was a problem. Our developers have been notified.'});
    }
    res.json(token);
  });
}

function postCheckout(req, res)
{
  var nonce = req.body.payment_method_nonce;
  var redirect = req.body.redirect;
  var amount = req.body.amount

  //TODO: Sanitize, verify etc

  braintree.createTransaction(amount, nonce, function(err, result) {
    if (err)
    {
      // Show error
      swiftping.logger('error', 'payment', 'Braintree could not generate token.', err);
      res.status(500).json({code: 'server_error', message: 'There was a problem. Our developers have been notified.'});
    }
    res.redirect(redirect);
  });
}
