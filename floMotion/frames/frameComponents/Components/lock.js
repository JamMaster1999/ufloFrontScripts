function lock(html){
    var lockWrapper = document.querySelector(".frame_lock-w")
    lockWrapper.children[0].innerHTML = html
    document.querySelector("#frameLockOpen").click()
}