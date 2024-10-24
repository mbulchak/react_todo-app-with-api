import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  loadingTodoId: number[];

  handleDeleteTodo: (id: number) => void;
  handleUpdateTodo: (todoToUpdate: Todo) => void;

  editedTodo: Todo | null;
  setEditedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  loadingTodoId,
  handleDeleteTodo,
  handleUpdateTodo,
  editedTodo,
  setEditedTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            loadingTodoId={loadingTodoId}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            editedTodo={editedTodo}
            setEditedTodo={setEditedTodo}
          />
        );
      })}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          loadingTodoId={loadingTodoId}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
          editedTodo={editedTodo}
          setEditedTodo={setEditedTodo}
        />
      )}
    </section>
  );
};
