const db = require('../db/queries')

exports.getWorlds = async (req, res) => {
    const worlds = await db.selectWorlds()

    res.render('worlds', {worlds: worlds})
}