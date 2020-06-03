export default {Ajax}
class Ajax{
    url="";
    constructor(url){

    }
    post(data,callback){
        fetch(this.url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:data
        })
        .then(response=>response.json())
        .then(data=>callback(data))
        .catch(error=>{
            console.error("Error: "+error)
            console.error("Could not send post request\n"+this.url+"\n"+data)
        })
    }
    get(callback){
        fetch(this.url)
        .then(response=>response.json())
        .then(data=>callback(data))
        .catch(error=>{
            console.log("Error "+error)
            console.error("Could not send get request\n"+this.url)
        })
    }
}

class BrowserDataBase{}
