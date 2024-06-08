import defineClient     from "./client.model.js";
import defineProvider   from "./provider.model.js";
import defineExperience from "./experience.model.js";
import defineOpinion    from "./opinion.model.js";

const associateClient = () => 
{
  // A client can be a provider
  db.client.hasOne(db.provider, {
    foreignKey: {
      name: 'id_client',
      allowNull: false,
      unique: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  db.provider.belongsTo(db.client, { as: 'providerClient', foreignKey: 'id_client' });
  
};

const associateExperience = () => 
{
    // A provider has one or more experiences
    db.provider.hasMany(db.experience, {
      as : 'providerExperiences',
      foreignKey: {
        name: 'id_provider',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    db.experience.belongsTo(db.provider, { as: 'experienceProvider', foreignKey: 'id_provider' })
};

const associateOpinion = () =>
{
     // A client can make opinions
    db.client.hasMany(db.opinion, {
      as : 'clientOpinions',
      foreignKey: {
        name: 'id_client',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    db.opinion.belongsTo(db.client, { as: 'opinionClient', foreignKey: 'id_client' })

     // A labor can have opinions
    db.experience.hasMany(db.opinion, {
      as : 'experienceOpinions',
      foreignKey: {
        name: 'id_experience',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    db.opinion.belongsTo(db.experience, { as: 'opinionExperience', foreignKey: 'id_experience' })
};

const defineAllModels = () => 
{
    db.client     = defineClient(sequelizeInstance, Sequelize);
    db.provider   = defineProvider(sequelizeInstance, Sequelize);
    db.experience = defineExperience(sequelizeInstance, Sequelize);
    db.opinion    = defineOpinion(sequelizeInstance, Sequelize);
    //db.user     = require("./user.model.js").define(sequelizeInstance, Sequelize);
    //db.client   = require("./client.model.js").define(sequelizeInstance, Sequelize);
    //db.provider = require("./provider.model.js").define(sequelizeInstance, Sequelize);
};
  
const associateModels = () => {
    associateClient();
    associateExperience();
    associateOpinion();
};

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
      max:      dbConfig.pool.max,
      min:      dbConfig.pool.min,
      acquire:  dbConfig.pool.acquire,
      idle:     dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

defineAllModels();
associateModels();

//module.exports = db;
export default db;