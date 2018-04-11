var fs = require('fs-extra');
var ev = require('events').EventEmmitter;
var reg = /+\.ini*/gi; 


var credman = function(hash){
    this.creds = this.unhash(hash);
    console.log(hash);
    //TODO: Get From Path
    
}

credman.prototype.unhash = function(hash){
    if (hash){
        var rawdata = btoa(hash);
        var arrdata = rawdata.split(':');
        if(arrdata.length>1){
            return arrdata;
        }else{
            return false;
        }
    }
}

credman.prototype.getFromPath = function (path){
    reg.test(path).lastIndex = 0;
    if (reg.test(path)){
        fs.readFile(path,'utf8',function(err,data){
            var unhashed = this.unhash(data);
            credman.prototype.creds = unhashed;
            this.organise(unhashed);
        });
        
    }
    else{
        return false;
    }
}

/**
 * @param creds []
 */
credman.prototype.organise = function(creds)
{
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
export.module = credman;