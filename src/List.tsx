import React from 'react';
import './List.css';
// import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
interface ListProps {
    todo: Todo;
    toggleTodo: ToggleTodo;
}

// pass list as generic
// props will have propertie todo
// destructure in function parameters then we can directly use
export const List: React.FC<ListProps> = ({ todo, toggleTodo }) => {
    return (
        <li>
            <label className={todo.completed ? "complete" : undefined}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
                {todo.text}
            </label>
        </li>
    )
}