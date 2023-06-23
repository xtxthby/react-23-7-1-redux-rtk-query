import { TodoListItem } from '../TodoListItem/TodoListItem';
// тут приходить todos
export const TodoList = ({ todos }) => {
  return (
    <ul>
      {/* ми його мепаємо */}
      {todos.map(todo => (
        // передамо на кожну лішку айді і розпиляємо усю тудушку
        <TodoListItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
