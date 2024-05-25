//exports.define = (sequelize, Sequelize) => {
const defineProvider = (sequelize, Sequelize) => {
    const Provider = sequelize.define("providers", 
    {   
        overview:    { type: Sequelize.STRING(300), allowNull: false, validate: {len: [15,300]}        },
        id_provider: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true }
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
    return Provider;
}

export default defineProvider;