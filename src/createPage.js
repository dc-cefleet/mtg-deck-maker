import {queryElement, createElement} from "../libs/elements.js";
import navBar from "./components/navBar.js";
import navLink from "./components/navLink.js";
import footer from "./components/footer.js"

//import pages this could be done dynamically.
import Decks from "./pages/Decks.js";
import Deck from "./pages/Deck.js";

let pages = {Decks, Deck}
const createPage = (page, data)=>{
    //page is now known to the whole document
    
    let body = queryElement("body");
    body.innerHTML  = "";

    //Add Navbar
    body.append(navBar([
        navLink('Decks',`${page == 'Decks'? 'active' :""}`),
    ]))

    //Add Page Content
    let container = createElement('div', {class:'page-container'}, pages[page](data))
    body.append(container);

    //Add Footer
    body.append(footer())


}

export default createPage;