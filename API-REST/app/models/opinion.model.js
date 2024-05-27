//exports.define = (sequelize, Sequelize) => {
const defineOpinion = (sequelize, Sequelize) => {
    const Opinion = sequelize.define("opinions", 
    {
        comment:         { type: Sequelize.STRING(500),      allowNull: false,  validate: { len: [5,  500]  }   },
        qualification:   { type: Sequelize.INTEGER.UNSIGNED, allowNull: true,   validate: { min: 0, max: 10 }   },
        likes:           { type: Sequelize.INTEGER.UNSIGNED, allowNull: true,   defaultValue: 0                 },
        id_opinion:      { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true     }
    });
    return Opinion;
}

export default defineOpinion;