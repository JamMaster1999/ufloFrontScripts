function courseList(courses) {
    courses.forEach( function (course){
        var option = document.createElement("option")
        option.value = course[0].id
        option.text = course[0].title
        courseSelect.appendChild(option)
    })
}