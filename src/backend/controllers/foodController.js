import axios from 'axios'

export const state = {
    foods: []
}


export const addFood = async (dict) => {
    const res = await axios.post('http://localhost:3001/api/foods', dict)
    console.log(res.data)
}

export const getFoods = async () => {
    const res = await axios.get('http://localhost:3001/api/foods')
    console.log(res.data)
    return res.data
}

export const deleteFood = async (id) => {
    const res = await axios.delete(`http://localhost:3001/api/foods/${id}`)
    console.log(res.data)
    return res.data
}

export default { addFood, getFoods, deleteFood }