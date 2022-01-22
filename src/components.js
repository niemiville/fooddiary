import React, { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Icon, Table, Form, Button, Modal} from 'semantic-ui-react'
/* import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom" */
const Food = require('./backend/controllers/foodController')
const User = require('./backend/controllers/userController')
const Auth = require('./backend/auth')

export class MenuBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      
      <Menu>
        <Menu.Item
          header
          as='h2'
        >
          <Icon name='food' />
          Food Diary
        </Menu.Item>

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          href='/'
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='diary'
          active={activeItem === 'diary'}
          onClick={this.handleItemClick}
        >
          Diary
        </Menu.Item>

        <Menu.Item
          name='foods'
          active={activeItem === 'foods'}
          onClick={this.handleItemClick}
          href='/foods'
        >
          Foods
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary href='/signin'>Sign in</Button>
          </Menu.Item>
          <Menu.Item>
            <Button secondary href='/signup'>Sign up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      
    )
  }
}


export const FoodList = (props) => {
    const dispatch = useDispatch()
    const foods = useSelector(({ foods }) => {
      return foods
    })
    const deleteFood = (id) => {
      console.log(id)
      dispatch({type: 'DELETE_FOOD', data: id})
      Food.deleteFood(id)
    }
    return (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Kilocalories</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
          {foods.map(f => 
          <Table.Row key={f.id}>
            <Table.Cell>{f.name}</Table.Cell>
            <Table.Cell>{f.kcal}</Table.Cell>
            <Table.Cell>{f.id}</Table.Cell>
            <Table.Cell><Button basic color='red' onClick={() => deleteFood(f.id)}>Delete</Button></Table.Cell>
          </Table.Row>
          )}
        </Table.Body>
    </Table>
    );
}

export const AddFoodForm = (props) => {
  const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
  
    const handleSubmitButton = (e) => {
      setOpen(false)
      handleSubmit(e)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const dict = {
          name: e.target.name.value,
          kcal: parseInt(e.target.kcal.value),
          //id: (Math.floor(Math.random() * 10000) + 5)
      }
      //Ei lisää apissa lisättyjä ruokia suoraan reduuceriin
      dispatch({type: 'NEW_FOOD', data: {name: dict.name, kcal: dict.kcal}})
      props.addFood(dict)
      Food.addFood(dict)
      e.target.name.value = ''
      e.target.kcal.value = ''
    }

 /*    const initFoods = () => {
      for (let f in props.foodData){
        console.log(f)
        dispatch({type: 'NEW_FOOD', data: {name: f.name, kcal: f.kcal}})
        Food.addFood(f)
      }
      <Button basic color='yellow' floated='right' onClick={() => initFoods}>Initialize Foods</Button>
    } */
  
    return (
      <Modal 
        as={Form}
        onSubmit={e => handleSubmitButton(e)}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button basic color='green' floated='right'>Add food</Button>}
      >
        <Modal.Header>New food</Modal.Header>
        <Modal.Content>
          
            <Form.Input name='name' label="Name" placeholder='Name of the food' />
            <Form.Input name='kcal' label="Kilocalories" placeholder='Kilocalories per 100 grams' />
          
        </Modal.Content>
        <Modal.Actions> 
          <Button 
            basic 
            content='Cancel'
            color='grey' 
            icon='close' 
            position='left' 
            onClick={() => setOpen(false)}
          />
          <Button
            basic
            color='green'
            type='submit'
            content="Add"
            labelPosition='left'
            icon='checkmark'
            positive
          />
        </Modal.Actions>
      </Modal>
    )
}

export const RegisterUser = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const dict = {
        username: e.target.username.value,
        password: e.target.password.value,
    }
    console.log(dict)
    //props.addFood(dict)
    //Food.addFood(dict)
    User.addUser(dict)
    e.target.username.value = ''
    e.target.password.value = ''
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Field>
        <Form.Input label='Username' name='username' placeholder='Username' minLength='2' />
      </Form.Field>
      <Form.Field>
        <Form.Input label='Password' name='password' placeholder='Password' minLength='10' />
      </Form.Field>
      <Button type='submit' on>Register</Button>
    </Form>
  )
}

export const SignInUser = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
/*     const creds = {
        username: e.target.username.value,
        password: e.target.password.value,
    }
    console.log(creds) */
    Auth.signIn(e.target.username.value, e.target.password.value)
    e.target.username.value = ''
    e.target.password.value = ''
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Field>
        <Form.Input label='Username' name='username' placeholder='Username' minLength='2' />
      </Form.Field>
      <Form.Field>
        <Form.Input label='Password' name='password' placeholder='Password' minLength='10' />
      </Form.Field>
      <Button type='submit' on>Log In</Button>
    </Form>
  )
}
