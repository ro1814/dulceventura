import express from 'express'
import dotenv from 'dotenv'
import recipes from './data/recipes.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/recipes', (req, res) => {
    res.json(recipes)
})

app.get('/api/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r._id === req.params.id)
    res.json(recipe)
})

const PORT= process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))