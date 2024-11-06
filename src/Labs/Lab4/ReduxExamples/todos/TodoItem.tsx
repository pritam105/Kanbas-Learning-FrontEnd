import { deleteTodo, setTodo } from "./todosReducer";
import { useDispatch } from "react-redux";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      {todo.title}
      <button className = "btn btn-primary btn-danger float-end" onClick={() => dispatch(deleteTodo(todo.id))}>Delete </button>
      <button className = "btn btn-primary me-2 float-end" onClick={() => dispatch(setTodo(todo))}>Edit </button>
    </li>
  );
}
