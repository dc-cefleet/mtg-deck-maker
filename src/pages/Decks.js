import {createElement} from "../../libs/elements.js";
import store from "../store.js";
import deck from "../components/deckCard.js";
import createDeckForm from "../components/createDeck.js";
import createPage from "../createPage.js";

export default ()=>{
    //functions 
    const newDeckCreated = (deckData)=>{
        newDeckButton.classList.remove('hidden')
        content.removeChild(content.children[0])
        decksContainer.append(deck(deckData))
    }

    const addDeckToDOM = (deckData) =>{
        decksContainer.append(deck(deckData, ()=>deckChosen(deckData.id)))
    }

    const loadCreateDeckForm = () =>{
        content.prepend(createDeckForm(newDeckCreated, unLoadCreateDeckForm))
        newDeckButton.classList.add('hidden')
    }

    const unLoadCreateDeckForm = () =>{
        newDeckButton.classList.remove('hidden')
    }

    const deckChosen = (id) =>createPage('Deck', id)
    

    //create DOM elements
    let header = createElement('h1',{}, 'Decks')
    let content = createElement('div', {class:'content',id:'decks-page'});

    let newDeckButton = createElement('button', {}, 'Create New Deck');
    newDeckButton.addEventListener('click', loadCreateDeckForm);

    let decksContainer = createElement('div', {id:'decks-list', class:'decks-list'})
    content.append(
        newDeckButton,
        createElement('label', {}, 'Avalible Decks'), 
        decksContainer
    )      

    //gets the decks and adds them when they are loaded
    store.getItemsByType('Deck')
    .then(decks=>{
        decks.forEach(deckData=>addDeckToDOM(deckData))
    })
    .catch(error=>console.warn(error))
   
    return [header,content]
}