'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        field:'user_id'
      },
      sellerId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'seller_id'
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        field: 'delivery_address'
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        field: 'delivery_number'
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date'
      },
      status: {
        type: Sequelize.STRING(50)
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};