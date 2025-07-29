const db = require('../db/worldQueries')
const {body, validationResult} = require('express-validator')
const lengthErr = "must be between 1 and 30 characters"
const validateWorld = [
    body("name").trim()
    .isLength({min: 1, max: 30}).withMessage(`Title ${lengthErr}`),
    body("creator").trim().isLength({min: 1, max:30}).withMessage(`Creator ${lengthErr}`)

]
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

exports.postEditWorld = [validateWorld, async (req, res) => {
     const errors = validationResult(req)
    if(!errors.isEmpty()){
        const world = await db.selectWorldById(req.params.id);
          return res.status(400).render("editWorld", {
            errors: errors.array(),
            world: world[0]
        })
    }
    
    try {
         await db.updateWorld(req.body, req.params.id)
    } catch {
        console.log("error 2")
    }
   
    res.redirect(`/worlds/world/${req.params.id}`)
}]

exports.getCreateWorld = (req, res) => {
    
    res.render('createWorld')
}


exports.postCreateWorld = [validateWorld, async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
          return res.status(400).render("createWorld", {
            errors: errors.array()
        })
    }
    try{
    await db.insertWorld(req.body)}
    catch (err) {
        next(err)
        return
    }
    res.redirect("/worlds")
}]

exports.postDeleteWorld = async (req, res) => {
    await db.deleteWorld(req.params.id)
    res.redirect('/worlds')
}