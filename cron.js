var cron = require('node-cron');
const curl = require('./lib/curl');
cron.schedule('* * * * *', () => {
  curl('https://keeprun.myfam2.repl.co');
});