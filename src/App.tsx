import React, { useState } from 'react';
import { TodoList } from './TodoList';
import AddTodoForm from './AddTodoForm';
import './App.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
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
const App: React.FC = () => {
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
          <Col className="col-sm-6" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <AddTodoForm addTodo={addTodo} />
          </Col>
          <Col className="col-sm-6" style={{ backgroundColor: 'rgb(224, 224, 224)' }}>
            <div>
              <form>
                <label>First name:</label><br />
                <input type="text" id="fname" name="fname" /><br />
                <label>Last name:</label><br />
                <input type="text" id="lname" name="lname" />
              </form>
            </div>
          </Col>
        </Row>
      </Container>

    </React.Fragment>

  )
};

export default App;
