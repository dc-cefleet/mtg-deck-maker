import store from "../store.js"
export default () => {
    let body = document.querySelector("body")
    store.getItemsByType("Icon")
    .then((icons)=>icons.forEach(icon=>{
        console.log(icon)
        let res = localStorage.getItem(`Icon_${icon.icon_id}`);
        if(res === 'TypeError: Failed to fetch'){
            localStorage.removeItem(`Icon_${icon.icon_id}`)
        } else if (!res){
            store.removeItem(icon.id)
        }
        console.log(res)
    }))
}