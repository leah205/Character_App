const pool = require("./pool")

exports.selectAllWorlds = async () => {
    const query = `SELECT * FROM worlds`
    const {rows} = await pool.query(query)
    return rows
}
exports.selectWorldById = async (id) => {
    const query = `SELECT worlds.id AS id, worlds.name, worlds.description,
     creators.name AS creator
     FROM worlds  JOIN creators
     ON worlds.creator_id = creators.id
     WHERE worlds.id = $1`
    const {rows} = await pool.query(query, [id])
    return rows
}
exports.updateWorld = async (newData, id) => {
    const {name, description, creator} = newData;
    const getCreatorIdQuery = `
        SELECT id FROM creators
        WHERE name = $4
    `
    console.log(creator)
       const updateCreatorsQuery = `
       INSERT INTO creators (name)
       SELECT CAST($1 AS VARCHAR) AS name
       WHERE NOT EXISTS (
         SELECT name FROM creators WHERE name = CAST($1 AS VARCHAR)
       )
        LIMIT 1; `
    const updateWorldsQuery = `
    UPDATE worlds
    SET name = $1,
    description = $2,
    creator_id = (${getCreatorIdQuery})
    WHERE id = $3;
    `
    try {
        await pool.query(updateCreatorsQuery, [creator])
        await pool.query(updateWorldsQuery, [name, description, id, creator])
    }
    catch (err) {
        console.log(err)
    }
   
}

exports.insertWorld = async ({name, description, creator}) => {
    const getCreatorIdQuery = `
        SELECT id FROM creators
        WHERE name = $3
    `
    const insertQuery = `
       INSERT INTO worlds (name, description, creator_id)
    VALUES ($1, $2, (${getCreatorIdQuery})
    );
    `
     const updateCreatorsQuery = `
       INSERT INTO creators (name)
       SELECT CAST($1 AS VARCHAR) AS name
       WHERE NOT EXISTS (
         SELECT name FROM creators WHERE name = CAST($1 AS VARCHAR)
       )
        LIMIT 1; `
      try {
        await pool.query(updateCreatorsQuery, [creator])
        await pool.query(insertQuery, [name, description, creator])
    }
    catch (err) {
        throw new Error("ERROR: World Name already Exists")
    }
}

exports.deleteWorld = async (id) => {
    
    const deleteCharactersQuery = `
    DELETE FROM characters WHERE world_id = $1
    `
    const deleteWorldsQuery = `
    DELETE FROM worlds WHERE id = $1
    `
     try {
        await pool.query(deleteCharactersQuery, [id])
        await pool.query(deleteWorldsQuery, [id])
      
    }
    catch (err) {
        throw new Error(err)
    }
}