//exports.define = (sequelize, Sequelize) => {
const defineExperience = (sequelize, Sequelize) => {
    const Experience = sequelize.define("experiences", 
    {
        name_work:          { type: Sequelize.STRING(20),  allowNull: false,  validate: { len: [2,  20]  } }, // <- should be in a category
        description:        { type: Sequelize.STRING(300), allowNull: false,  validate: { len: [15, 300] } },
        horary:             { type: Sequelize.STRING(60),  allowNull: false,  validate: { len: [5,  60]  } }, // <- other table!
        avg_qualification:  { type: Sequelize.INTEGER.UNSIGNED, allowNull: true,  defaultValue: 0, validate: { min: 0, max: 10 } },
        id_experience:      { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true }
    });
    return Experience;
}

export default defineExperience;