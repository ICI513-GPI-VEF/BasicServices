import { DataTypes } from "sequelize";

//exports.define = (sequelize, Sequelize) => {
const defineClient = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", 
    {
        name:       { type: Sequelize.STRING(20), allowNull: false, validate: {len: [2,20]} },
        last_name:  { type: Sequelize.STRING(20), allowNull: false, validate: {len: [2,20]} },
        address:    { type: Sequelize.STRING(40), allowNull: false, validate: {len: [5,40]} },
        contact:    { type: Sequelize.STRING(30), allowNull: false, validate: {len: [5,30]} },
        email:      { type: DataTypes.STRING,     allowNull: false, validate: {isEmail: true} },
        password:   { type: Sequelize.STRING(16), allowNull: false, validate: {len: [6,16]} },
        id_client:  { type: Sequelize.INTEGER,    allowNull: false, primaryKey: true, autoIncrement: true },
        typeClient: { type: Sequelize.INTEGER,    allowNull: true,  validate: {min: 1, max: 2}, defaultValue: 1 }
    },
        { indexes: [{ unique:true, fields: ['email'] }] }
    );
    return Client;
}

export default defineClient;