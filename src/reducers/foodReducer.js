import foodController from '../backend/controllers/foodController'

const foodReducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_FOOD':
        return [...state, action.data]
      case 'INIT_FOODS':
        return action.data
      case 'DELETE_FOOD':
        return state.filter(food => food.id !== action.data)
      default:
        return state
    }
  }
  
/*   export const createNote = content => {
    return async dispatch => {
      const newNote = await noteService.createNew(content)
      dispatch({
        type: 'NEW_NOTE',
        data: newNote,
      })
    }
  } */

  
  export const initializeFoods = () => {
    return async dispatch => {
      const foods = await foodController.getFoods()
      dispatch({
        type: 'INIT_FOODS',
        data: foods,
      })
    }
  }
  
  export default foodReducer
  