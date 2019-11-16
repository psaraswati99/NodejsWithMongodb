var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ShowMovie';
var str = "";

var http=require('http');
var fs=require('fs');
var querystring=require('querystring');
var mongoclient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/ShowMovie";

app.route('/').get(function(req, res) {
    var c=2;
    var k=3;
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('MovieDetail');
       var cursor = collection.find({});
       var html="<html><head><style>.card{align:center; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.5s; width: 30%; margin:100px 100px;}.card:hover{box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); }.container{padding:6px 12px;}.sum2 {padding:6px 12px;background-color: lightblue;}"+
       "</style></head><body><h2 style='text-decoration:underline;text-align:center;color:Blue;'>Movie Details</h2>";
       var data;
       str = html;
       var htmlend="</body></html>";
       cursor.forEach(function(item) {
           if (item != null) {

                   str =str+"<div class='card' >"+"<img src='"+item.url_data+"' width='100%' name='1' onclick='showSummary2()'>"+
                   "<div class='container'><h4>"+item.mov_name +"</h4></div><div class='sum2' style='display:block;'>"+
                   "<h4 style='text-decoration:underline;'>Summary</h4><p>"+item.mov_sum+"</p></div></div>";
                   
            }
       }, function(err) {
           str=str+htmlend;
           res.send(str);
           db.close();
          }
       );
   });

});

var server = app.listen(3000, function() {});

