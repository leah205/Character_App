const db = require('../db/queries')

exports.getWorlds = async (req, res) => {
    const worlds = await db.selectAllWorlds()

    res.render('worlds', {worlds: worlds})
}

exports.getWorld = async (req, res) => {
   
    const world = await db.selectWorldById(req.params.id)
    res.render('world', {world: world[0]})
}