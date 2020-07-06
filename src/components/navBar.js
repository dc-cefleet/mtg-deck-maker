import {createElement} from "../../libs/elements.js";

export default (children) =>{
    return createElement('nav',{class:"navbar", id:'navbar'},children)
}