import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { MenuBar, FoodList, AddFoodForm, RegisterUser, SignInUser } from './components';
import { initializeFoods } from './reducers/foodReducer';
import { useDispatch } from 'react-redux';
import foodss from './foodData';
import foodData from './backend/initFoods';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
//const Food = require('./backend/controllers/foodController')

function App() {
  const [foodList, setFoodList] = useState(foodss)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeFoods())
  }, [dispatch])

  const addFood = (f) => {
    setFoodList(foodList.concat(f))
  }

  return (
    <>
      <Container>
      <Router>
        <MenuBar />
          <Switch>
            <Route path="/foods">
              <AddFoodForm addFood={addFood} foodData={foodData}/>
              <FoodList foods={foodList} />
            </Route>
            <Route path="/signup">
              <RegisterUser />
            </Route>
            <Route path="/signin">
              <SignInUser />
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;

