const db = require('../db/characterQueries')

const {body, validationResult} = require('express-validator')
const lengthErr = "must be between 1 and 30 characters"
const validateCharacter = [
    body("name").trim()
    .isLength({min: 1, max: 30}).withMessage(`Title ${lengthErr}`),
]

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

exports.postEditCharacter = [validateCharacter, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const character = await db.selectCharacter(req.params.id)
        res.render('editCharacter', {errors: errors.array(), character: character[0]})
    }
    await db.updateCharacter(req.body, req.params.id)
    res.redirect(`/characters/character/${req.params.id}`)
}]

exports.getNew = async (req, res) => {
    const worlds  = await db.selectWorldNames()
    res.render("createCharacter", {worlds: worlds})
}

exports.createNewCharacter = [validateCharacter, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const worlds = await db.selectWorldNames()
        res.render('createCharacter', {errors: errors.array(), worlds: worlds})
        return
    }
    await db.insertNewCharacter(req.body)
    res.redirect('/characters')
}]


exports.postDeleteCharacter = async (req, res) => {
    await db.deleteCharacter(req.params.id)
    res.redirect("/characters")
}
