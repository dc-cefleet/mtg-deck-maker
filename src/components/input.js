import {createElement} from "../../libs/elements.js"

export default (id, label,attributes = {}, type='input') =>{
    let input = createElement(type, {...attributes, id:id});

    let container = createElement('div', {class:'input-item'},[
        createElement('label', {for:id},label),
        input
    ])
    return container
}