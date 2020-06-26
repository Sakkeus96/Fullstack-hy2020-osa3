const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.use(cors())
app.use(express.json())
app.use(morgan('tiny', {
    skip: (req, res) => {return req.method === "POST"}
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person', {
    skip: (req, res) => {return req.method !== "POST"}
}))

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p> Phonebook has info for ${persons.length} people</p>` +
    `<p> ${date} </p>`)
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req,res) => 
{
    const body = req.body
    const id = Math.floor((Math.random() * 10000) + 1)
    if (!body.name || !body.number)
    {
        return res.status(404).json({error: 'name or number missing'})
    }
    if (persons.find(person => person.name === body.name))
    {
        return res.status(404).json({error: 'name must be unique'})
    }
    const person = {
        name: body.name,
        number: body.number,
        id: id,
    }
    persons = persons.concat(person)
    res.json(person)
})


app.get('/api/persons/:id', (req, res) => 
{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) =>
{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)