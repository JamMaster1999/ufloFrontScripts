document.querySelector("#popupTrigger").click()
var allTagsList = []
var hostURL = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/"

function getAllTags(){
    allTagsList = []
    var tagObj = {}
    tagObj.user_id = 2
    fetch(hostURL + "tag?user_id=2",  
    {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => allTagsList = data)
    .then(() => multiSelectItems(allTagsList))
    .catch((error) => {
    console.error('Error:', error);
    });
}
getAllTags()


function multiSelectItems(data){
    data.forEach( function (item){
        var selectItem = document.createElement("div")
        selectItem.classList.add("search_item-w", "padding", "is--text-color","text")
        selectItem.textContent = item.name
        selectItem.setAttribute("compID",item.id)
        $('#annotationTagSearch')[0].appendChild(selectItem)
    })
}




$("#tagSelectInput").on("keyup", function() {searchMultiSelect($(this))})

function searchMultiSelect(element){
    //element.parentElement.children.querySelector(".search_list-w").style.display = "grid"
    $('#annotationTagSearch').css("display", "grid")
    var v = element.val();
    $(".results").removeClass("results");
    $(".noresults").removeClass("noresults");
    $(".search_item-w").each(function () {
        if (v != "" && $(this).text().search(new RegExp(v, 'gi')) != -1) {
            $(this).addClass("results");
        } else if (v != "" && $(this).text().search(v) != 1) {
            $(this).addClass("noresults");
        }
    });
}




function addSelection(selected){
    var selectionText = selected.textContent;
    var selectionID = selected.getAttribute("compID")
    var selectionEl = document.createElement("div")
    selectionEl.classList.add("search_selection", "is--text-color", "is--border")
    var selectionHTML = '<img src="https://assets.website-files.com/61365f53652529080f68048b/614fba9913977ac47424bcde_icons8-macos-close.svg" alt="" class="icon-img is--xxlarge is--right-margin"><div class="text">Ask Question</div>'
    selectionEl.innerHTML = selectionHTML
    selectionEl.setAttribute("compID", selectionID)
    selectionEl.children[1].textContent = selectionText
    selected.parentElement.parentElement.querySelector(".is--flex-hz-ctr-ctr").appendChild(selectionEl);
}
var eventPath


document.querySelector("#createAnnotation").addEventListener("click", function(e){
    eventPath = e
    if (e.target.nodeName == "IMG" && e.target.src == "https://assets.website-files.com/61365f53652529080f68048b/614fba9913977ac47424bcde_icons8-macos-close.svg"){
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("search_item-w")){
        addSelection(e.target)
    }
})
