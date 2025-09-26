import '@testing-library/jest-dom';
import './test-setup-common';

const originalItTodo = it.todo.bind(it);
/* Strip extra arguments to align with vitest and avoid the following error:
 * "todo must be called with only a description." */
it.todo = (name: string) => originalItTodo(name);
