var users = require('./controllers/users');
var domains = require('./controllers/domains');
var payment = require('./controllers/payment');
var swiftping = require('./helpers/swiftping');

module.exports = function(app)
{
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/robots.txt', function(req, res)
  {
    res.set('Content-Type', 'text/plain');
    res.send('User-agent: *\nAllow: /');
  });

  app.get('/api/users', users.getUsers);
  app.post('/api/users', users.createUser);
  app.get('/api/users/:id', users.getUser);
  app.put('/api/users/:id', users.updateUser);
  app.delete('/api/users/:id', users.deleteUser);

  app.get('/api/domains', domains.getDomain);
  app.post('/api/domains', domains.createDomain);

  app.get('/api/payment/token', payment.getToken);
  app.post('/api/payment/checkout', payment.postCheckout);

  app.get('/views/*', function(req, res)
  {
    res.render('../public/views/' + req.params[0]);
  });

  app.get('*', function(req, res)
  {
    res.render('index');
  });
};
