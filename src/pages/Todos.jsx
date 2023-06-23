import { Link } from 'react-router-dom';
// імпортуємо хук з todoSlice
import { useFetchTodosQuery } from 'redux/todos/todoSlice';
// сюди забіраємо тудуліст
import { TodoList } from 'components/TodoList/TodoList';
// .спінер
import { Spinner } from 'components/Spinner/Spinner';

export const TodosPage = () => {
  // за замовчанням виймаємо аргументи ще можна і помилку.
  const { data: todos, isFetching } = useFetchTodosQuery();

  return (
    <div>
      {/* лінк веде мене на сторінку тудушки CreateTodo.jsx*/}
      <Link to="/todos/create">Create todo</Link>
      {/* поки грузиться спінер показуемо */}
      {isFetching && <Spinner />}
      {/* рендеримо тільки тоді коли є data */}
      {todos && <TodoList todos={todos} />}
    </div>
  );
};
