var credman = require('./index');
var termArgs = process.argv.splice(2);
var creds = new credman();
var usage ="USAGE:\n \t[-c <Credentials>]\n\t[-p <Path/to/<<Credentials>>\.ini>]"
try{
    if (termArgs.length>=1){
        switch(termArgs[0]){
            case '-c':
            case '-C':
                console.log(creds.unhash(termArgs[1]));
                break ;
            case '-p':
            case '-P':
                creds.getFromPath(termArgs[1]);
//                 var sil = setInterval(function(){
//                     if (creds.creds){
//                         console.log(creds.username);
//                         clearInterval(sil);
//                     }
//                     
//                 },'500');
                creds.e.on("path_found",function(data){
                    console.log(creds.username);
                });
                break;
            default:
                console.log(creds.unhash(termArgs[0]));
        }
    }
    else {
        console.log(usage);
    }
}catch(ex){
    console.log(usage,ex);
}