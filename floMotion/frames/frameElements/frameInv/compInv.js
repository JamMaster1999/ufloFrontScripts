function compInv(components){
    var content = []
    var order = 0
    for (var comp of components){
        order = order + 1
        var compObj = {}
        if (comp.classList.contains("js-reframe")){comp = comp.children[0]}
        if (typeof window[comp.getAttribute("comp-type")+"Inv"] === "function"){
            compObj.data = window[comp.getAttribute("comp-type")+"Inv"](comp)
            compObj.type = comp.getAttribute("comp-type")
            compObj.order = order
            content.push(compObj)
            if (comp.getAttribute("comp-type") === 'expandable'){
                console.log("expandable")
                var expandableList = comp.querySelector(".is--expandable").querySelector(".grid-auto-row").children
                for (var expandItem of expandableList){
                    var expandObj = {}
                    order = order + 1
                    console.log(expandItem.getAttribute("comp-type"))
                    expandObj.data = window[expandItem.getAttribute("comp-type")+"Inv"](expandItem)
                    expandObj.type = expandItem.getAttribute("comp-type")
                    expandObj.order = order
                    console.log(expandObj)
                    content.push(expandObj)
                }
            }
        }
    }
    return content
}