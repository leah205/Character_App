const {Router} = require("express");
const worldRouter = Router()
const worldController = require("../controllers/worldController")

worldRouter.get("/", worldController.getWorlds)
worldRouter.get("/:id", worldController.getWorld)
worldRouter.get("/:id/edit", worldController.getEditWorld)
worldRouter.post("/:id/edit", worldController.postEditWorld)

module.exports = worldRouter