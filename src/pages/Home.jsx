import { useState } from 'react';
// беремо з папки редакс покемона
import { useGetPokemonByNameQuery } from 'redux/pokemon';
import { Spinner } from 'components/Spinner/Spinner';

export const HomePage = () => {
  // так як ми неможемо запустити  useGetPokemonByNameQuery при сабмиті форми
  // тому що це хук і воно не запускається в середені якоїсь рандомної функції
  // тому ми тут зберігаємо в стейті покемона з початковим поржнім рядком
  const [pokemonName, setPokemonName] = useState('');
  // ставимо сюди покемона із useState
  const { data, error, isFetching, isError } = useGetPokemonByNameQuery(
    pokemonName,
    {
      // другий аргумент - це поки рядок порожній не запускай запрос на бекенд  
      skip: pokemonName === '',
      // дозволяє через якийсь інтервал чау забирати дані тобіш 
      // оновлювати сторінку за потреби
      // pollingInterval: 3000,
      // refetchOnFocus - дозволяє примусово повторно отримати запит,
      // коли вікно браузера повертається у фокус.За замовчуванням false
      // refetchOnFocus: false,
    }
  );
  console.log(data);
  console.log(error);
  console.log(isFetching);
  console.log(isError);
  const handleSubmit = e => {
    e.preventDefault();
    // тут записуємо з форми(elements) в useState
    setPokemonName(e.currentTarget.elements.pokemonName.value);
    e.currentTarget.reset();
  };
  // якщо в мене помилка і помилка орігіналстатус дорівнює 404 
  // можна поставити текст який приходить з бекенду  data: 'Not Found'
  const showNotFoundError = isError && error.originalStatus === 404;
  // показувати назву коли є дані і не іде загрузка і не помилка
  const showPokemonData = data && !isFetching && !isError;

  return (
    <>
      {/* форма для покемона запиту */}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" name="pokemonName" />
        <button type="submit">Search</button>
      </form>
       {/* якщо іде загрузка то показуємо спінер */}
      {isFetching && <Spinner />}
      {/* якщо помилка то ..... */}
      {showNotFoundError && (
        <p>
          Упс, покемона с имененем <b>{pokemonName}</b> нет
        </p>
      )}

      {showPokemonData && <h1>{data.name}</h1>}
    </>
  );
};
