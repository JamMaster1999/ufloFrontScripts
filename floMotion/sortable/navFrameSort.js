//sortable for frame nav components
function frameNavSortable(navList){
    for (let i=0; i < navList.length; i++){
        var frameNavContainer = navList[i].querySelector(".grid-auto-row")
        if (frameNavContainer != null){
            var navSortable = new Sortable(frameNavContainer, {
                group:"frameNav",
                animation: 250,
                ghostClass: 'blue-background-class',

                onStart: function(evt){
                    frameSort(evt);
                }
            });
            Sortables.push(navSortable)
        }
    }
}


