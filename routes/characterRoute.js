const {Router} = require("express");
const characterRouter = Router()
const characterController = require("../controllers/characterController")

characterRouter.get("/", characterController.getCharacters)
characterRouter.get("/character/:id", characterController.getCharacterDetails)
characterRouter.get("/character/:id/edit", characterController.getEdit)
characterRouter.post("/character/:id/edit", characterController.postEditCharacter)
characterRouter.get("/new", characterController.getNew)
characterRouter.post("/new", characterController.createNewCharacter)
characterRouter.post("/character/:id/delete", characterController.postDeleteCharacter)


module.exports = characterRouter