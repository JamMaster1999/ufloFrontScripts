function visibility(start, end){
    console.log(start, end);
    if (start === 0){ start = null}
    if (end === 0){ end = null}
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
    } else if (end === null & start === null){
        lessonEl.children[2].children[0].src = "https://uploads-ssl.webflow.com/61365f53652529080f68048b/61365fad80031d116b44d128_visibility.svg"
        var formatDate = "Always Visible" 
        return formatDate
    }
}