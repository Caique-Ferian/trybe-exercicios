const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: DataTypes.STRING(255),
  }, 
  { timestamps: false, tableName: "users" });

  Users.associate = (models) => {
    Users.hasMany(models.sales, {as: 'sales', foreignKey: 'userId'});
  };
  
  Users.associate = (models) => {
    Users.hasMany(models.sales, {as: 'sales', foreignKey: 'sellerId'});
  };

  return Users;
};

module.exports = Users;

