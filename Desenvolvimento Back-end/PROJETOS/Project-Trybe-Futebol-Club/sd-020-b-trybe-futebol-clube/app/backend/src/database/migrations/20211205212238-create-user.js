module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING(10),
        },
        role: {
            allowNull: false,
            type: Sequelize.STRING(10),
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING(50),
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING(100),
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('users');
    },
  };
  