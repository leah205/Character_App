const pool = require("./pool")

exports.selectAllCharacters = async () => {
    const {rows } = await pool.query(
        `SELECT worlds.name AS world, characters.name, characters.id, characters.description
         FROM characters LEFT JOIN worlds
         ON characters.world_id = worlds.id `
    )
    return rows
}
