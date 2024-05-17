//exports.define = (sequelize, Sequelize) => {
const defineUser = (sequelize, Sequelize) => {
    const User = sequelize.define("users", 
    {
        name:       { type: Sequelize.STRING(20), allowNull: false, validate: {len: [2,20]} },
        last_name:  { type: Sequelize.STRING(20), allowNull: false, validate: {len: [2,20]} },
        address:    { type: Sequelize.STRING(40), allowNull: false, validate: {len: [5,40]} },
        contact:    { type: Sequelize.STRING(30), allowNull: false, validate: {len: [5,30]} },
        alias:      { type: Sequelize.STRING(10), allowNull: false, validate: {len: [2,10]} },
        password:   { type: Sequelize.STRING(16), allowNull: false, validate: {len: [6,16]} },
        id_user:    { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
    });
    return User;
}

export default defineUser;