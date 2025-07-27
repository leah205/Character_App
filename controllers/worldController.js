const db = require('../db/queries')

exports.getWorlds = async (req, res) => {
    const worlds = await db.selectAllWorlds()

    res.render('worlds', {worlds: worlds})
}

exports.getWorld = async (req, res) => {
   
    const world = await db.selectWorldById(req.params.id)
    res.render('world', {world: world[0]})
}

exports.getEditWorld = async (req, res) => {
   
    const world = await db.selectWorldById(req.params.id);
    res.render('editWorld', {world: world[0]})
}

exports.postEditWorld = async (req, res) => {
    console.log('yoohoo')
    try {
         await db.updateWorld(req.body, req.params.id)
    } catch {
        console.log("error 2")
    }
   
    res.redirect(`/worlds/world/${req.params.id}`)
}

exports.getCreateWorld = (req, res) => {
    console.log('hello')
    res.render('createWorld')
}

exports.getCreateWorld = (req, res) => {
    console.log('hello')
    res.render('createWorld')
}