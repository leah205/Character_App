const db = require('../db/characterQueries')

exports.getCharacters = async (req, res) => {
    const characters = await db.selectAllCharacters()
    res.render('characters', {characters: characters})
}

exports.getCharacterDetails = async (req, res) => {
    const characterDetails = await db.selectCharacter(req.params.id)
    res.render('character', {character: characterDetails[0]})
}

exports.getEdit = async (req, res) => {
    const characterDetails = await db.selectCharacter(req.params.id)
    res.render('editCharacter', {character: characterDetails[0]})
}

exports.postEditCharacter = async (req, res) => {
    await db.updateCharacter(req.body, req.params.id)
    res.redirect(`/characters/character/${req.params.id}`)
}