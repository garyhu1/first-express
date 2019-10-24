const MongoClient = require('mongodb').MongoClient;

class MongoService {

    constructor() {
        this.db = null;
    }

    connectDB() {
        let that = this;
        // 链接mongodb数据库
        const url = "mongodb://localhost:27017/my_egg";
        MongoClient.connect(url,{ useNewUrlParser: true },(err,db) => {
            if(err) {
                throw err;
            }

            console.log("数据库连接成功");
            // that.db = db;
            db.close();
        });
    }

    query() {
        // 链接mongodb数据库
        const url = "mongodb://localhost:27017/";
        return new Promise((reslove,reject) => {
            MongoClient.connect(url,{ useNewUrlParser: true },(err,db) => {
                if(err) {
                    reject(err);
                    // throw err;
                }

                console.log("数据库连接成功");
                const websDB = db.db("my_egg");
                websDB.collection('webs').find().toArray((error,result) => {
                    if(error) reject(error);
                    console.log(result);
                    reslove(result);
                    db.close();
                })
                // that.db = db;
            });
        });
        
    }

    closeDB() {
        if(this.db) {
            this.db.close();
        }
    }

}

module.exports = MongoService;