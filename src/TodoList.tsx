import React from 'react';
import { List } from './List';

interface TodoListProps {
    todos: Array<Todo>;
    toggleTodo: ToggleTodo;
}
export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
    return (
        <ul>
            {todos.map(todo => {
                return <List key={todo.text} todo={todo} toggleTodo={toggleTodo} />;
            })}
        </ul>
    );
};