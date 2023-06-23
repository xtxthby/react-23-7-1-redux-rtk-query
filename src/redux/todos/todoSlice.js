import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    // базовий  baseUrl для запроса
    baseUrl: 'https://611560228f38520017a38499.mockapi.io/api/v1/',
  }),
  // Це ключі в кеше за допомогою яких після
  // наприклад видалення очищаеться кеш
  // і на єкрані іде очистка (інвалідація)
  // тут ми повісили тудушку
  tagTypes: ['Todo'],
  endpoints: builder => ({
    // тут усі тудушки які є
    fetchTodos: builder.query({
      query: () => '/todos',
      // коли ми забрали тудушки то говоримо 
      // що вони вісять під одним ключем
      providesTags: ['Todo'],
    }),
    // видалення по айдішці
    deleteTodo: builder.mutation({
      query: todoId => ({
        url: `/todos/${todoId}`,
        method: 'DELETE',
      }),
      // опреділяє які дані в кеше видалити 
      // а які залишити тобіш інвалідуємо
      invalidatesTags: ['Todo'],
    }),
    // тут мутація на створення (create) тудушки
    createTodo: builder.mutation({
      query: todoContent => ({
        url: '/todos',
        // метод запроса
        method: 'POST',
        // при створенні в боді буде розміщено
        // тудушкі с сонтентом який прийшов з бекенду
        body: {
          content: todoContent,
        },
      }),
      // тут інвалідація з свіжими тудушками
      invalidatesTags: ['Todo'],
    }),
  }),
});
// тут передаємо хуки на запрос, видалення, створення
export const {
  useFetchTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
} = todoApi;
