// Function must be async in order to use await
module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
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
    const insertedAllScheduleValues = classScheduleValues.map(classScheduleValues => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${classID}",
                "${classScheduleValues.weekday}",
                "${classScheduleValues.time_from}",
                "${classScheduleValues.time_to}"
            );
        `)
    })
    await Promise.all(insertedAllScheduleValues)
    

}