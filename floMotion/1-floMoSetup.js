var response
var lobj

//var frameWrapper = document.querySelector("#framesWrapper")
var frameWrapper = document.createElement("div")
frameWrapper.classList.add("is--state-holder", "is--active")
frameWrapper.id = "framesWrapper"
document.querySelector(".framerep-w").appendChild(frameWrapper)

var urlParams = new URLSearchParams(window.location.search);

var lobjParam = urlParams.get('lobj')
var chapterParam = urlParams.get('chapter')
var lessonParam = urlParams.get('lesson')

//for latex comps asdfasdf
var latexEls = []  
requestPanel()
fetch("https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/lobj/" + lobjParam)
    .then(res => res.json())
    .then(data => response = data)
    .then(() => frameInit())
    .catch((error) => {
        console.error('Error:', error);
        responsePanel('error')
    });

//frame content when making a post request
//navbar
//frame index on title and actual order on SORT
//dynamic loading of lobj
//dynamic loading of the user
