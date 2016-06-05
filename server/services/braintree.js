var braintree = require('braintree');
var config = require('../../config.js');

var gateway = braintree.connect({
  environment: config.braintree.environment == 'sandbox' ? braintree.Environment.Sandbox : braintree.Environment.Production,
  merchantId: config.braintree.merchantId,
  publicKey: config.braintree.publicKey,
  privateKey: config.braintree.privateKey
});

module.exports = {
  generateToken,
  createTransaction
};

function generateToken(callback)
{
  gateway.clientToken.generate({}, function (err, response) {
    if (err)
    {
      callback(err);
    }

    callback(null, response.clientToken);
  });
}

function createTransaction(amount, nonce, callback)
{
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, callback);
}
