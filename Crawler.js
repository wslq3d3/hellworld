var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");
var url = "http://www.ivsky.com/";
 
function download ( url,callback ) {
    http.get( url,function(res){
        var data = "";
        res.on("data",function(chunk){
            data += chunk;
        });
        res.on("end",function(){
            callback(data)
        })
    }).on("error",function(err){
//      console.log(err)
    })
}
 
download( url,function( data ) {
    if(data){
        var $=cheerio.load(data);
        $("img").each(function(i){
//      	console.log(i);
            var imgSrc=$(this).attr("src");
            http.get(imgSrc,function(res){
                var imgData="";
                res.setEncoding("binary");
                res.on("data",function(chunk){
                    imgData += chunk;
                });
                
                res.on("end",function(){
                    var imgPath="/"+i+"."+imgSrc.split(".").pop();
                    console.log(i);
                    
                    //pop返回最后一个数组，并删其它数组
                    //split(".")以.为分隔符，返回一个数组对象
                    //imgSrc.split(".").pop()返回的是一个jpg格式
//                  console.log("__dirname:"+__dirname);
//					console.log(imgData);
//					console.log(imgSrc);
//					console.log(imgSrc.split("."))
//					console.log(imgSrc.split(".").pop());
                    fs.writeFile(__dirname + "/imgs"+imgPath,imgData,"binary",function(err){
                    
//					console.log(err);
                    })
                })
                             
            })
        })
    }
})

