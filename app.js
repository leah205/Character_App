require("dotenv").config()
const express = require('express')
app = express()
const path = require('node:path')

//are you sure???? deletes all acharacters too
//test delete worlds delete characters
//validate input
//style valid
//error messages
//distinct worlds constraint
//add button link to world

const indexRouter = require("./routes/indexRoute.js")


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
let staticPaths = path.join(__dirname, 'public')
app.use(express.static(staticPaths))



app.use("/", indexRouter)


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
