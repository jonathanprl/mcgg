var gcloud = require('gcloud');
var path = require('path');

module.exports = {
  add
};

function add(domain)
{

  console.log('DOMNAIN', domain);

  var dns = gcloud.dns({
    projectId: 'mcgg-1329',
    keyFilename: path.normalize(__dirname + '/../resources/mcgg-cf3c13d1d223.json')
  });

  var zone = dns.zone('mcgg');

  var aRecord = zone.record('A', {
    ttl: 3600,
    name: domain + '.mc.gg.',
    data: '8.8.8.8'
  });

  var srvRecord = zone.record('SRV', {
    ttl: 3600,
    name: '_minecraft._tcp.' + domain + '.mc.gg.',
    data: '0 5 25565 ' + domain + '.mc.gg.'
  });

  zone.addRecords([aRecord, srvRecord],
    function(err, change)
    {
      console.log('error', err);
      console.log(change);
    }
  );

  console.log(aRecord);

}
