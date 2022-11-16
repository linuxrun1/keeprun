const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.status(200).render('index');
});

console.log("Starting....")
let cluster = require('cluster')
let fs = require('fs')

var isRunning = false
function start(file) {
        if (isRunning) return
        isRunning = true
        let args = [path.join(__dirname, file), ...process.argv.slice(2)]
        cluster.setupMaster({
        exec: path.join(__dirname, file),
        args: args.slice(1),
        })
        let p = cluster.fork()
        fs.watchFile(args[0], () => {
          console.log(file+" file changed")
      fs.unwatchFile(args[0])
      p.kill()
      isRunning = false
      start(file)
    })
}
start('cron.js')

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});