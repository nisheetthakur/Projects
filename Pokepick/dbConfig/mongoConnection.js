const MongoClient = require("mongodb").MongoClient;

const settings = {
    "mongoConfig":{
        severUrl:"mongodb://localhost:27017/",
        database:"pokemon"
    }
};

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if(!_connection){
        _connection = await MongoClient.connect(settings.mongoConfig.severUrl,{ useNewUrlParser: true });
        _db = await _connection.db(settings.mongoConfig.database);
    }
    return _db;
};