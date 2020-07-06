//const { uuid } = require("../libs/utilities");
import {uuid} from "../libs/utilities.js";

let db = JSON.parse(localStorage.getItem("MTGData")) || []; 
const updateDB = (data) =>{
    localStorage.setItem("MTGData", JSON.stringify(data))
}

const store = () =>{
   
    const _clone = (item) =>{
        return JSON.parse(JSON.stringify(item))
    }

    //returns a single item
    const getItem = (id) =>{
        return new Promise((resolve, reject)=>{
            
            let item = db.find(i=>i.id === id);
            if(!item) {
                reject('Item Not Found');
                return;
            }
            resolve(_clone(item))
        })
    }

    //returns items by array of ids
    const getItems = (ids) =>{
        return new Promise((resolve, reject)=>{
            let items = group.filter(i=>ids.includes(i.id));
                        
            resolve(_clone(items))
        })
    }

    //returns all items within a limit
    const getItemsByType = (type, limit = null, startIdx=0) =>{
        return new Promise((resolve, reject)=>{

            if(limit && typeof(limit) !== 'number'){
                reject('Limit is not a valid number.')
                return;
            }
        
            let group = db.filter(i=>i.type === type)               
           
            let final = group.length;
            if(limit) final = startIdx + limit; 
            
            resolve(_clone(group.slice(startIdx, final)))
        })      
    }

    //probably should put a type constraint here
    const getItemsByAttributes = (attributes) =>{
        return new Promise((resolve, reject)=>{

            if(!attributes){
                reject('No Attribute provided.')
                return;
            }
            
            let compareKeys = Object.keys(attributes)

            let group = db.filter(i=>{
                let res = [...new Set(compareKeys.map(key=>attributes[key] && i[key] && (i[key].toLowerCase() === attributes[key].toLowerCase())))]
                if(res.length === 1 && res[0]){
                    return true;
                }
                return false;
            })
        
            resolve(_clone(group))
        })
    }

    //adds item and returns the new item
    const addItem = (item) =>{
        return new Promise((resolve, reject)=>{
            if(!item.type){
                reject('Each item must have a type.');
                return;
            }

            if(db.find(i=>i.id === item.id)){
                reject('Item with ID already exists.');
                return;
            }

            item = {..._clone(item)}

            item.id = item.id || uuid(true);
            db.push(item)//updates the store
            //updates local storage
            updateDB(db)
            resolve(item)
        })
    }

    const updateItem = (item, add = true) =>{
        return new Promise((resolve,reject)=>{
            if(!item.type){
                reject('Each item must have a type.');
                return;
            }

            let idx = db.findIndex(i=>i.id === item.id)
            item = {..._clone(item)}
            if(idx){
                db[idx] = item;
            } else {
                item.id = item.id || uuid(true)
                db.push(item)
            }
            
            updateDB(db)        
            resolve(item)
        })
    }

    //returns the id of the removed item
    const removeItem = (id) =>{
        return new Promise((resolve, reject)=>{

            let item = db.find(i=>i.id === id);
            if(!item) {
                reject('Item Not Found')
                return;
            }
            db = db.filter(i=>i.id != id)
            updateDB(db)
            resolve(id)
        })
    }

    return {
        getItem,
        getItems,
        getItemsByType,
        getItemsByAttributes,
        addItem,
        removeItem,
        updateItem
    }
}
export default store()