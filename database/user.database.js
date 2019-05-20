const config = require("../config/config.js");


let connect =(callback) => {

  const MongoClient = require("mongodb").MongoClient;
  const uri = `mongodb+srv://admin:${config.dbpw}@webentrega5-p9g7k.mongodb.net/test?retryWrites=true`;
  const client = new MongoClient(uri, {useNewUrlParser: true });

  client.connect(errClient=>{
    if(errClient!==null)
      console.log("Error while connecting to mongodb: ", errClient);

    const db = client.db("4BerryDB");

    const collection = db.collection("User");

    callback(client, collection);
    console.log("conecto a mongo")

  });
};

module.exports = {
  connect
};
