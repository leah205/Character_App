const {Pool} = require("pg")
console.log(`postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`)
module.exports = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false // required for Neon and some cloud providers
  }
});

