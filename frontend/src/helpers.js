function destroyAllChildren(node) {
    var child = node.lastElementChild;  
    while (child) { 
        node.removeChild(child); 
        child = node.lastElementChild; 
    } 
}
