const apiRe = /^\/(new-alarm-events|event-viewed\/([a-zA-Z0-9]+))$/;

module.exports = (req, res, next) => {
	let match = req.url.match(apiRe);
	if (match) {
		console.log(`Using API for ${req.url}`);
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ time: Date.now() }));
	} else {
		next();
	}
};
