var allFrameData = []
function saveFrame(frameData){
    var formAction = "https://x8ki-letl-twmt.n7.xano.io/api:9toeBRNq/frame/" + frameData.id
    allFrameData.push(frameData)
    // $.ajax(formAction, {
    //     data: frameData,
    //     method: "POST"
    // })
    // .done((res) => {
    //     //responsePanel("success")
    // })
    // .fail((res) => {
    //     //responsePanel("error")
    // })

}