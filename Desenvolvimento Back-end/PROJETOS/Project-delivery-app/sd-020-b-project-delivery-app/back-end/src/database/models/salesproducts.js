const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define("salesProducts", {
    saleId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'sale_id',
    },
    productId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'product_id',
    },
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, underscore: true, tableName: "sales_products" });

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  
  return SalesProducts;
};

module.exports = SalesProducts;