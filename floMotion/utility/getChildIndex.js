function getChildElementIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
}