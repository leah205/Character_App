const pool = require("./pool")

exports.selectWorlds = async () => {
    const query = `SELECT * FROM worlds`
    const {rows} = await pool.query(query)
    return rows
}