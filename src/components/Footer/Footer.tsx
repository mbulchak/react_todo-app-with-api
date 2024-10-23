import { Filter } from '../../types/Filters';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  countActiveTodos: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  todos: Todo[];
  handleDeleteTodo: (id: number) => void;
};

export const Footer: React.FC<Props> = ({
  countActiveTodos,
  filter,
  setFilter,
  todos,
  handleDeleteTodo,
}) => {
  const filterOptionName = Object.values(Filter);

  const completedTodos = todos.filter(todo => todo.completed);

  const deleteAllCompletedTodos = () => {
    completedTodos.map(todo => handleDeleteTodo(todo.id));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptionName.map(filterValue => {
          const filterActiveUrl =
            filterValue === Filter.All
              ? '#/'
              : `#/${filterValue.toLowerCase()}`;

          return (
            <a
              key={filterValue}
              href={filterActiveUrl}
              className={cn('filter__link', {
                selected: filter === filterValue,
              })}
              data-cy={`FilterLink${filterValue}`}
              onClick={() => setFilter(filterValue)}
            >
              {filterValue}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={deleteAllCompletedTodos}
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
