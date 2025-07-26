const {Pool} = require("pg")

module.exports = new Pool({
  connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`
});