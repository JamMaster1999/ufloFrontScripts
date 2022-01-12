//sortable init
var Sortables = []
//sortable for frame components
function sortableInit(){
    var frameList = document.querySelectorAll(".frame-w")
    var navList = document.querySelectorAll(".nav-lobj-w")
    for (frame of frameList){
        frameExpandSortable(frame.querySelector(".is--expandable"))
        frameCompSortable(frame.querySelector(".grid-auto-row"))
    }
    frameNavSortable(navList)
}

