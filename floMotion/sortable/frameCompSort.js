//frame expandable
function frameExpandSortable(expandWrapper){
    if (expandWrapper != null){
        var expandContainer = expandWrapper.querySelector(".grid-auto-row")
        if (expandContainer != 'null'){
            var expandSortable = new Sortable(expandContainer, {
                group:"frameComp",
                animation: 250,
                ghostClass: 'blue-background-class',
            });
            Sortables.push(expandSortable)
        }
    }
}

//frame components that are not expandable
function frameCompSortable(compContainer){
    if (compContainer != null){
        var frameSortable = new Sortable(compContainer, {
            group:"frameComp",
            animation: 250,
            ghostClass: 'blue-background-class',
        });
        Sortables.push(frameSortable)
    }
}