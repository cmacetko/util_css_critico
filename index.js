var fs = require("fs");
var penthouse = require('penthouse');
var uuid = require("uuid");
var http = require('http');

var express = require("express");
var bodyParser = require("body-parser");

const sendRes = function(callback, IsSucesso, data){

	if( IsSucesso == true )
	{
		
        callback.status(200).json(data);
		
	}else{
		
        callback.status(500).json(data);
		
	}    


};

const remover_arquivo = function(filename){

    fs.unlink(filename, (err) => {

        if(err) 
        {
            
            console.error("unlink | error");
            console.error(err);
            
        }else{

            console.info("unlink | sucesso");
            
        }
    
    })

};

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function(req, res, next){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();

});

app.post("/gerar", async function(req, res){

    if( req.body.url != "" && req.body.css != "" && req.body.device != "" ) 
	{

        console.log("-------------------------------------");
        console.log("url: " + req.body.url);
        console.log("css: " + req.body.css);
        console.log("device: " + req.body.device);
    
        var filenamepre = uuid();
        var filename = filenamepre + ".css";
		var output = __dirname + "/tmp/" + filename;
        var writeStream = fs.createWriteStream(output);

        var CfgCss = req.body.css;
        CfgCss = CfgCss.replace("https://", "http://");

        var CfgWidth = 1920;
        var CfgHeight = 1000;
        var CfgUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0";

        if( req.body.device == "Mobile" )
        {

            CfgWidth = 320;
            CfgHeight = 960;
            CfgUserAgent = "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36";

        }

		http.get(CfgCss, function(response) {
            
            if( response.statusCode == 200 )
            {

                response.pipe(writeStream).on('finish', function() {
                
                    try {

                        penthouse({
                            url: req.body.url,
                            css: output,
                            width: CfgWidth,
                            height: CfgHeight,
                            userAgent: CfgUserAgent,
                            timeout: 10000
                        })
                        .then(function (criticalCss, error) {
                            
                            if( error ){

                                console.error("penthouse | Falha em Gerar CSS: " + error);

                                remover_arquivo(output);
                                sendRes(res, false, {"Msg": "Falha em Gerar CSS: " + error});

                            }else if( criticalCss == "" ){
                                
                                console.error("penthouse | Falha em Gerar CSS");

                                remover_arquivo(output);
                                sendRes(res, false, {"Msg": "Falha em Gerar CSS"});

                            }else{

                                console.error("penthouse | Sucesso em Gerar CSS");

                                remover_arquivo(output);
                                sendRes(res, true, { "Arquivo": criticalCss });

                            }
                        
                        });

                    } catch (ex) {
                    
                        console.warn("Falha no penthouse");
                        console.warn(ex);
                    
                        remover_arquivo(output);
                        sendRes(res, false, {"Msg": "Falha no penthouse"});
                    
                    }

                }).on('error', function(e){
                    
                    console.warn("Falha no pipe");
                    console.warn(e);
    
                    remover_arquivo(output);
                    sendRes(res, false, {"Msg": "Falha em Obter Raw do Arquivo"});

                });

            }else{

                console.warn("Falha em Obter Arquivo - Status Code: " + res.statusCode);
    
                remover_arquivo(output);
		        sendRes(res, false, {"Msg": "Falha em Obter Arquivo - Status Code: " + res.statusCode});
                
            }

        });

	}else{

        console.warn("Dados nao informados");
    
		sendRes(res, false, {"Msg": "Url nao informada"});

	}

});

app.listen(9000, function(){ 
    
    console.log("Porta: 9000");
    console.log("Desenvolvido por PALOMA MACETKO <cmacetko@gmail.com>");

});