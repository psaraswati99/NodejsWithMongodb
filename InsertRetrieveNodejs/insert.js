var http=require('http');
var fs=require('fs');
var querystring=require('querystring');
var mongoclient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/ShowMovie";

http.createServer(function(req,res)
{
    if(req.url=="/index")
    {
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.createReadStream("./Assignment/index.html","UTF-8").pipe(res);
    }
    if(req.method==="POST")
    {
        var data="";
        req.on("data",function(chunk)
        {
            data+=chunk;
        });
        req.on("end",function(chuck)
        {
            var q=querystring.parse(data);
            console.log(q);
            mongoclient.connect(url,function(err,db)
            {
                if(err) throw err;
                console.log("connected");
                var q=querystring.parse(data);
                db.collection("MovieDetail").insertOne(q,function(err,res)
                {
                    if(err) throw err;
                    console.log("data inserted successfully",res.insertedCount);
                });
                db.close();
            });
        });
    }
}).listen(3000);
