module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql:///mm',
    migrations: {
      directory: './data/migrations', 
    },
    seeds: {directory: './data/seeds'},
  },
};
