var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Pool = require('pg').Pool;

//var articles = {
	'article-one' : {
		title: "article-1",
		heading: "article-one",
		date: "05-Aug",
		content: `
			<p> this is article-one text this is article-one text this is article-one text this is article-one text this is article-one text </p>
			<p> this is article-one text this is article-one text this is article-one text this is article-one text this is article-one text </p>
			<p> this is article-one text this is article-one text this is article-one text this is article-one text this is article-one text </p>
		`
	},
	'article-two' : {
		title: "article-2",
		heading: "article-two",
		date: "05-Aug",
		content: `
			<p> this is article-two </p>
		`
	},
	'article-three' : {
		title: "article-3",
		heading: "article-three",
		date: "25-Aug",
		content: `
			<p> this is article-three </p>
		`
	},
}

function create_template (data){
	var title = data.title;
	var heading = data.heading;
	var date = data.date;
	var content = data.content;
	var html_template = `
	<!DOCTYPE html>
	<html>
	<head>
		<title>${title}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="/ui/style.css" rel="stylesheet" />
	</head>
	<body>
		<div class="container">
			<div>
				<a href="/"> Home </a>
			</div>
			<hr/>
			<div>
				<h3> ${heading} </h3>
			</div>
			<div>
				${date.toDateString()}
			</div>
			<p> ${content} </p>
		</div>
	</body>
	</html>
	`;
	return html_template;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

//connect to database
var config = {
    user: 'prarun123',
    database: 'prarun123',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);
app.get('/test-db', function(req,res) {
   pool.query('SELECT * FROM article', function(err,result) {
     if(err)
        res.status(500).send(err.toString());
     else
        res.send(JSON.stringify(result.rows));
   });
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
// app.get('/get_name/:name', function (req, res) {
//   var name = req.params.name;
app.get('/get_name/', function (req, res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});


app.get('/article/:articleName', function (req, res) {
//pool.query("SELECT * FROM article WHERE title='" + req.params.articleName +"'", function(err,result) {
  pool.query("SELECT * FROM article WHERE title= $1", [req.params.articleName] , function(err,result) {
     if(err)
        res.status(500).send(err.toString());
     else {
        if (result.rows.length === 0)
             res.status(400).send('Article not found');
        else {
            var articleData = result.rows[0];
            res.send(create_template(articleData));
        }
     }
   });
});

// app.get('/:articleName', function (req, res) {
//   var articleName = req.params.articleName;
//   res.send(create_template(articles[articleName]));
// });

// app.get('/article-one', function (req, res) {
//   res.send(create_template(articleOne));
// });

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
