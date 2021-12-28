function addFrameCompMenu(frameEl){
    document.getElementsByClassName("frame_comp-list")[0].style.display = "flex"
    selectedFrame = frameEl
    if (prevAddFrameCompBtn != '') { prevAddFrameCompBtn.style.display = "flex"}
    var searchWrapper = frameEl.querySelector(".addframecomp")
    searchWrapper.appendChild(frameCompSearch);
    frameCompSearch.querySelector("input").focus()
    searchWrapper.querySelector('.button').style.display = "none"
    document.getElementsByClassName("frame_comp-list")[0].style.top = frameEl.getBoundingClientRect().top + window.scrollY + frameEl.clientHeight + "px"
    //initSearch(frameCompSearch.querySelector(".input"), searchWrapper.querySelector(".frame_comp-list"));
    prevAddFrameCompBtn = searchWrapper.querySelector('.button')
}