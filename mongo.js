const mongoose = require('mongoose')

const password = process.argv[2]
const url =
  `mongodb+srv://sakkeus:${password}@cluster0.w1omf.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
  })
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3)
{
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5)
{
    const name = process.argv[3]
    const number = process.argv[4]
    const id = Math.floor((Math.random() * 10000) + 1)
    const person = new Person({
        name: name,
        number: number,
        id: id,
    })
    person.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}




