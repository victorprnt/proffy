// Function must be async in order to use await
module.exports = async function (db, { proffyValue, classValue, scheduleValues }) {
    // Insert data on teacher table
    // Await waits the end of line execution
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            contact,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.contact}",
            "${proffyValue.bio}"
        );
    `)
    const proffyId = insertedProffy.lastID //ID used for next table class

    // Insert data on classes table
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            price,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.price}",
            "${proffyId}"
        );
    `)
    const classID = insertedClass.lastID // ID used for netx table schedule

    // Insert data on class_schedule table
    const insertedAllScheduleValues = scheduleValues.map(scheduleValue => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${classID}",
                "${scheduleValue.weekday}",
                "${scheduleValue.time_from}",
                "${scheduleValue.time_to}"
            );
        `)
    })
    await Promise.all(insertedAllScheduleValues)
    

}