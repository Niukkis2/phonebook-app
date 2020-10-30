const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit()
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://user0:${password}@cluster0.kjzsv.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    number: { type: String, required: true }
})
personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

if (!name && !number) {
    Person.find({}).then(people => {
        console.log('phonebook:')
        people.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).then(process.exit())
}

const person = new Person({
    name: name,
    number: number
})

person.save().then(res => {
    console.log('person saved')
    mongoose.connection.close()
})