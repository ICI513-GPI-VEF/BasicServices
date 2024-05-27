//exports.define = (sequelize, Sequelize) => {
const defineClient = (sequelize, Sequelize) => 
{
    const Client = sequelize.define("clients",
    {
        id_client:  { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true }
    },
    {
        hooks : {
            beforeCreate : (provider, options) => {
                // provider.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                // provider.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
            },
            beforeUpdate : (provider, options) => {
                //provider.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
            }
        }
    });
    return Client;
};

export default defineClient;