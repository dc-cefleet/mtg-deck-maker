import fetcher from "../../libs/fetcher.js";
import input from "./input.js";
import store from "../store.js";
import mtgCard from "./mtgCard.js";
import {createElement} from "../../libs/elements.js";

export default (onCardAccepted) =>{
    
    const showCards = (cards) =>{
        result.innerHTML = "";
        cards.forEach(card=>{
            let cardElement = mtgCard(card.id, card);
            cardElement.addEventListener('click', ()=>onCardAccepted(card))
            result.append(cardElement)
        })
    }

    const saveCardToDB = (card) =>{
        store.addItem({
            type:"MTGCard",
            name:card.name,
            imageUrl:card.imageUrl,
            manaCost:card.manaCost,
            cardType:card.type,
            power:card.power,
            toughness:card.toughness,
            id:card.id,
        })
    };

    const startSearch = async () =>{
        searchInput.disabled = true;
        searchButton.disabled = true;
        let query = searchInput.value;
        result.innerHTML = "Searching Local Database. Please Wait ..."
        let inDB = await store.getItemsByAttributes({
            name:query,
            type:'MTGCard'
        })
        console.log(inDB);
        if(inDB.length > 0){
            showCards(inDB)
            return;
        }
        
        result.innerHTML = "Searching API. Please Wait ..."
        let apiSearch = await fetcher(`https://api.magicthegathering.io/v1/cards?name=${query}`);
        if(apiSearch && apiSearch.cards && apiSearch.cards.length > 0){
            apiSearch.cards.forEach(cardData=>saveCardToDB(cardData))
            showCards(apiSearch.cards);
            return;
        } 

        result.innerHTML = "No Cards Found with that name."        

        //
    }


    //DOM
    let searchForCard = createElement('div', {class:'search-for-card'})

    let searchInput = createElement('input', {placeholder:'Search for Card By Name', class:'search-input'});
    let searchButton = createElement("button", {class:'search-button'}, "Find Card");
    let result = createElement('div', {class:'search-result'})

    let searchForm = createElement('fieldset',{class:'card-search-form'},[
        createElement('legend', {}, 'Card Search'),
        searchInput,
        searchButton,
        result
    ])


    searchForm.append(searchInput,searchButton);
    searchForCard.append(searchForm);

    searchButton.addEventListener('click', startSearch)

    return searchForCard;
}