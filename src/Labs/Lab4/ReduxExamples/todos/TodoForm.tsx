import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { useSelector, useDispatch } from "react-redux";
export default function TodoForm() {
  const todo = useSelector((state: any) => state.todosReducer.todo);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item">
      <input
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <button 
        className = "btn btn-primary btn-success float-end"
        onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
        Add
      </button>
      <button
        className = "btn btn-primary ms-1 me-2 btn-warning float-end"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        Update
      </button>
    </li>
  );
}
