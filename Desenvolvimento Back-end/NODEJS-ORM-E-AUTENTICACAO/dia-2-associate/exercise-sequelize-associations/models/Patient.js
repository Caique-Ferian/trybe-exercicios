module.exports = (sequelize,DataTypes) => {
    const Patient = sequelize.define('Patient', {
        patient_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fullname: DataTypes.STRING,
        plan_id: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
        timestamps:false,
        tableName: 'Patients',
    });

    Patient.associate = (models) => {
        Patient.belongsTo(models.Plan, {foreignKey: 'plan_id', as: 'plans'});
    };
    return Patient;
};    