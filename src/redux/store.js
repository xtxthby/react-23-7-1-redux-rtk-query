import { configureStore } from '@reduxjs/toolkit';
// setupListeners дозволяє робити перезапрос на бекенд
//  якщо наприклад ви не в фокусі сторінки тобіш перешли 
// на другу а потім повернулись то setupListeners(store.dispatch)
// робить перезапрос - оновленн як приклад
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './users/usersSlice';
// беремо нашого покемона
import { pokemonApi } from './pokemon';
// імпорт з створенного бекенда на mocaApi
import { todoApi } from './todos/todoSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // беремо покемона і reducerPath
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    // беремо контакт з reducerPath
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    // спочатку розпилюємо старе а потім ставимо нове
    ...getDefaultMiddleware(),
    // це нова прослойка кастомна
    pokemonApi.middleware,
    // з кожного АРІ додаємо .middleware
    todoApi.middleware,
  ],
});

setupListeners(store.dispatch);
