import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, { sequelize: db, modelName: 'teams', timestamps: false, underscored: true });

export default Teams;
