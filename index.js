require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => {
        return req.method.localeCompare('POST') !== 0
    }
}))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name and/or number missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const newNumber = req.body.number
    if (!newNumber) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    Person.findOneAndUpdate(
        { name: req.body.name },
        { number: newNumber },
        { returnOriginal: false }).then(updated => {
        res.json(updated)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end()
    }).catch(error => next(error))
})

app.get('/info', async (req, res) => {
    const dateDisplay = new Date()
    res.send('<h3>Phonebook has info for ' + await Person.countDocuments({}) + ' people</h3>' +
             '<h3>' + dateDisplay + '</h3>')
})

const unknownEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})