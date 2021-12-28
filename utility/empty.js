
function emptyState(parent){
    var emptyState = document.createElement("div")
    emptyState.classList.add("empty-state", "section--bg-color", "is--center", "is--weight700", "is--btm-margin")
    var emptyStateHTML = '<div>You have not added any items yet.</div>'
    emptyState.innerHTML = emptyStateHTML
    parent.querySelector(".grid-auto-row").appendChild(emptyState)
}