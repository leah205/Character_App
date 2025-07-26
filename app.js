require("dotenv").config()
const express = require('express')
app = express()
const path = require('node:path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
let staticPaths = path.join(__dirname, 'public')
app.use(express.static(staticPaths))


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
