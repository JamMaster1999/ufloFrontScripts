var flow = {}
var presentation = []
var startTime
var currentTime 
var drawing = {}
var currentMousePos = { x: -1, y: -1 }
var timer
var mousePositions = []
var handler = function() {
    trigger();
};


$("#present").click(function(){
    startTime = Date.now();
    $(window).scroll(handler)
    $("#divID").mouseover(handler) 
    //add trigger for drawing
    
})

$("#end").click(function(){
    $(window).off("scroll", handler);
    $("#divID").off("mouseover",handler);
    replay()
})


function replay(){
    for (var c = 0; c<=presentation.length-1; c++) {
        var pxConversion = presentation[c].scroll / 100 * (document.body.clientHeight-window.innerHeight)
        var replyTime = presentation[c].time
        var mouseX = presentation[c].mouse.x / 100 * window.innerWidth;
        var mouseY = presentation[c].mouse.y / 100 * window.innerHeight
        //console.log("At index"+ c + "Time is: " + replyTime + "and scroll is" + pxConversion)
        console.log("At index"+ c + "mouse x is: " + mouseX + "mouse y is" + mouseY)
        scrollSetTimeout(pxConversion,replyTime)
        mouseSetTimeout(mouseX,mouseY,replyTime)
    }
}

function scrollSetTimeout(scrollLocation,timeout) {
    setTimeout(function(){ window.scrollTo(0, scrollLocation)}, timeout);
  }

function mouseSetTimeout(x,y,timeout) {
setTimeout(function(){ 
    $("#mouse").css("top",y)
    $("#mouse").css("left",x)
}, timeout);
}

function trigger(){
    clearTimeout(timer);
    scroll()
    time()
    mouse()
    //drawing()
    presentation.push(flow)
    console.log(flow.mouse)
    console.log(flow)
    flow = {}
    timer = setTimeout(warning, 5000);
}



function scroll(){
    var current = scrolled()
    var progress =  100 * current / (document.body.clientHeight-window.innerHeight)
    flow.scroll = progress
    console.log("progress is " + progress + "%")
}
function scrolled() {
    return $(window).pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function time(){
    currentTime = Date.now() - startTime
    flow.time = currentTime
    console.log("currently at " + currentTime)
}

function mouse(){  
    $(document).mousemove(function(event) {
        currentMousePos.x = 100*event.clientX/window.innerWidth;
        currentMousePos.y = 100*event.clientY/window.innerHeight;
    });
    //console.log("mouse is at " +  currentMousePos.x + ","+ currentMousePos.y)
    flow.mouse = JSON.parse(JSON.stringify(currentMousePos))
    mousePositions.push(JSON.parse(JSON.stringify(currentMousePos)))
    //console.log("mouse is at " + flow.mouse.x + "," + flow.mouse.y)
    console.log(flow.mouse)
    console.log(currentMousePos.x)
    console.log(currentMousePos.y)
};

function warning(){
    console.log("warning")
}