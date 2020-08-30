const express = require("express")
const nunjucks = require("nunjucks")
const { pageLanding, pageStudy, pageTeach, saveClasses } = require("./pages")
const { urlencoded } = require("express")

const server = express()

// Nunjucks conofiguration: template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

// Server configuration
server.listen(5500) // Server start
server.use(express.static("public"))
server.use(urlencoded({extended: true}))
// App routes
server.get("/", pageLanding)
server.get("/study", pageStudy)
server.get("/teach", pageTeach)
server.post("/save-classes", saveClasses)


