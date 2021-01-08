import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

const App: React.FC = () => {

   const [todos, setTodos] = useState<Todo[]>([]);

   const addTodo = (text: string) => {
      console.log(text);
      setTodos(prevState => [ ...prevState, { id: Math.random().toString(), text } ]);
   };

   const deleteTodo = (todoId: string) => {
      setTodos(prevState => prevState.filter(p => p.id !== todoId));
   };

   return (
      <div className="App">
         <NewTodo addTodo={addTodo} />
         <TodoList items={todos} deleteTodo={deleteTodo} />
      </div>
   );

};

export default App;
