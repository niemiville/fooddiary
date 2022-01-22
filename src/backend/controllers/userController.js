import axios from 'axios'

export const addUser = async (userData) => {
    const res = await axios.post('http://localhost:3001/api/user', userData)
    console.log(res.data)
}
export const getUser = async (username) => {
    const res = await axios.get(`http://localhost:3001/api/user/${username}`)
    console.log(res.data)
    return res.data
}

export default { addUser, getUser }
