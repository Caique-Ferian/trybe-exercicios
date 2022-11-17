const Sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define("sales", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'user_id',
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'seller_id',
    },
    totalPrice: { type: DataTypes.DECIMAL(9,2), field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING(100), field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING(50), field: 'delivery_number' },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'sale_date',
    },
    status: DataTypes.STRING(50),
}, { timestamps: false, underscore: true, tableName: "sales" });

Sales.associate = (models) => {
  Sales.belongsTo(models.users, {as: 'user', otherKey: 'id', foreignKey: 'userId'});
  Sales.belongsTo(models.users, {as: 'seller', otherKey: 'id', foreignKey: 'sellerId'});
};
  
  return Sales;
};

module.exports = Sales;
