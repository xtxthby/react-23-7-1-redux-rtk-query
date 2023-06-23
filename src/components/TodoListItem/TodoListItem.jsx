import { useDeleteTodoMutation } from 'redux/todos/todoSlice';
import { Spinner } from 'components/Spinner/Spinner';
// тут розмітка однієї тудушки куди приходить  id, content
export const TodoListItem = ({ id, content }) => {
  // deleteTodo це функція трігер 
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  return (
    <li>
      {content}{' '}
      {/* додаємо кнопку видалення при кліку видаляємо по ID також
      disabled={isDeleting}   покаже чи щось видаляється це робиться для того 
      щоб при видаленні на всіх кнопках одномоментно не було видно мерцання*/}
      <button onClick={() => deleteTodo(id)} disabled={isDeleting}>
        {isDeleting && <Spinner size={12} />}
        Delete
      </button>
    </li>
  );
};
