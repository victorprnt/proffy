const subjects = [
    "Art",
    "Biology",
    "Science",
    "P.E.",
    "Physics",
    "Geography",
    "History",
    "Math",
    "Portuguese",
    "Chemestry"
];


function getSubject(subjectNumber) {
    return subjects[+subjectNumber - 1] 
    // The "+" ensures that the variable is converted to a number. 
    // The "-1", decreases 1 from the selected value, since it starts with value 1 and the array starts with 0
}

function convertHoursToMinutes (time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    getSubject,
    convertHoursToMinutes
}