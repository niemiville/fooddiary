require('dotenv').config()
const { getNodeText } = require('@testing-library/react')
const express = require('express')
const app = express()
const cors = require('cors')
const Food = require('./models/food')
const User = require('./models/user')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.post('/api/foods', (request, response) => {
    const body = request.body
    console.log(body)
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const food = new Food({
      id: body.id,
      name: body.name,
      kcal: body.kcal
    })
  
    food.save().then(savedFood => {
      response.json(savedFood)
    })
  })

app.get('/api/foods', (request, response, next) => {
  Food.find().then(food => {
      if(food){
          console.log(food)
          response.json(food)
      }else{
          response.status(404).end()
      }
    
  })
  .catch(error => next(error))
})

app.get('/api/foods/:id', (request, response, next) => {
    Food.findById(request.params.id).then(food => {
        if(food){
            response.json(food)
        }else{
            response.status(404).end()
        }
      
    })
    .catch(error => next(error))
  })

app.delete('/api/foods/:id', (request, response, next) => {
  Food.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



app.post('/api/user', async (request, response) => {
  const body = request.body
  console.log(body)
  if (body.password === undefined || body.username === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const exists = await User.findOne({ username: body.username});
  if(exists){
    console.log("Username already exists")
    return response.status(400).json({ error: 'Username already existing' })
  } else {
  const user = new User({
    username: body.username,
    password: body.password
  })

  user.save().then(savedUser => {
    response.json(savedUser)
  })
}
})

app.get('/api/user/:username', (request, response, next) => {
  User.findOne({ username: request.params.username }).then(user => {
      if(user){
          response.json(user)
      }else{
          response.status(404).end()
      }
  })
  .catch(error => next(error))
})

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // olemattomien osoitteiden käsittely
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
  // tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})