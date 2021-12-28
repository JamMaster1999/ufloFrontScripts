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
    selectionText = $(this).text()
    selectionItem = $(".search_selection")[0].cloneNode(true)
    selectionItem.classList.remove("is--theme")
    selectionItem.children[1].innerText = selectionText
    $(".search_selection-w")[0].appendChild(selectionItem.cloneNode(true));
})
