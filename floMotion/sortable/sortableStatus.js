function sortableStatus(state){
    Sortables.forEach(function (sortable) {
        sortable.options.disabled = state
    })
}