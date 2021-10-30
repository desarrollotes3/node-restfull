const express = require("express");
const bodyParcer = require("body-parser");
const server = express();
server.use(bodyParcer.json());

const db = require("./conexion/db");
db.initialize(function(dbCollection){

    let empleado={
        "NombreEmpleado": "Juan",
        "ApellidoEmpleado":"Perez",
        "numeroDocumento" : '987'
    };
    
    server.get("/todo",function(request, response){
        dbCollection.find().toArray((err,result) =>{
            if(err){
                throw err;
            }else{
                response.json(result);
            }
        });
        //response.send("Servicio get raiz");
    });
    
    server.get("/empleado/:id",function(request, response){
        const objId = request.params.id;
        console.log(objId);
        if(objId!==''){

            let filtro = {numeroDocumento:objId};
            dbCollection.findOne(filtro,(error, result)=>{
                if(error){
                    throw error;
                }else{
                    response.json(result);
                }
            });
    
        }else{
            response.send("número Documento invalido");
        }
    
    });
    
    server.post("/empleado",function(request, response){
        const nombreEmpleado = request.body.NombreEmpleado;
        const ApellidoEmpleado = request.body.ApellidoEmpleado;
        const numeroDocumento = request.body.numeroDocumento;
    

        dbCollection.insertOne(request.body,(error, result)=>{
            if(error){
                throw error;
            }else{
                let filtro = {numeroDocumento:request.body.numeroDocumento};

                dbCollection.findOne(filtro,(error, result)=>{
                    if(error){
                        throw error;
                    }else{
                        response.json(result);
                    }
                });
            }
        });
    
    });
    
    
    server.put("/empleado/:id",function(request, response){
        const objId=request.params.id;
        const bodyObj = request.body;
        let filtro = {numeroDocumento:objId};

        dbCollection.updateOne(filtro,{$set:bodyObj}, (error, result) =>{
            if(error){
                throw error;
            }else{
                dbCollection.findOne(filtro,(error, result)=>{
                    if(error){
                        throw error;
                    }else{
                        response.json(result);
                    }
                });
            }
        });
    });
    
    
    server.delete("/empleado",function(request, response){
        const numeroDocumento = request.body.numeroDocumento;
        if(request.body.numeroDocumento===numeroDocumento){
            empleado={
                "NombreEmpleado": '',
                "ApellidoEmpleado":'',
                "numeroDocumento" : ''
            };
        }
        response.send("Borrado "+numeroDocumento);
    
        
    });

}, function(err){
    throw (err);
});



server.listen(4000,()=>{
    console.log("Hola mundo ->"+4000);
});