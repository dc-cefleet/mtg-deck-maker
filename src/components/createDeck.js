import input from "./input.js";
import {createElement} from "../../libs/elements.js";
import fetcher from "../../libs/fetcher.js";
import {iconsAuth, proxy} from "../../config.js";
import store from "../store.js";
import createIcon from "./icon.js";

export default (onSubmit, onCancel)=>{
    //state items
    let iconSelected = null;

    //functions
    const submitDeck = ()=>{
        let name = document.querySelector('#deck-name').value;
        let description = document.querySelector("#deck-description").value;
        //need to validate more than this
        if(name === "") return;
    
        store.addItem({
            type:"Deck", 
            name:name, 
            icon:iconSelected,
            cards:[],
            description:description || 'A description can be aplied to this deck.'
        })
        .then((res)=>{
            name = ""
            description = ""
            onSubmit(res)
        })
        .catch(err=>console.log(error))
    }

    //took it out
    const searchForIcons = async (search)=>{  
                     
        const results = await fetcher(`${proxy}https://api.iconfinder.com/v4/icons/search?premium=0&query=${search}&vector=1&count=40&license=commercial-nonattribution`, {
            "Authorization": `Bearer ${iconsAuth}`
        })

        Promise.all(results.icons.map(getImageFromJson))
        .then(values=>{
            loadIcons(values)
            iconsSearch.disabled = false;
            searchButton.disabled = false;
            iconsSearch.value = "";
        })
    }

    const getImageFromJson = async (iconData) =>{
        let svg;
        try{
            let v_format = iconData.vector_sizes[0].formats;
            svg = v_format.find(f=>f.format === 'svg');
            if(!svg) return;
        } catch(error){
          console.warn('Incorrectly formated JSON.')
          return;
        }
        let icon = localStorage.getItem(`Icon_${iconData.icon_id}`)
        if (icon && dbIcon.length > 0){
            return dbIcon;
        }

        icon = await fetcher(`${proxy}${svg.download_url}`, {
            "Authorization": `Bearer ${iconsAuth}`
        },'svg')

        localStorage.setItem(`Icon_${iconData.icon_id}`, icon)
        let newItem = await store.addItem({type:"Icon", icon_id:iconData.icon_id})

        return newItem;
        
    }

    const setIcon = (id) =>{
        iconSelected = id;
        let iconsArray = [...icons.children];
        iconsArray.forEach(ico=>{
            ico.classList.remove('selected')
            ico.classList.add('clickable')
        })
        let selected = iconsArray.find(ico=>ico.id === `Icon_${id}`)
        selected.classList.add('selected')
        selected.classList.remove('clickable')

    }

    const loadIcons = dbIcons=>{
        icons.innerHTML = "";
        dbIcons
        .sort(() => Math.random()-Math.random())
        .slice(0, 15)
        .forEach(icon=>icons.append(createIcon(icon.icon_id,(evt)=>setIcon(icon.icon_id))))
    }

    //DOM creation
    let submit = createElement('button', {}, 'Create Deck');
    let cancelButton = createElement("button", {class:'cancel-button'}, 'Cancel');

    let iconsSearch = createElement('input', {placeholder:'Search API for Icons', class:"search-input"});
    let searchButton = createElement("button", {class:'search-button'}, "Find Icons");
    let icons = createElement("div", {class:"icons", id:'icons'});

    let iconManager = createElement("div", {class:"icons-container"}, [
        createElement('label', {}, 'Choose Icon'),        
        icons,
        //iconsSearch,
        //searchButton
    ])
    
    let deckNameInput = input('deck-name', 'Deck Name', {class:"name"});
    let deckDescriptionInput = input('deck-description', 'Deck Description', {class:"description"}, 'textarea');

    let form = createElement("fieldset",{class:"create-deck-form"},[
        createElement('legend', {}, 'Create new Deck'),
        deckNameInput,
        deckDescriptionInput,
        iconManager,
        submit,
        cancelButton
    ])
    
    //listeners
    submit.addEventListener('click',submitDeck);

    searchButton.addEventListener('click', ()=>{
        iconsSearch.disabled = true;
        searchButton.disabled = true;
        searchForIcons(iconsSearch.value)
    })

    cancelButton.addEventListener('click', ()=>{
        form.parentElement.removeChild(form)
        onCancel()
    })
    
    //load some icons from local storage
    store.getItemsByType("Icon")
    .then(loadIcons)

    return form;
}