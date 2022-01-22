import { getUser } from './controllers/userController'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

export const signIn =  async (username, password) => {
    const userObject = await getUser(username)
    console.log(userObject)
    if(userObject.password !== null){
        const truth = await bcrypt.compare(password, userObject.password)
        console.log(truth)
        const id = userObject.id
        const token = jwt.signIn({id}, "jwtSecret", {
            expiresIn: 300,
        })
    }
}

export default { signIn }
