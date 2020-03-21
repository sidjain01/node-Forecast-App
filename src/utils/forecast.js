const request = require('request')
const forecast = (latitude,longtitude,callback) => {
    const weatherUrl = 'https://api.darksky.net/forecast/993dd4d7efffa9d50e4881d832ff1709/'+ latitude + ',' + longtitude

    request({url: weatherUrl, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to forecast services!',undefined)
        }else if(body.error){
            callback('Unable to find location!! Wrong Coordinates...',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + ((body.currently.temperature-32)*5/9).toFixed(2) + ' degree celsius out.There is '+ body.currently.precipProbability +'% chances of rain.')
        }
    })
}
module.exports = forecast