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

exports.selectWorldNames = async () => {
    const {rows} = await pool.query(`
        SELECT name, id FROM worlds
        `)
        return rows
}
exports.insertNewCharacter = async ({name, world, description}) => {
    await pool.query(`
        INSERT INTO characters (name, description, world_id)
        VALUES ($1, $2, $3);
        `, [name, description, world])
}

exports.deleteCharacter = async (id) => {
    await pool.query(`
        DELETE FROM characters 
        WHERE id = $1`, [id])
}