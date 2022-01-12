

function createLOBJs(lobjList){
    lobjList.forEach(function (lobj){
        lobjNavEl.children[0].textContent = lobj.title
        lobjNavEl.id = "lobjID" + lobj.id
        if (lobj.id == lobjParam){lobjNavEl.classList.add("is--theme-border")}
        lobjNavEl.setAttribute("lobjID", lobj.id)
        console.log("lobj created")
        lobjNavEl.querySelector('.grid-auto-row').innerHTML = ""
        createFrameNav(lobj.allFrames, lobjNavEl)
        lobjListEl.appendChild(lobjNavEl.cloneNode(true))
    })
    lobjListEl.children[0].remove()
}