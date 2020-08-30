const database = require("./db")
const createProffy = require("./createProffy")

database.then(async (db) => {
    // insert data
    proffyValue = {
        name: "John Smith",
        avatar: "https://www.biography.com/.image/t_share/MTIwNjA4NjM0MTk5NjM5NTY0/on-location-for-doctor-who.jpg",
        contact: "555-1337",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, aperiam reprehenderit. Consequuntur quibusdam at eum error, provident libero maiores in corporis eveniet ut ex sequi suscipit beatae perspiciatis labore officiis.        ",
    }

    classValue = {
        subject: "1",
        price: 20,
    }

    scheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 3,
            time_from: 520,
            time_to: 0940
        }
    ]

    // === Create proffy ===
    // await createProffy(db, {proffyValue, classValue, scheduleValues})
    
    // === Consult data ===
    // All Proffys
    const selecteProffys = await db.all("SELECT * FROM proffys")
    // console.log(selecteProffys)

    // Consult classes of a proffy and bring proffy data
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "1210"
        AND class_schedule.time_to > "1210"; 
    `)

    console.log(selectClassesSchedules)
})