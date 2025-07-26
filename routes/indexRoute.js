const {Router} = require("express");
const indexRouter = Router()
const indexController = require("../controllers/indexController")
const characterRouter = require("../routes/characterRoute")
const worldRouter = require("../routes/worldRoute")

indexRouter.get("/", indexController.getIndex)
indexRouter.use("/characters", characterRouter)
indexRouter.use("/worlds", worldRouter)


module.exports = indexRouter