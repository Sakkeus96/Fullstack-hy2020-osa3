require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny', {
    skip: (req, res) => {return req.method === "POST"}
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person', {
    skip: (req, res) => {return req.method !== "POST"}
}))

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const date = new Date()
        res.send(`<p> Phonebook has info for ${count} people</p>` +
        `<p> ${date} </p>`)    
    })
  })
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.post('/api/persons', (req, res, next) => 
{
    const body = req.body
    const id = Math.floor((Math.random() * 10000) + 1)
    if (!body.name || !body.number)
    {
        return res.status(404).json({error: 'name or number missing'})
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        id: id,
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => 
{
    Person.findById(req.params.id)
        .then(person => {
            if (person)
            {
                res.json(person.toJSON())
            }
            else
            {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => 
{
    const body = req.body
    const person = {
        name: body.name,
        number: body.number,
        id: body.id,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) =>
{
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === "CastError" && error.kind === "ObjectId")
    {
        return res.status(400).send({ error: "Malformatted id"})
    }
    else if (error.name === "ValidationError")
    {
        return res.status(400).json({ error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)