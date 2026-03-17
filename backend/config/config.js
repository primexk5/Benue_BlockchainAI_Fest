require('dotenv').config();

const dbUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : null;

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      // Prefer IPv4 when both A/AAAA exist (avoids ENETUNREACH on some hosts)
      family: 4,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  test: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      family: 4,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  production: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      family: 4,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};
