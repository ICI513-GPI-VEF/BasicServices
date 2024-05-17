//module.exports = {
//    HOST: "localhost",
//    USER: "root",
//    PASSWORD: "zomani.-",
//    DB: "basicServices",
//    dialect: "mysql",
//    pool: {
//        max: 5,
//        min: 0,
//        acquire: 30000,
//        idle: 10000
//    }
//};

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "zomani.-",
    DB: "basicServices",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;
  