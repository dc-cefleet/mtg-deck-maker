import {createElement} from "../../libs/elements.js";

export default (icon_id, onClick)=>{
    let iconSpan = createElement('span', {class:'icon-container', id:`Icon_${icon_id}`})
    iconSpan.innerHTML = localStorage.getItem(`Icon_${icon_id}`)
    if(onClick) {
        iconSpan.addEventListener('click', onClick)
        iconSpan.classList.add('clickable')
    }
    return iconSpan;
}
