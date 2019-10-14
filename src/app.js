const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weather = require ('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config   
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join (__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')

//Setup handlebars engine and view location
app.set('views',viewsPath)
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'yassine'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'yassine'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'yassine'
    })
})

app.get('/weather', (req, res) =>{
    const adress = req.query.adress 
    
    if (!req.query.adress){
        return res.send({
            error: 'Please provide an adress!'
        })
    }else{
        weather.geocode (adress,(error,{latitude, longitude, location} = {})=>{
        if (error){
            return res.send({
                error: 'Please provide a valid adress!'
            })
        }
        weather.forecast(latitude,longitude, (error, forecastdata) => {
            if (error){
                return res.send({
                    error: 'Please provide an adress!'
                })
            }
            res.send([{
            adress:req.query.adress,
            forecastdata
                }
            ])
        })
     })
    }
 
    
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'Help article not found',
        name: 'yassine'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404 NOT FOUND',
        name: 'yassine'
    })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})