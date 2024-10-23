/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

// import { useState } from 'react';
// import { todosService } from '../../api';
import { useEffect, useRef, useState } from 'react';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<Errors>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTodoId: number[];
  setDeleteTodoId: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodo: (todoToUpdate: Todo) => void;
  // isEditing: boolean;
  // setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  // setTodos,
  isLoading,
  // setIsLoading,
  deleteTodoId,
  // setErrorMessage,
  handleDeleteTodo,
  handleUpdateTodo,
  // isEditing,
  // setIsEditing,
}) => {
  // const [checked, setChecked] = useState(false);

  // const handleChangeChecked

  // const handleUpdateTodo = (todoToUpdate: Todo) => {
  //   setIsLoading(true);

  //   todosService
  //     .updateTodo(todoToUpdate)
  //     .then(updatedTodo => {
  //       // console.log(updatedTodo);

  //       // setTodos((currentTodos: Todo[]): Todo[] => {
  //       setTodos(currentTodos => {
  //         //   const newTodos = [...currentTodos];
  //         //   const index = newTodos.findIndex(
  //         //     defTodo => defTodo.id === todoToUpdate.id,
  //         //   );

  //         //   return newTodos.splice(index, 1, updatedTodo);

  //         return currentTodos.map(defTodo =>
  //           defTodo.id === updatedTodo.id ? updatedTodo : defTodo,
  //         );
  //       });
  //     })
  //     .catch(() => setErrorMessage(Errors.UPDATE_TODO))
  //     .finally(() => setIsLoading(false));
  // };

  const [newTitle, setNewTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setIsLoading(true);

    const preparedTitle = newTitle.trim();

    if (!preparedTitle) {
      handleDeleteTodo(todo.id);

      return;
    }

    if (preparedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    handleUpdateTodo({ ...todo, title: newTitle });
    //   .then(() => {
    //   setIsLoading(false);
    //   setIsEditing(false);
    // });


    // прокинути errorMessage i робити !setIsEditing(false)
    // setIsLoading(false);

    setIsEditing(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          disabled={!todo.id}
          onChange={
            event =>
              handleUpdateTodo({ ...todo, completed: event.target.checked })
            // .catch(error => {
            //   throw error;
            // })
            // .finally(() => setIsLoading(false))
          }
        />
      </label>

      {/* // state, = for togle all is active' => and because of this */}
      {/* if one of them is not active change todo.completed  */}

      {isEditing ? (
        <form
          onSubmit={handleSaveChanges}
          onBlur={handleSaveChanges} /* onKeyUp={()} */
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            // value="Todo is being edited now"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyUp={event => {
              // console.log(event);

              if (event.key === 'Escape') {
                setIsEditing(false);
                setNewTitle(todo.title);
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => setIsEditing(true)}
            data-cy="TodoTitle"
            className="todo__title"
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      {/* <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        ×
      </button>

      {false && (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      )} */}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active':
            (isLoading && todo.id === 0) ||
            (isLoading && deleteTodoId.includes(todo.id)),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
