//sortable for frame nav components
var navSortable
function frameNavSortable(navList){
    for (let i=0; i < navList.length; i++){
        var frameNavContainer = navList[i].querySelector(".grid-auto-row")
        if (frameNavContainer != null && navList[i].id == "lobjID" + lobjParam){
            navSortable = new Sortable(frameNavContainer, {
                group:"frameNav",
                animation: 250,
                ghostClass: 'blue-background-class',

                onEnd: function(evt){
                    frameSort(evt);
                }
            });
            Sortables.push(navSortable)
        }
    }
}


