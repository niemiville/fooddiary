require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const foodSchema = new mongoose.Schema({
    name: String,
    kcal: Number
})
//returnedObject.id = returnedObject._id.toString()
foodSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
/* const Food = mongoose.model('Food', foodSchema)
const food = new Food({
    id: 1,
    name: "Banana",
    kcal: 100
  })
  
  food.save().then(response => {
    console.log('food saved')
    mongoose.connection.close()
  })  */

module.exports = mongoose.model('Food', foodSchema)

//
/* const userSchema = new mongoose.Schema({
  username: { 
      type: String, 
      required: true, 
      minlength: 1, 
      maxlength: 50, 
      trim: true
  },
  password: { 
      type: String, 
      required: true, 
      minlength: 10,
      maxlength: 500,
      set: setPassword
  }
});

/**
* Checks if password is long enough and generates hash
* 
* @param {string} password user's password
* @returns {string} too short password or hashed password
*/
/* function setPassword(password){
  if(password.length < 10) { 
      return password; 
  }else{
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      return hash;
  };
}
/**
* Compare supplied password with user's own (hashed) password
*
* @param {string} password user's password
* @returns {Promise<boolean>} promise that resolves to the comparison result
*/
/* userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Omit the version key when serialized to JSON
userSchema.set('toJSON', { virtuals: false, versionKey: false });

const User = new mongoose.model('User', userSchema);
module.exports = User;  */ 