import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, { sequelize: db, modelName: 'users', timestamps: false });

export default Users;
