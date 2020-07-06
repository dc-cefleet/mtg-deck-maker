import {createElement} from "../../libs/elements.js";
import store from "../store.js";
import mtgCard from "../components/mtgCard.js"
import findCard from "../components/findCard.js"
export default (deckId) =>{
    //init
    let deckData = {};    
    store.getItem(deckId)
    .then(deck=>{
        deckData = deck;
        loadDom(deck)
    })

    const loadAddCardForm = () =>{
        content.prepend(findCard(onCardFound))
    }

    const onCardFound = (cardData) =>{
        content.removeChild(content.children[0]);
        let newDeck = [...deckData.cards, cardData.id];
        store.updateItem({...deckData, cards:newDeck})
        .then(res => {
            deckData = res;
        });
        cardsContainer.append(mtgCard(cardData.id, cardData))

    }

    const loadDom = (deck) =>{
        //dom after deck is loaded
        description.append(deck.description);
        header.append(deck.name);

        //this will cycle through
        deck.cards.forEach(card=>cardsContainer.append(mtgCard(card)))
        addCardButton.disabled = false;

    }
    
    //initial dom
    let header = createElement('h1',{})
    let content = createElement('div', {class:'content',id:'deck-page'});

    let description = createElement('p', {class:'deck-description', id:'deck-description'})
    let addCardButton = createElement('button',{class:"add-card-button", disabled:true}, 'Add Card') 
    let cardsContainer = createElement('div', {class:'deck-cards-list'})

    content.append(description,addCardButton,createElement('h3', {}, 'Cards In Deck'),cardsContainer)

    addCardButton.addEventListener('click', loadAddCardForm)

    return [header, content]
}