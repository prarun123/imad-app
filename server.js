var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Pool = require('pg').Pool;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.html'));
});

//connect to database
var config = {
    user: 'prarun123',
    database: 'prarun123',
    host: 'http://db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);
app.get('/test-db', function(req,res) {
   pool.query('select * from article', function(res,err) {
     if(err)
        res.status(500).send(err.toString());
     else
        res.send(JSON.stringify(result));
   });
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
