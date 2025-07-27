const {Router} = require("express");
const worldRouter = Router()
const worldController = require("../controllers/worldController")

worldRouter.get("/", worldController.getWorlds)
worldRouter.get("/world/:id", worldController.getWorld)
worldRouter.get("/world/:id/edit", worldController.getEditWorld)
worldRouter.post("/world/:id/edit", worldController.postEditWorld)
worldRouter.get('/new', worldController.getCreateWorld)
worldRouter.post("/new", worldController.postCreateWorld)
worldRouter.post('/world/:id/delete', worldController.postDeleteWorld)

module.exports = worldRouter