module.exports = {
  development: {
    username: 'postgres',
    password: 'Fak3.y4s.02.,',
    database: 'postgres',
    host: 'db.jdznjxtmfrvqnnavxutp.supabase.co',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};