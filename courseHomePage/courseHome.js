//issue with lobj right click add
//better scalability on event listeners for cancel and create buttons



var selectComp = {}
var chapterWrapper = document.querySelector("#chaptersWrapper")
var chapterEl = chapterWrapper.children[1].children[0].cloneNode(true)
var lessonsWrapper = document.querySelector("#lessonsWrapper")
var lessonWrapper = document.querySelector("#lobjWrapper")
var chapters
var lessons
var currentLessons
var chapterID
var lessonEl
var lessonDetail
var lobjData
var courseID
var courseList
var courseSelect = document.querySelector("#courseList")
var hostURL = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/"
var selectedChapterID
var selectedLessonID

function lobjPage(lobjID){
    urlParams.set('lobj') = lobjID
    const urlParams = new URLSearchParams(window.location.search);
}



$.ajaxSetup({
    error: function(xhr, status, error) {
        responsePanel("error")
        //alert("error")
    }
});

requestPanel()

$.when($.get(hostURL + 'user/2/courses')).then(function(data,status){
    console.log("$.when > data", data)
    responsePanel("success")
    console.log(status)
    courseList(data[0].course_id)
})

function courseList(courses) {
    courses.forEach( function (course){
        var option = document.createElement("option")
        option.value = course[0].id
        option.text = course[0].title
        courseSelect.appendChild(option)
    })
}

courseSelect.onchange = function() {
    requestPanel()
    courseID = parseInt(this.value)
    courseLoad(courseID);
}

function courseLoad(courseID){
    var requestURL = hostURL + 'course/' + courseID
    $.when($.get(requestURL)).then(function(data,status){
        responsePanel("success")
        console.log(status)
        $response = data
        chapters = $response.chapter_of_course
        createChapters(chapters)
    })
}

function createChapters(chapterList){
    chapterWrapper.children[1].innerHTML = ''
    if (chapterList.length > 0){
        chapterList.forEach(function (chapter){
            chapterEl.children[0].textContent = chapter.order + ". " + chapter.title
            chapterEl.setAttribute("comp-type","chapter")
            chapterEl.setAttribute("compID",chapter.id)
            chapterWrapper.querySelector(".grid-auto-row").appendChild(chapterEl.cloneNode(true))
        })
        var chapterSortable = chapterWrapper.querySelector(".grid-auto-row")
        new Sortable(chapterSortable, {
            group:"chapter",
            animation: 250,
            ghostClass: 'blue-background-class',
            //forceFallback: true
        });
    } else {
        emptyState(chapterWrapper)
    }
}

chapterWrapper.addEventListener("click", function (event){
    console.log("clicked")
    eventPath = event.path
    chapterID = selectedChapter(eventPath)
    
})

function selectedChapter(event){
    for (var i=0; i<event.length-1; i++){
        if (event[i].getAttribute("compID") != null){
            createLessons(event[i].getAttribute("compID"))
            selectedChapterID = event[i].getAttribute("compID")
            break
        }
    }
}


function createLessons(chapterID){
    currentLessons = lessonsWrapper.querySelector(".grid-auto-row")
    if (currentLessons.children.length > 0){
        currentLessons.innerHTML = ''
    }
    lessons = chapters.find(obj => obj.id == chapterID).lesson_of_chapter
    console.log(lessons)
    lessonEl = document.createElement("lesson")
    lessonEl.classList.add("section_folders_item", "is--border")
    var lessonHTML = '<div class="lesson_tag-grid"><div class="small_tag is--text-color is--solid-border is--weight700 is--right-margin"><div>#1</div></div><div class="small_tag is--text-color is--solid-border is--weight700" ><div>-----</div></div></div><div class="lesson_points-grid"><div class="text is--highlighted is--text-color is--center is--border is--weight700">---</div><div class="text is--text-color is--right-margin is--left-margin is--weight700">/</div><div class="text is--highlighted is--text-color is--center is--border is--weight700">--- pts</div></div><div class="icon-w"><img src="https://assets.website-files.com/61365f53652529080f68048b/61365fad80031d116b44d128_visibility.svg" loading="lazy" alt="visible icon" class="icon-img is--xsmall is--right-margin"><div class="text is--text-color">Mon, Nov 2</div></div><h5 class="is--text-color is--weight400">Chapter 1: Waves and Optics Chapter 1: Waves and Optics </h5>'
    lessonEl.innerHTML = lessonHTML
    if (lessons.length != 0){
        lessons.forEach(function (lesson){
        console.log("lesson name: " + lesson.title)
        lessonEl.children[3].textContent = lesson.title
        lessonEl.children[2].children[1].textContent = visibility(lesson.startTime, lesson.endTime)
        lessonEl.setAttribute("comp-type","lesson")
        lessonEl.setAttribute("compID",lesson.id)
        lessonsWrapper.querySelector(".grid-auto-row").appendChild(lessonEl.cloneNode(true))
        })
        var lessonSortable = lessonsWrapper.querySelector(".grid-auto-row")
        new Sortable(lessonSortable, {
            group:"lesson",
            animation: 250,
            ghostClass: 'blue-background-class',
            forceFallback: true
        });
    } else {
        emptyState(lessonsWrapper)
    }
}

