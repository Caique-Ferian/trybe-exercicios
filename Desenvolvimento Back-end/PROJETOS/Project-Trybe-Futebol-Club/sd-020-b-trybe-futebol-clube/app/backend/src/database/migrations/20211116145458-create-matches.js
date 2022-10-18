module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        homeTeam: {
            allowNull: false,
            type: Sequelize.INTEGER,
            field: 'home_team',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'teams',
              key: 'id',
            }
        },
        homeTeamGoals: {
            allowNull: false,
            type: Sequelize.INTEGER,
            field: 'home_team_goals',
        },
        awayTeam: {
            allowNull: false,
            type: Sequelize.INTEGER,
            field: 'away_team',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'teams',
              key: 'id',
            }
        },
        awayTeamGoals: {
            allowNull: false,
            type: Sequelize.INTEGER,
            field: 'away_team_goals',
        },
        inProgress: {
            allowNull: false,
            field: 'in_progress',
            type: Sequelize.BOOLEAN,
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('matches');
    },
  };
  