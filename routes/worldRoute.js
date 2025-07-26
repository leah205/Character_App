const {Router} = require("express");
const worldRouter = Router()
const worldController = require("../controllers/worldController")

worldRouter.get("/", worldController.getWorlds)

module.exports = worldRouter