function visibility(start, end){
    //what happens if both are empty
    if (start != null & end != null){
        if (Date.now() > start & Date.now() < end){
            lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d116b44d128_visibility.svg"
        } else {
            lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d629a44d10b_invisible-2.svg"
        }
        var availStarts = new Date(start)
        var availEnds = new Date (end)
        var formatDate = availStarts.toString().slice(0,3) + ", " + availStarts.toString().slice(3,7) + " " + availStarts.getDate()
        formatDate = formatDate +  " - " + availEnds.toString().slice(0,3) + ", " + availEnds.toString().slice(3,7) + " " + availEnds.getDate()
        return formatDate;
    } else if (start === null & end != null){
        if (Date.now() < end){
            lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d116b44d128_visibility.svg"
        } else {
            lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d629a44d10b_invisible-2.svg"
        }
        var availEnds = new Date (end)
        var formatDate = "Visible on: " + availEnds.toString().slice(0,3) + ", " + availEnds.toString().slice(3,7) + " " + availEnds.getDate()
        return formatDate;
    } else if (end === null & start != null){
        if (Date.now() > start){
            lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d116b44d128_visibility.svg"
        } else {
            lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d629a44d10b_invisible-2.svg"
        }
        var availStarts = new Date (start)
        var formatDate = "Visible from: " + availStarts.toString().slice(0,3) + ", " + availStarts.toString().slice(3,7) + " " + availStarts.getDate()
        return formatDate
    }
}

lessonsWrapper.addEventListener("click", function (event){
    console.log("clicked")
    eventPath = event.path
    lessonID = selectedLesson(eventPath)
})

function selectedLesson(event){
    for (var i=0; i<event.length-1; i++){
        if (event[i].hasAttribute("compID")){
            //closePanel(0)
            requestPanel()
            selectedLessonID = event[i].getAttribute("compID")
            lessonRequest(event[i].getAttribute("compID"))
            break
        }
    }
}

function lessonRequest(lessonID){
    var route = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/lesson/" + lessonID
    $.when($.get(route)).then(function(data,status){
        console.log(status)
        console.log(data)
        lessonDetail = data.lesson
        lobjData = lessonDetail.lobj_of_lesson
        responsePanel("success")
        //$chapters = $response.chapter_of_course
        lessonDetails(lessonDetail, lobjData)
    
    })
    
}

function lessonDetails(content, lobjs){
    lessonWrapper.children[0].textContent = content.title
    lessonWrapper.children[1].textContent = content.desc
    createLOBJs(lobjs)
}
function createLOBJs(lobjList){
    //empty all current elements
    var selectedLesson = lessonWrapper.querySelector(".grid-auto-row")
    if (selectedLesson.children.length > 0){
        selectedLesson.innerHTML = ''
    }
    if (lobjList.length > 0){
        lobjList.forEach(function (lobj){
            var lobjEl = document.createElement("div")
            lobjEl.classList.add("lobj-grid","is--border")
            var lobjHTML = '<div class="lobj-numbers"><div class="icon_wrapper"><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149f9445288582cdd4a4739_icons8-ranking.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><div class="text is--text-color" style="color: rgb(0, 0, 0);">---&nbsp; / --- pts</div></div></div><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149c5de0e3c32876ed77a41_icons8-content-2.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><div class="text is--text-color" style="color: rgb(0, 0, 0);">10 Frames</div></div><div class="heightline"></div><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149c582e966ca33b609fa09_icons8-clock.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><div class="text is--text-color" style="color: rgb(0, 0, 0);">25 Mins</div></div><div class="heightline"></div><div class="icon_wrapper"><img src="https://assets.website-files.com/61365f53652529080f68048b/6149c66b330febec5b46dcc2_icons8-ask-question.svg" alt="" class="icon-img is--xsmall is--right-margin" style="filter: invert(100%);"><h6 class="is--text-color is--weight400" style="color: rgb(0, 0, 0);">0 Q</h6></div></div><h4 style="color: rgb(0, 0, 0);" class="is--text-color">What is statistics</h4><div class="paragraph is--text-color" style="color: rgb(0, 0, 0);">Statistics is the study of different disciplines to understand hwo they realte to each each other thorugh numbers.fsdfsdf</div>'
            lobjEl.innerHTML = lobjHTML
            console.log("frame count" + lobj.frame_of_lobj.length)
            lobjEl.querySelector(".lobj-numbers").children[1].children[1].textContent = lobj.frame_of_lobj.length + " Frames"
            lobjEl.querySelector(".lobj-numbers").children[3].children[1].textContent = lobj.timeExp + " Mins"
            lobjEl.children[1].textContent = lobj.title
            lobjEl.children[2].textContent = lobj.desc
            lobjEl.setAttribute("comp-type","lobj")
            lobjEl.setAttribute("compID",lobj.id)
            selectedLesson.appendChild(lobjEl)
            if (lobj.frame_of_lobj.length > 0){
                //createFrames(lobj.frame_of_lobj)
            } else {
                //emptyState(lobjEl)
            }
        })
        var lobjSortable = lessonWrapper.querySelector(".grid-auto-row")
        new Sortable(lobjSortable, {
            group:"lobj",
            animation: 250,
            ghostClass: 'blue-background-class',
            //forceFallback: true
        }); 
    } else {
        emptyState(lessonWrapper)
    }
}


function createFrames(frameList){
    frameList.forEach(function(frame){
    var lobjFrameEl = document.createElement("a")
    lobjFrameEl.classList.add("frame-link", "text", "is--text-color")
    lobjFrameEl.textContent = frame.order + ". " + frame.title 
    lobjEl.querySelector(".frames-w").appendChild(lobjFrameEl)
    })
    
}

function emptyState(parent){
    var emptyState = document.createElement("div")
    emptyState.classList.add("empty-state", "section--bg-color", "is--center", "is--weight700", "is--btm-margin")
    var emptyStateHTML = '<div>You have not added any lessons yet.</div>'
    emptyState.innerHTML = emptyStateHTML
    parent.querySelector(".grid-auto-row").appendChild(emptyState)
}


document.querySelector(".section_dashboard").addEventListener("contextmenu", function(event){
    contextMenuTarget(event)
})