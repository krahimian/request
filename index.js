var domain = require('domain');
var merge = require('deepmerge');
var request = require('requestretry');

request.Request.request.defaults({
    headers: {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'
    }
});

var defaults = {
    gzip: true,
    maxAttempts: 3,
    timeout: 30000
};

var $ = function(opts, cb) {
    opts = opts || {};
    var o = merge(defaults, opts);

    var d = domain.create();

    d.on('error', function(err) {
	cb(err);
    });

    d.run(function() {
	request(o, cb);
    });
};

module.exports = $;
