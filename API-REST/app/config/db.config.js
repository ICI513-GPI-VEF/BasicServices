//module.exports = {
//    HOST: "localhost",
//    USER: "root",
//    PASSWORD: "***************",
//    DB: "basicServices",
//    dialect: "mysql",
//    pool: {
//        max: 5,
//        min: 0,
//        acquire: 30000,
//        idle: 10000
//    }
//};

if (!process.env.DB_PASSWORD) {
  throw new Error(
    "DB_PASSWORD is not defined. Create a .env file in the project root."
  );
}


const dbConfig = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME || "basicServices",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;
