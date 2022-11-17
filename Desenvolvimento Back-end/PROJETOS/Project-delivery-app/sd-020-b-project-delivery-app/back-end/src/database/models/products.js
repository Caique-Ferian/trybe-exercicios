const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING(255),
    price: DataTypes.DECIMAL(4,2),
    urlImage: { type: DataTypes.STRING(200), field: 'url_image' },
  }, 
  { timestamps: false, underscore: true, tableName: 'products' });

  return Products;
};

module.exports = Products;