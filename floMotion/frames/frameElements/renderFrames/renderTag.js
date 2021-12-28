function renderTag(tags,frame){
    //var tagEl = frameEl.children[0].children[0].cloneNode(true)
    var tagEl = document.createElement("div")
    tagEl.classList.add("frame_tag", "is--right-margin", "is--solid-border")
    tagEl.innerHTML = '<div> Tag </div>'
    var tagWrapper = frame.querySelector(".tag-w")
    tags.forEach(function(tag){
        //better to use .filter(v => v % 2 === 0).forEach
        if (tag.hidden){
            return
        }
        console.log("tag ID: " + tag[0].id + " title: " + tag[0].name)
        tagEl.children[0].textContent = tag[0].name
        //console.log("tag ID: " + tag[0].id + " title: " + tag[0].name)
        console.log("tag frontend " + tagEl.children[0].textContent)
        tagEl.setAttribute("comp-type","tag")
        tagEl.setAttribute("compID",tag[0].id)
        tagWrapper.appendChild(tagEl.cloneNode(true))
    })
}