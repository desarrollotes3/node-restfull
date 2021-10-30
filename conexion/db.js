const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

const dbConnection = 'mongodb+srv://prueba:prueba@desarrollo.6juat.mongodb.net/test';
const dbName = "EmpleadosBD";
const collectionName="Empleado";

function initialize(successCallBack, failureCallBack){
    MongoClient.connect(dbConnection,function(err, dbInstance){
        if(err){
            console.log('[MongoDb] Error'+err);
        }else{
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(collectionName);
            console.log("[MongoDb] Success");
            successCallBack(dbCollection);
        }
    });

}
module.exports ={initialize}