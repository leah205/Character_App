const db = require('../db/characterQueries')

exports.getCharacters = async (req, res) => {
    const characters = await db.selectAllCharacters()
    res.render('characters', {characters: characters})
}