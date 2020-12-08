var express = require("express");
var http = require("http");

/*  config variable in case you wanna change the default port :D */
var app = express()
const port = 3000 

app.use(express.json());


let articles = [
    {
        articleID: "1",
        articleName: "Pauls Article"
    },
    {
        articleID: "2",
        articleName: "Johns Article"
    },
    {
        articleID: "3",
        articleName: "Sophies Article"
    }];


//  to View all Articles
app.get('/articles', function (req, res) {
    res.send(articles)
})


// to view Article by id, returns not found in case you put a number that is not there.
app.get('/article/:article', function(req, res){
    let isfound = false;
    for (i=0; i <= articles.length-1; i++){
        if (req.params.article == articles[i].articleID) {
            isfound = true;
            res.send(articles[i])
            break;
        }
  }
  if (isfound == false) {
      res.send('article not found');    
  }
});

// to add a new article from using POST
app.post('/articles', function (req, res) {
    articles.push(req.body);
    res.send("article added!");
})


//to delete an article by its id, returns not found in case you put a number that is not there.
app.delete('/article/:article', function (req, res) {
    let isfound = false;
    for (i=0; i <= articles.length-1; i++){
        if (req.params.article == articles[i].articleID) {
            isfound = true;
            articles.splice(i, 1);
            res.send("deleted!");
            break;
        }
  }
  if (isfound == false) {
      res.send('article not found');    
  }
})


// run it.
http.createServer(app).listen(port);
