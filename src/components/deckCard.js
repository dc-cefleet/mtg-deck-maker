import {createElement} from "../../libs/elements.js";
import icon from "./icon.js";

export default (deckData, onClick) =>{
 
    let deck = createElement('div', {class:'deck', id:deckData.id}, [
        createElement('div', {class:'deck-name'}, deckData.name),
        createElement('div', {class:'deck-additional'},[
            createElement('div', {}, icon(deckData.icon)),
            createElement('div', {class:'deck-details'}, [
                createElement('div', {class:'deck-description'}, deckData.description),
                createElement('div', {class:'deck-cards-count'}, [
                    'cards :',
                    createElement("span", {class:'card-count-number'}, ` ${deckData.cards.length}`)
                ])
            ])
        ])        
    ])

    deck.addEventListener('click', onClick)
    return deck;
}