
function createLOBJs(lobjList){
    lobjList.forEach(function (lobj){
        lobjNavEl.children[0].textContent = lobj.title
        lobjNavEl.id = "lobjID" + lobj.id
        lobjNavEl.setAttribute("lobjID", lobj.id)
        createFrameNav(lobj.allFrames, lobjNavEl)
        lobjNavEl.children[2].children[0].remove()
        lobjListEl.appendChild(lobjNavEl.cloneNode(true))
        
    })
    lobjListEl.children[0].remove()
}