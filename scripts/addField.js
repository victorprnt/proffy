// Find the button add-time
document.querySelector('#add-time')
    // When clicked, start calls function cloneField
.addEventListener('click', cloneField)

function cloneField() {
    const newFieldContainer = document.querySelector('.schedule').cloneNode(true)

    const fields = newFieldContainer.querySelectorAll('input')

    fields.forEach(function(field){
        field.value = ""
    })

    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}