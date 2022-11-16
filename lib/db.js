const auth = 'Gp3L78Q4Czf1FEkN16HmEuSP4Z8tKpmagXs15OfI';
const rtdb = 'https://keep-replit-default-rtdb.firebaseio.com';
const https = require('https');

const option = function(method){
return {
  host: rtdb,
  path: '/link.json',
  method: method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};
};

const request = https.request(option('PUT'), (res) => {
  if (res.statusCode !== 200) {
    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  res.on('close', () => {
    console.log('Closed');
  });
});

class Db {
  async add(key) {
     
     const requestData = {
       key
     };
     request.write(JSON.stringify(requestData));
     request.end();
  }

  async get(key) {
    return new Firebase().read(key);
  }

  async exists(key) {
    return new Firebase().exists(key);
  }

  async delete(key) {
    return new Firebase().delete(key);
  }
}

module.exports = Db;