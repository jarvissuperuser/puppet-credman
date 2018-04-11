var fs = require('fs-extra');
var ev= require('events').EventEmitter;
var e = new ev();
var reg = /\.ini*/gi; 
var pathData = "";
var creds = [];

var credman = function(hash){
    //this.creds = this.unhash(hash);
    this.e = e;
    /*this.username ="";
    this.password ="";
    this.type ="";
    this.OAUTH2 ="";*/
    //TODO: Get From Path
    
}

credman.prototype.unhash = function(hash){
    if (hash){
        var rawdata = Buffer.from(hash,'base64').toString();
        var arrdata = rawdata.split(':');
        if(arrdata.length>1){
            return arrdata;
        }else{
            return false;
        }
    }
}

credman.prototype.getFromPath = function (path){
    reg.lastIndex = 0;
    if (reg.test(path)){
        fs.readFile(path,'utf8',function(err,data){
            if(!err){
                pathData = data;
                creds = credman.prototype.unhash(pathData);
                credman.prototype.organise(creds);
                e.emit("path_found");
            }
            else
                console.log(err);
        });
        
    }
    else{
        console.log("not found");
        return false;
    }
}

/**
 * @param creds []
 */
credman.prototype.organise = function(creds)
{
    credman.prototype.creds = creds;
    if (creds && creds[2] === "Basic"){
        credman.prototype.username = creds[0];
        credman.prototype.password = creds[1];
        credman.prototype.type = creds[2];
    }
    else if (creds && creds[2] === "OAUTH2"){
        //TODO: PROPERLY IMPLEMENT
        credman.prototype.username = creds[0];
        credman.prototype.OAUTH2 = creds[1];
        credman.prototype.type = creds[2];
    }
}
module.exports = credman;