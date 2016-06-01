var gcloud = require('gcloud');
var path = require('path');

module.exports {
  add,
  remove,
  exists
}

function add()
{

  var dns = gcloud.dns({
    projectId: 'mcgg-1329',
    keyFilename: path.normalize(__dirname + '/../resources/mcgg-cf3c13d1d223.json')
  });

  var zone = dns.zone('mcgg');

  var aRecord = zone.record('a', {
    ttl: 86400,
    name: 'test.',
    data: '8.8.8.8'
  });

  zone.addRecord(aRecord, function(err, change) {
    console.log(err);
    console.log('=======');
    console.log(change);
  });

}
