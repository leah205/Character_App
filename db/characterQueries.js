const pool = require("./pool")

exports.selectAllCharacters = async () => {
    const {rows } = await pool.query(
        `SELECT worlds.name AS world, characters.name, characters.id
         FROM characters LEFT JOIN worlds
         ON characters.world_id = worlds.id `
    )
    return rows
}

exports.selectCharacter = async (id) => {
    const {rows} = await pool.query(
        `SELECT worlds.name AS world, characters.name, characters.id, characters.description, creators.name AS creator
         FROM characters LEFT JOIN worlds
         ON characters.world_id = worlds.id
         INNER JOIN creators 
        ON worlds.creator_id = creators.id 
         WHERE characters.id = $1
         `, [id]
    )   
    return rows
}
exports.updateCharacter = async ({name, description}, id) => {
    query =  `
    UPDATE characters 
    SET name= $1,
    description = $2
    WHERE id = $3
    `
    try{
        await pool.query(query, [name, description, id])
    } catch (err) {
        console.log(err)
    }
    

}
