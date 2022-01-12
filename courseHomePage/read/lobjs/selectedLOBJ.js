function lobjPage(lobjID){
    urlParams.set('lobj') = lobjID
    const urlParams = new URLSearchParams(window.location.search);
}

function selectedLOBJ(event){
    for (var i=0; i<event.length-1; i++){
        if (event[i].hasAttribute("compID")){
            //closePanel(0)
            var url = new URL("https://flomotion-final.webflow.io/student-lobj-copy?chapter=" + selectedChapterID + "&lesson=" + selectedLessonID + "&lobj=" + event[i].getAttribute("compID"))
            window.open(url, '_blank');
            break;
        }
    }
}