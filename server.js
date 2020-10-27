const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req, res) => {
        return req.method.localeCompare('POST') != 0
    }
}))

let persons = [
    {    
        id: 1,    
        name: "Arto Hellas",    
        number: "040-123456"
    },  
    {    
        id: 2,    
        name: "Ada Lovelace",    
        number: "39-44-5323523"
    },  
    {    
        id: 3,    
        name: "Dan Abramov",    
        number: "12-43-234345"
    },
    {
        id: 4,    
        name: "Mary Poppendieck",    
        number: "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person === undefined ? res.status(404).end() : res.json(person)
})

app.get('/info', (req, res) => {
    const dateDisplay = new Date()
    res.send("<h3>Phonebook has info for " + persons.length + " people</h3>" + 
             "<h3>" + dateDisplay + "</h3>")
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const generateId = () => {
        return Math.floor(Math.random() * (100000 - 1) + 1)
    }
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name and/or number missing'
        })
    }
    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(persons)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})