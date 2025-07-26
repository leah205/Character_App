const {Pool} = require("pg")
console.log(`postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`)
module.exports = new Pool({
  connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`
});