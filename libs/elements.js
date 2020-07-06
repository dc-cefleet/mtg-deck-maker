export const queryElement = (query, multiple = false)=>{
    let results = null;
    if(multiple){
        results = document.querySelectorAll(query)
    } else {
        results = document.querySelector(query)
    }
    return results;
   
}

export const createElement = (type, attributes, children)=>{
    attributes = attributes || {};
    let e = document.createElement(type);
    for(let op in attributes){
        e.setAttribute(op, attributes[op])
    }
    if(Array.isArray(children)){
        children.forEach(child=>e.append(child))
    } else if (children) {
        e.append(children)
    }

    return e;
}