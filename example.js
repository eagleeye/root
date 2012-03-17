var root = require('root').createServer('test');

root.use(function(req, res, next) {
	req.foo = 42;
	next();
});
root.use(function(req, res, next) {
	req.foo += 42;
	next();
});
root.test.use(function(req, res) {
	req.foo = 'test';
});

root.get('/', function(request, response) {
	response.end('hello world '+request.foo);
});
root.test.get('/foo', function(request, response) {
	response.end('her: '+request.foo);
});

root.use('auth', function(request, response, next) {
	if (request.url.indexOf('?auth') === -1) {
		response.writeHead(403);
		response.end();
		return;
	}
	next();
});

root.get('/1', function(request, response) {
	response.end('hello - all other calls are authenticated...');
});

root.auth.get('/1/*', function(request, response) {
	response.end('hello mr auth');
});


root.listen(7000);