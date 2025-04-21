import 'dotenv/config'
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 8000;

const app = express()

app.use(cors())

const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL || 'https://api.spoonacular.com/recipes/'

app.get('/', (req, res) => {
    res.json("Hello World");
})

//Random Recipes
app.get('/random-recipes', async (req, res) => {
    try{
        const response = await fetch(`${BASE_URL}random?apiKey=${API_KEY}&number=10`);
        const data = await response.json()
        res.json(data.recipes);
    } catch(err){
        res.json(`Error ${err}: Failed to get recipes`)
    }
})


//Seached Recipes
app.get('/search-recipes', async (req, res) => {

    const { query } = req.query;
    try{
        const response = await fetch(`${BASE_URL}complexSearch?apiKey=${API_KEY}&query=${query}`);
        const data = await response.json()
        res.json(data.results);
    } catch(err){
        res.json(`Error ${err}: Failed to get recipes`)
    }
})

//Get Recipe Info
app.get('/recipe-info', async (req, res) => {

    const { query } = req.query;

    if (!query) return res.status(400).json({ error: 'Missing "query" parameter' });
    
    try{
        const response = await fetch(`${BASE_URL}${query}/information?apiKey=${API_KEY}`);
        const data = await response.json()
        res.json(data);
    } catch(err){
        res.json(`Error ${err}: Failed to get recipes`)
    }
})



app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));