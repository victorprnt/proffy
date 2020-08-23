//Server
const express = require("express")
const nunjucks = require("nunjucks")
const proffys = require("./proffy_list")
const subjects = require("./subject_list")
const routes = require("./routes")

const server = express()


function getSubject(subjectNumber) {
    return subjects[+subjectNumber - 1] 
    // The "+" ensures that the variable is converted to a number. 
    // The "-1", decreases 1 from the selected value, since it starts with value 1 and the array starts with 0
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, subjects, filters })
}

function pageTeach(req, res) {
    const data = req.query
    const isEmpty = Object.keys(data).length == 0

    if (!isEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect("/study")
    }
    return res.render("teach.html", { subjects, data })
}

// Nunjucks conofiguration: template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

// Server configuration
server.listen(5500) // Server start
server.use(express.static("public"))
// App routes
server.get("/", pageLanding)
server.get("/study", pageStudy)
server.get("/teach", pageTeach)



