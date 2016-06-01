// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var port = process.env.PORT || 8080;        // set our port

app.get('/scrape', function(req, res){

  var url = 'http://feeds.thescoreesports.com/cod.rss';

  request(url, function(error, response, html){
    if(!error && response.statusCode == 200){
      var articles = []
      var $ = cheerio.load(html);

      for(var i = 0; i < $('item').length; i++){
        var title, link, content;
        var json = { title : "", link : "", content : ""};
        json.title = $('item')[i].children[3].children[0].data;
        json.link = $('item')[i].children[6].data;
        json.content = $('item')[i].children[9].children[3].children[1].data
        articles.push(json)
      }
      

      return res.send(articles);
    }
  })
  


});

app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app;