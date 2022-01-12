var target = document.querySelector('div#mainContainer > p')

var observer = new MutationObserver( mutate );
var mutationConfig = { characterData: true, childList: true, subtree: true };

var testMutation
var mutationObs
var mutatedFrameID
var mutationType

function initObservation(state){
    for (frame of frameWrapper.children){
        if (state){
            observer.observe(frame, mutationConfig)
        }
        else {
            observer.unobserve(frame, mutationConfig);
        }
    }
}

function mutate(mutations) {
    mutations.forEach(function(mutation) {
        testMutation = mutation;
        mutationObs = mutation.target;
        if (mutation.type == "characterData"){
            mutationType = "edit"
            frameMutated(mutationObs.parentElement)//.then((id) => consolasdfe.log(id))
            if (mutationObs.parentElement.nodeName == "H5"){
                var newTitle = mutationObs.data
                console.log("frame title changed" + newTitle + mutatedFrameID)
                document.querySelector("#frameNav" + mutatedFrameID).children[0].textContent = newTitle;
            }
        } else if (mutation.type == "childList"){
            mutationType = "add or remove component"
            if (mutation.addedNodes.length != 0){mutationType = "add"; mode(false)}
            if (mutation.addedNodes.length != 0){mutationType = "remove"}
            frameMutated(mutationObs.parentElement)
            var compCount = document.querySelector("#frameID" + mutatedFrameID).querySelector(".grid-auto-row").children.length
            if (compCount == 0){
                emptyState(document.querySelector("#frameID" + mutatedFrameID))
            }
        }
    });
}

var mutationFrameEl
const frameMutated = async function (mutationEl){
    console.log("frameMutated", mutationEl)
    mutationFrameEl = mutationEl;
    if (mutationEl.hasAttribute("comp-type") && mutationEl.getAttribute("comp-type") == "frame"){
        mutatedFrameID = mutationFrameEl.getAttribute("compid")
        mutatedFrameContent(mutationFrameEl)
        return mutationFrameEl.getAttribute("compid")
    } else {
        frameMutated(mutationEl.parentElement);
    }
}
var newFrameContent = []
function mutatedFrameContent(frameEl){
    newFrameContent.push(frameInv(frameEl))
    return frameInv(frameEl)
}

initObservation(true)

//deleteFrame mutation asdfasdf
//check against frameComp for adding or removing the emptyState
//add frame mutation
//frameInv for frame preparation
//backend ready to receive the saved frames




