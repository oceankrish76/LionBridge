// type declarations file so no need to esport
type Todo = {
    text: string;
    completed: boolean;
}

type ToggleTodo = (selectedTodo: Todo) => void;
type AddTodo = (newTodo: string) => void;
