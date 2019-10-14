const request = require ('request')

const geocode = (adresse, callback)=>{
    const geocodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adresse +'.json?access_token=pk.eyJ1IjoieWFzc2lubyIsImEiOiJjazFmYzlnNjgwMTdhM2RwNm9hbDNucmtzIn0.rqF2neYOqDvbRvc9psZ7AQ&limit=1'
    request ({url: geocodeUrl, json: true},(error,{body})=>{
        
        if(error){
            callback('Unable to connect to location sevices!', undefined)
        }else if((body.features).length === 0){
            callback('Unable to find location!',undefined)
        }else{
            
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

const forecast = (x,y, callback)=>{
    const url='https://api.darksky.net/forecast/bfaca6efc16f269a4b71a0bfdd18772e/'+ x +','+ y +'?units=si&lang=fr'
    request ({ url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather sevices!', undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' it is currently '+ body.currently.temperature  +' degree out. there is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
}

module.exports={
    geocode,
    forecast
}