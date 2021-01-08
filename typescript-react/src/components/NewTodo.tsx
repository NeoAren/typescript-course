import React, { useRef } from 'react';
import './NewTodo.css';

interface NewTodoProps {
   addTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = props => {

   const input = useRef<HTMLInputElement>(null);

   const submitHandler = (event: React.FormEvent) => {
      event.preventDefault();
      props.addTodo(input.current!.value);
   };

   return (
      <form onSubmit={submitHandler}>
         <div className="form-control">
            <label htmlFor="todo-text">
               <input type="text" id="todo-text" ref={input} />
            </label>
         </div>
         <button type="submit">ADD TODO</button>
      </form>
   );

};

export default NewTodo;
