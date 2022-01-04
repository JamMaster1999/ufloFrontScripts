var coordinate = {"x": "0","y": "0"}
var eventPath
//recognizes whether the element has context menu enabled or not;
function contextMenuTarget(event){
    eventPath = event.path
    for (var i=0; i<eventPath.length-1; i++){
        //this conditional is used because of latex element, which uses shadow root
        //this condition skips shadow root elements
        if (eventPath[i].activeElement === undefined & eventPath[i].body === undefined){
            if (eventPath[i].getAttribute("comp-type") != null){
                contextCoordinate(event)
                contextMenuTrigger(eventPath[i])
                console.log(eventPath[i] + "," + i)
                break;
            }
        }
    }
}

function contextCoordinate(event){
    event.preventDefault()
    coordinate.x = event.clientX + "px"
    coordinate.y = event.clientY + "px"
}