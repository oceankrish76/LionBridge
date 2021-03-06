import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import ButtonAppBar from './components/ButtonAppBar';
import FormikForm from './FormikForm';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import './App.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { type } from 'os';

let listitems = [] as any;

const initialValues = {
  fname: 'Krishna',
  lname: '',

}
const onSubmit = values => {
  //console.log('Form data', values)
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
  // const [listItems, setlistItems] = useState([{ id: 0, name: '', location: 'Oulu', rent: 25, contactEmail: 'test@test.com' }]);
  //console.log(props);
  const [listItems, setlistItems] = useState();

  const PATH = 'http://localhost:5000/all-lists';
  async function fetchData() {
    const res = await fetch(PATH);
    console.log("this is res data", res)

    res
      .json()
      .then(res => setlistItems(res.result))
      .catch(err => alert(err));
  }
  useEffect(() => {
    fetchData();
  }, []);

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

  const begin = (rowname) => {
    //console.log('onclick pass data props to FormikForm');
    console.log(rowname);
    return rowname;
  }
  console.log("this is fetch data", listitems)

  return (
    <React.Fragment>
      <ButtonAppBar />
      <Container className="container-fluid container-margin">
        <Row className="row">
          <Col className="col-sm-6" style={{ backgroundColor: 'rgb(212, 212, 212)', minHeight: '719px' }}>
            <h1>List of items</h1><hr />
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#c5c5c5', color: 'white', }}>
                  <TableCell>List Items</TableCell>
                  <TableCell >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems && listItems.map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button color="primary" onClick={() => begin(row.name)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="container">
            </div>
          </Col>
          <Col className="col-sm-6" style={{ backgroundColor: 'rgb(224, 224, 224)', minHeight: '400px' }}>
            <div>
              <h1>Edit Selected</h1><hr />
              {listItems && listItems.map((row, index) => {
                return (
                  <FormikForm value={row} />
                )
              })
              }
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
};

export default App;
