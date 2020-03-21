const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Defining path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather-App',
        name : 'Siddhant Jain'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About me',
        name : 'Siddhant Jain'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg : 'Dial 100 for help',
        title : 'Help',
        name : 'Siddhant Jain'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address!!'
        })
    }
    geocode(req.query.address,(error,{latitude,longtitude,location}= {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude,longtitude,(error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location : location,
                forecast : forecastData
            })
        })
    })    
})

app.get('/help/*',(req,res) =>{
    res.render('error',{
        msg : 'Help article not found',
        title : 'Weather-app',
        name : 'Siddhant Jain'
    })
})

app.get('*',(req,res) =>{
    res.render('error',{
        msg : 'Page not found',
        title : 'Weather-app',
        name : 'Siddhant Jain'
    })
})

app.listen(port ,() =>{
    console.log('The server is up on port '+ port)
})
