import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { todosService } from '../../api';
import { USER_ID } from '../../api/todos';
import { Errors } from '../../types/Errors';

type Props = {
  tempTodo: Todo | null;
  setTempTodo: Dispatch<React.SetStateAction<Todo | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: (Error: Errors) => void;
  errorMessage: string;
  handleUpdateTodo: (todoToUpdate: Todo) => void;
  // handleToggleAll: (todos: Todo[]) => Todo[];
};

export const Header: React.FC<Props> = ({
  // tempTodo,
  setTempTodo,
  isLoading,
  setIsLoading,
  setErrorMessage,
  todos,
  setTodos,
  errorMessage,
  handleUpdateTodo,
  // handleToggleAll,
}) => {
  const field = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  function addTodo({ userId, title, completed }: Omit<Todo, 'id'>) {
    const titleTrim = title.trim();

    if (!titleTrim) {
      setIsLoading(false);
      setErrorMessage(Errors.TITLE);

      return;
    }

    const newTodo = {
      userId,
      title: titleTrim,
      completed,
    };

    setTempTodo({
      id: 0,
      ...newTodo,
    });

    return todosService
      .createTodo(newTodo)
      .then(defTodo => {
        setTodos(currentTodos => [...currentTodos, defTodo]);
        setNewTitle('');
      })
      .catch(() => setErrorMessage(Errors.ADD_TODO))
      .finally(() => {
        field.current?.focus();
        setTempTodo(null);
        setIsLoading(false);
      });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    addTodo({
      userId: USER_ID,
      title: newTitle,
      completed: false,
    });
  };

  const allCompletedTodos = todos.every(todo => todo.completed);

  function handleToggleAll(defTodos: Todo[]) {
    if (allCompletedTodos) {
      defTodos.forEach(defTodo =>
        handleUpdateTodo({ ...defTodo, completed: false }),
      );
    } else {
      defTodos.forEach(defTodo =>
        handleUpdateTodo({ ...defTodo, completed: true }),
      );
    }
  }

  useEffect(() => {
    // if (!setLoadingTodoId)
    field.current?.focus();
    // }, [todos.length, tempTodo]);
    // }, [isLoading, errorMessage]);
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allCompletedTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={() => handleToggleAll(todos)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={field}
          value={newTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitle}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
