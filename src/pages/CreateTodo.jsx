// Redirect  спрощує написання createTodo , не преба try i await
import { Redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCreateTodoMutation } from 'redux/todos/todoSlice';
import { Spinner } from 'components/Spinner/Spinner';

export const CreateTodoPage = () => {
  // /const history = useHistory();
  // тут трігер мутації
  const [createTodo, { isLoading, isSuccess }] = useCreateTodoMutation();
  // для сабміту робимо handleSubmit
  const handleSubmit = async e => {
    e.preventDefault();
    //  тут створюються тудушки
    createTodo(e.currentTarget.elements.content.value);
    // щоб взнати чи він повертає проміс запишемо так
    // createTodo(e.currentTarget.elements.content.value).then(x =>
    //   console.log(x));
    console.log(e.currentTarget.elements.content.value);
    // якщо код асінхронний (async) то e.currentTarget треба збросити 
    // після  createTodo
    e.currentTarget.reset();
    // try {
    //   await createTodo(content);
    //   history.push('/todos');
    // } catch (error) {
    //   console.log('error');
    // }
    // тост який виїзжає
    toast.success('Заметка создана!');
  };

  //  він тру коли повернувся запрос
  console.log(isSuccess);

  return (
    <>
      {/* isSuccess якщо тру то зразу Redirect пушить це замість
      history.push('/todos') */}
      {isSuccess && <Redirect to="/todos" />}
      {/* форма для побудови тудушки */}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" name="content" />
        {/* коли ми загружаємо то кнопку блокуємо */}
        <button type="submit" disabled={isLoading}>
          {/* якщо іде загрузка показуємо спінер */}
          {isLoading && <Spinner size={12} />}
          Create
        </button>
      </form>
    </>
  );
};
