import {createElement} from "../../libs/elements.js";
import store from "../store.js";

/*
    storedData = {
        id, name, imageUrl, manaCost, type, power, toughness
    }
*/

export default (cardId, cardData)=>{

    const createMtgCard = (card) =>{
        let cardImage = new Image();

        if(card.imageUrl){
            cardImage.src = card.imageUrl;
            cardImage.addEventListener('load', ()=>{
                cardContainer.removeChild(loading);
                cardContainer.append(cardImage)
            })
        } else {
            cardContainer.removeChild(loading);
            cardImage.src = "../../images/cardBack.jpg";
            cardContainer.append(cardImage)
            cardContainer.append(createElement('div', {class:"no-image-warning"}, "No Image Found."))
        }

    }


    let cardContainer = createElement('div', {class:'mtg-card'})
    let loading = createElement("img", {src:"../../images/loading.gif"})

    cardContainer.append(loading)
    
    cardContainer

    if(!cardData){
        store.getItem(cardId)
        .then(createMtgCard);
    } else {
        createMtgCard(cardData)
    }

    return cardContainer;
}