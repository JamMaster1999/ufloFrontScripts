function tagInv(tagList){
    var tagIDs = []
    if (tagList.length > 0) {
        for (tag of tagList){
            tagIDs.push(tag.getAttribute("compID"))
        }
    }
    return tagIDs
}