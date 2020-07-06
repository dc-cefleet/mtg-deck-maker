const getAPI = async (url, headers, type='json')=>{

    let options = {};
    if(headers){
        options = {
            headers:headers || null
        }
    }

    let data = await (await fetch(url, options)
    .then(resp=>{
        if(type === 'json'){
            return resp.json()
        } else {
            return resp.text()
        }
    })
    .then(data=>data)
    .catch(err=>err))

    return data
}


export default getAPI;
