import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import { getFilteredTodosByStatus } from './utils/getFilteredTodosByStatus';

import { deleteTodo, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Filter } from './types/Filters';
import { todosService } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);

  const [errorMessage, setErrorMessage] = useState(Errors.DEFAULT);
  const [isLoading, setIsLoading] = useState(false);

  // const [isEditing, setIsEditing] = useState(false);

  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const [loadingTodoId, setLoadingTodoId] = useState<number[]>([]);

  const filteredTodos = getFilteredTodosByStatus(todos, filter);

  const countActiveTodos = todos.reduce((accum, todo) => {
    return !todo.completed ? accum + 1 : accum;
  }, 0);

  const handleDeleteTodo = (id: number) => {
    setIsLoading(true);
    setLoadingTodoId(currentIds => [...currentIds, id]);

    deleteTodo(id)
      .then(() => {
        setLoadingTodoId(currentIds =>
          currentIds.filter(currId => currId !== id),
        );

        setTodos(currentTodos =>
          currentTodos.filter(currentTodo => currentTodo.id !== id),
        );
        // setIsLoading(false);
      })
      .catch(error => {
        // setIsLoading(false);
        setErrorMessage(Errors.DELETE_TODO);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingTodoId(currentIds =>
          currentIds.filter(currId => currId !== id),
        );
      });
  };

  // create new func for all todos using promise all
  // change setTodos

  const handleUpdateTodo = (todoToUpdate: Todo) => {
    setIsLoading(true);
    setLoadingTodoId(currentIds => [...currentIds, todoToUpdate.id]);

    todosService
      .updateTodo(todoToUpdate)
      .then(updatedTodo => {
        setLoadingTodoId(currentIds =>
          currentIds.filter(currId => currId !== todoToUpdate.id),
        );

        setTodos(currentTodos => {
          return currentTodos.map(defTodo =>
            defTodo.id === updatedTodo.id ? updatedTodo : defTodo,
          );
        });
      })
      .catch(error => {
        setErrorMessage(Errors.UPDATE_TODO);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);

        // setLoadingTodoId(currentIds =>
        //   currentIds.filter(currId => currId !== todoToUpdate.id),
        // );
      });
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.LOADING);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          tempTodo={tempTodo}
          setTempTodo={setTempTodo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          todos={todos}
          setTodos={setTodos}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          handleUpdateTodo={handleUpdateTodo}
          // loadingTodoId={loadingTodoId}
          // handleToggleAll={handleToggleAll}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              tempTodo={tempTodo}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setTodos={setTodos}
              setErrorMessage={setErrorMessage}
              loadingTodoId={loadingTodoId}
              setDeleteTodoId={setLoadingTodoId}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
              // isEditing={isEditing}
              // setIsEditing={setIsEditing}
            />

            <Footer
              countActiveTodos={countActiveTodos}
              filter={filter}
              setFilter={setFilter}
              todos={todos}
              handleDeleteTodo={handleDeleteTodo}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
