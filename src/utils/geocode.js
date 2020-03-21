const request = require('request')
const geocode = (address,callback) => {
    const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lkamFpbjciLCJhIjoiY2s0eW1rbjB1MDIxbjNrcDg3YzMyaDNsMyJ9.KTNRHqUQ3Yod_7cK7kRvWA'
    
    request({url: mapURL , json: true},(error,{body}) => {
        if(error){
            callback('Unable to connect to location services!!',undefined)
        }else if(body.features.length===0){
            callback('Enter correct location!!',undefined)
        }else{
            callback(undefined ,{
                latitude:body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location:body.features[0].place_name  
            })
        }
    })
}
module.exports = geocode