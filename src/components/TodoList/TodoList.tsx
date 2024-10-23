import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<Errors>>;
  loadingTodoId: number[];
  setDeleteTodoId: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodo: (todoToUpdate: Todo) => void;
  // isEditing: boolean;
  // setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  isLoading,
  setIsLoading,
  setTodos,
  setErrorMessage,
  loadingTodoId: deleteTodoId,
  setDeleteTodoId,
  handleDeleteTodo,
  handleUpdateTodo,
  // isEditing,
  // setIsEditing,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setTodos={setTodos}
            setErrorMessage={setErrorMessage}
            deleteTodoId={deleteTodoId}
            setDeleteTodoId={setDeleteTodoId}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            // isEditing={isEditing}
            // setIsEditing={setIsEditing}
          />
        );
      })}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          deleteTodoId={deleteTodoId}
          setDeleteTodoId={setDeleteTodoId}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          // isEditing={isEditing}
          // setIsEditing={setIsEditing}
        />
      )}
    </section>
  );
};
