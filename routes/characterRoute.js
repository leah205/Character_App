const {Router} = require("express");
const characterRouter = Router()
const characterController = require("../controllers/characterController")

characterRouter.get("/", characterController.getCharacters)

module.exports = characterRouter