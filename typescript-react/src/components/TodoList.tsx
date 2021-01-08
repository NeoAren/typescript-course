import React from 'react';
import './TodoList.css';

interface TodoListProps {
   items: { id: string, text: string }[];
   deleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {

   return (
      <ul>
         {props.items.map(item => (
            <li key={item.id}>
               <span>{item.text}</span>
               <button onClick={props.deleteTodo.bind(null, item.id)}>DELETE</button>
            </li>
         ))}
      </ul>
   );

};

export default TodoList;
