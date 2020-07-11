import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import FormikForm from './FormikForm';
import axios from 'axios';


import './App.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { type } from 'os';

let listitems = [];

const initialValues = {
  fname: 'Krishna',
  lname: '',

}
const onSubmit = values => {
  console.log('Form data', values)
}

// Array taking Todo generic
const initialTodos: Array<Todo> = [
  {
    text: "Do the Laundry",
    completed: true
  },
  {
    text: "Drive our guest to City center",
    completed: false
  }
];

const App: React.FC = (props) => {
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    const getResult = async () => {
      await axios('http://localhost:5000/all-lists');
    };
    getResult();
    //setData(result.data);
  }, []);

  const getPage = async (props) =>  {
    const response = await axios('http://localhost:5000/all-lists');
    const json = await response.data.result

    //JSON.stringify(json);
    console.log('type is : ' + typeof (json));
    //return json.name;
  }


  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
  })
  const [todos, setTodos] = useState(initialTodos);
  const toggleTodo: ToggleTodo = (selectedTodo) => {
    const newTodo = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo;
    });
    setTodos(newTodo);
  };

  const addTodo: AddTodo = (newTodo) => {
    newTodo.trim() !== "" &&
      setTodos([...todos, { text: newTodo, completed: false }]);
  };

  return (
    <React.Fragment>
      <Container className="container-fluid container-margin">
        <Row className="row">
          <Col className="col-sm-6" style={{ backgroundColor: 'rgb(212, 212, 212)', minHeight: '400px' }}>
            <h1>List of items</h1><hr />
            
            {getPage}
            {/* <button type="button" onClick={getList}>Display list</button> */}


            {/* <TodoList todos={todos} toggleTodo={toggleTodo} /> */}
            {/* <AddTodoForm addTodo={addTodo} /> */}
            <div className="container">
            </div>
          </Col>
          <Col className="col-sm-6" style={{ backgroundColor: 'rgb(224, 224, 224)', minHeight: '400px' }}>
            <div>
              <h1>Edit Selected</h1><hr />
              <FormikForm />
            </div>
          </Col>
        </Row>
      </Container>

    </React.Fragment>

  )
};

export default App;
