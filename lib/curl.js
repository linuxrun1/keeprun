module.exports = async function(url) {
	const https = require('https');

	let request = https.get(url, (res) => {
  		if (res.statusCode !== 200) {
    		console.error(`${url}: ${res.statusCode}`);
    		res.resume();
    		return;
  		}

  	res.on('data', (chunk) => {
    	return;
  	});

  	res.on('close', () => {
    	console.log('Sukses: '+url);
  	});

	}); // let request ()
	request.on('error', (err) => {
  		console.error(`${url}: ${err.message}`);
	});
}