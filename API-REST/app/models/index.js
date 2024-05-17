import defineUser from "./user.model.js";
import defineClient from "./client.model.js";
import defineProvider from "./provider.model.js";

const associateUser = () => 
{
  // A user can be a client
  db.user.hasOne(db.client, {
    foreignKey: {
      name: 'id_user',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.client.belongsTo(db.user, { as: 'clientUser', foreignKey: 'id_user' });

  // Or a user can be a provider
  db.user.hasOne(db.provider, {
    foreignKey: {
      name: 'id_user',
      allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.provider.belongsTo(db.user, { as: 'providerUser', foreignKey: 'id_user' });
  
}

const defineAllModels = () => 
{
    db.user     = defineUser(sequelizeInstance, Sequelize);
    db.client   = defineClient(sequelizeInstance, Sequelize);
    db.provider = defineProvider(sequelizeInstance, Sequelize);
    //db.user     = require("./user.model.js").define(sequelizeInstance, Sequelize);
    //db.client   = require("./client.model.js").define(sequelizeInstance, Sequelize);
    //db.provider = require("./provider.model.js").define(sequelizeInstance, Sequelize);
}
  
const associateModels = () => {
    associateUser();
}

//******************************************************************************/

// Import dependencies
import dbConfig  from "../config/db.config.js"
import Sequelize from "sequelize";
//const dbConfig  = require("../config/db.config.js");
//const Sequelize = require("sequelize");


// Sequelize Initialization
const sequelizeInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:    dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

defineAllModels();
associateModels();

//module.exports = db;
export default db;