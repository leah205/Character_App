const pool = require("./pool")

exports.selectAllWorlds = async () => {
    const query = `SELECT * FROM worlds`
    const {rows} = await pool.query(query)
    return rows
}
exports.selectWorldById = async (id) => {
    const query = `SELECT worlds.id, worlds.name, worlds.description,
     creators.name AS creator
     FROM worlds  JOIN creators
     ON worlds.creator_id = creators.id
     WHERE worlds.id = $1`
    const {rows} = await pool.query(query, [id])
    return rows
}