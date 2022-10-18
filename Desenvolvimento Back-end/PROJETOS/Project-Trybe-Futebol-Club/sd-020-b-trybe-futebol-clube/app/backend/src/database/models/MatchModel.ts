import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import TeamModel from './TeamModel';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, { sequelize: db, modelName: 'matches', timestamps: false, underscored: true });

TeamModel.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
TeamModel.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
Matches.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });

export default Matches;
