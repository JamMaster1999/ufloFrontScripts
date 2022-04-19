//add comp button in every frame
//when clicked search bar opens with animation
//search in all comps including nested items
//nested items UX
//info content for each component
//when clicked element gets added to the frame. 
//new element gets saved into the database once every while + mutation observer + socket



//variables
var frameCompList = document.getElementsByClassName('search_list-w')[0]
var frameCompItem
var selectionText
var selectionItem



function multiSelectItems(data, wrapper){
    data.forEach( function (item){
        var selectItem = document.createElement("div")
        selectItem.classList.add("search_item-w", "padding", "is--text-color","text")
        selectItem.textContent = item.title
        selectItem.setAttribute("compID",item.id)
        wrapper.appendChild(selectItem)
    })
}

function searchMultiSelect(element){
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


function addSelection(selected, wrapper){
    var selectionText = selected.text()
    var selectionID = selected.getAttribute("compID")
    var selectionEl = document.createElement("div")
    selectionEl.classList.add("search_selection", "is--text-color", "is--border")
    var selectionHTML = '<img src="https://assets.website-files.com/61365f53652529080f68048b/614fba9913977ac47424bcde_icons8-macos-close.svg" alt="" class="icon-img is--xxlarge is--right-margin"><div class="text">Ask Question</div>'
    selectionEl.innerHTML = selectionHTML
    selectionEl.setAttribute("compID", selectionID)
    selectionEl.children[1].textContent = selectionText
    wrapper.appendChild(selectionEl);
}



//create search list 
majors.forEach(function (major) {
    frameCompItem = frameCompList.children[0].cloneNode(true)
    frameCompItem.children[0].innerHTML = major.Major;
    frameCompList.appendChild(frameCompItem.cloneNode(true));
});

frameCompList.children[0].remove()

//searching the list
$(document).ready(function(){
    $("#majorInput").on("keyup", function() {
        var v = $(this).val();
        $(".results").removeClass("results");
        $(".noresults").removeClass("noresults");
        $(".search_item-w").each(function () {
            if (v != "" && $(this).text().search(new RegExp(v, 'gi')) != -1) {
                $(this).addClass("results");
            } else if (v != "" && $(this).text().search(v) != 1) {
                $(this).addClass("noresults");
            }
        });
    });    
})

//selected list items get added to the selection wrapper
$(".search_item-w").click(function (){
    addSelection($(this))

})
