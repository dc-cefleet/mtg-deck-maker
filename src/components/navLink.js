import {createElement} from "../../libs/elements.js";
import {uuid} from "../../libs/utilities.js";
import createPage from "../createPage.js";

export default (text, classes, id)=>{ 
    let e = createElement(
        "div",
        {class:`nav-element ${classes}`, 
        id:id ? id : uuid(true)}
    )
    e.append(text);
    e.addEventListener('click', ()=>createPage(text))
    return e;
}