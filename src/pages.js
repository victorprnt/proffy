//Server
let proffys = ""
const routes = require("./routes")
const { subjects, getSubject, convertHoursToMinutes } = require("./utils/format")
const database = require("./database/db")



function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time)
        return res.render("study.html", { proffys, subjects, filters })

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
                FROM class_schedule
                WHERE class_schedule.class_id = classes.id
                AND class_schedule.weekday = ${filters.weekday}
                AND class_schedule.time_from <= ${timeToMinutes}
                AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    // If there is error during the DB consult
    try {
        const db = await database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", { proffys, subjects, filters })

    } catch (error) {
        console.log(error)
    }
}

function pageTeach(req, res) {
    return res.render("teach.html", { subjects })
}

async function saveClasses(req, res){
    const creatProffy = require("./database/createProffy")

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        contact: req.body.contact,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        price: req.body.price
    }


    const classScheduleValues = req.body.weekday.map(
        (weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await database
        await creatProffy(db, { proffyValue, classValue, classScheduleValues })
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageTeach,
    saveClasses
}