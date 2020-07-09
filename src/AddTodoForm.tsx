import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AddTodoFormProps {
    addTodo: AddTodo;
}
// pass AddTodoFormProps as a generic
const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };
    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo(""); // empty field
    };
    return (
        <form>
            <input type="text" value={newTodo} onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}>Add todo</button>
        </form>
    );
};

export default AddTodoForm;
