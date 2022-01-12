function frameCompSearchFunc(searchTerm){
    var frameCompItems = document.getElementsByClassName("frame_comp-list")[0].children
    for (compItem of frameCompItems){
        if (compItem.children[1].textContent.toUpperCase().indexOf(searchTerm) > -1) {
            compItem.style.display = "grid"
        } else { compItem.style.display = "none" }
    }
}