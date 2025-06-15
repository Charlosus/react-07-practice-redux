// to start

//https://stackblitz.com/edit/vitejs-vite-mnmsmu?file=README.md

//
// 1) To install redux to project we need to add
//
//npm install redux
//
// to use redux in react its good to add react-redux
// this lib consist a usefull tools and hooks to integrate store
// in react project
//
// npm install react-redux
//
// 2) Creating store
//
// to create store we use this command

// createStore(reducer, preloadedState, enhancer)

// Since Redux 4.2+ (and especially with the advent of
// Redux Toolkit), the developers officially discourage
// manual creation of a store using createStore.

// Instead, they recommend using Redux Toolkit (RTK),
// which is now "the official, recommended way to write
//  Redux logic."

// import { createStore } from 'redux';

const initialState = {
  tasks: [
    { id: 0, text: 'Learn HTML and CSS', completed: true },
    { id: 1, text: 'Get good at JavaScript', completed: true },
    { id: 2, text: 'Master React', completed: false },
    { id: 3, text: 'Discover Redux', completed: false },
    { id: 4, text: 'Build amazing apps', completed: false },
  ],
  filters: {
    status: 'all',
  },
};

const rootReducer = (state = initialState, action) => {
  return state;
};

export const store = createStore(rootReducer);

// after creating store we need to import it in main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { App } from './components/App';
// import { store } from "./redux/store"; //<< importing store here

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
// 	  <Provider store={store}>
// 	    <App />
// 	  </Provider>
//   </React.StrictMode>
// );

// src/redux/store.js

import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const initialState1 = {
  tasks: [
    { id: 0, text: 'Learn HTML and CSS', completed: true },
    { id: 1, text: 'Get good at JavaScript', completed: true },
    { id: 2, text: 'Master React', completed: false },
    { id: 3, text: 'Discover Redux', completed: false },
    { id: 4, text: 'Build amazing apps', completed: false },
  ],
  filters: {
    status: 'all',
  },
};

const rootReducer1 = (state = initialState, action) => {
  return state;
};

// here we add enhancer
const enhancer = devToolsEnhancer();

export const store1 = createStore(rootReducer1, enhancer);

// After starting the project using the npm start command in
// the standard developer tools, a new Redux tab will appear
// with Redux DevTools containing a list of dispatched actions
// on the left and detailed status and action information
// on the right.

// 3) to download data form our store we need to an hook useSelector

// import { useSelector } from "react-redux";

const MyComponent = () => {
  // here we downloaded wanted value
  const value = useSelector((state) => state.some.value);
};

// ===================================================================

// 4) lets add filters to our store
//
// id projecting we decided our store will use 3 filters all, active and complited
// those values will be always constant so we can add it to constants.js
// and if we want them to remain constant we can use Object.freeze that prevents changes

// src/redux/constants.js

export const statusFilters = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});

//========================================================================

//5) now we can add functionality to status filter component in our app

import { useSelector } from 'react-redux';
// importing hook that will be use
import { statusFilters } from '../redux/constants';
// importing our filters from constant file

export const StatusFilter = () => {
  // we are downloading our filter form redux
  const filter = useSelector((state) => state.filter.status);

  return (
    <div>
      <Button selected={filter === statusFilters.all}>All</Button>
      <Button selected={filter === statusFilters.active}>Active</Button>
      <Button selected={filter === statusFilters.completed}>Completed</Button>
    </div>
  );
};
//===========================================================================

// 6) lets import tasks

import { useSelector } from 'react-redux';
import { Task } from 'components/task/Task';
// importing object with tasks
import { statuseFilters } from '../redux/constants';

const getVisibleTasks = (tasks, statusFilters) => {
  switch (statusFilters) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    // we filter task are not completed to get only active tasks
    case statusFilters.completed:
      return tasks.filter((tasks) => task.completed);
    default:
      return tasks;
    // our defautl will be all filter
  }
};

export const TaskList = () => {
  // downloading array with tasks from redux
  const tasks = useSelector((state) => state.tasks);
  // downloading filter options
  const statusFilter = useSelector((state) => state.filter.status);
  // and here we calculate a array after certain button clicked
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  return (
    <ul>
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <Task task={task}></Task>
        </li>
      ))}
    </ul>
  );
};
// ========================================================================

// 7) Lets add functionality that will count actual number of task with picked filter

import { useSelector } from 'react-redux';

export const TaskCounter = () => {
  // downloading array with tasks
  const tasks = useSelector((state) => state.tasks);

  // on this basises we calculating
  const count = tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.action += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );

  // we use reduce puting starting object that hold initial object
  // that will hold active and completed count
  // reduce will go through array and if will spot that task have either
  // completed or active status and add number to object respectively

  return (
    <div>
      <p> Active: {count.active}</p>
      <p> Completed: {count.completed}</p>
    </div>
  );
};
//========================================================================
// 8) selector can be use in a lot of places in app which lead to redundency
// to avoid that selector are hold in own file of redux folder

export const getTasks = (state) => state.tasks;

export const getStatusFilter = (state) => state.filters.status;

// =======================================================================

// 9) lets learn how action works

const action = {
  type: 'Action type',
  payload: 'Payload value',
};

// lets add adding action

//
import { nanoid } from 'nanoid';

export const addTask = (text) => {
  return {
    type: 'task/addTask',
    payload: {
      id: nanoid(),
      completed: false,
      text,
    },
  };
};

export const deleteTask = (taskId) => {
  return {
    type: 'tasks/deleteTask',
    payload: taskId,
  };
};

export const toggleCompleted = (taskId) => {
  return {
    type: 'tasks/toggleCompleted',
    payload: taskId,
  };
};

export const setStatusFilter = (value) => {
  return {
    type: 'filters/setStatusFilter',
    payload: value,
  };
};

// =====================================================================

// lets import our actions to component to do that we need to useDispatch

import { useDispatch } from 'react-redux';

const MyComponent = () => {
  // we downlading hook to send actions
  const dispatch = useDispatch();
};

// =========================================================================

// 9) now lets use it together and use dispatch with action

import { useDispatch } from 'react-redux';

import { addTask } from '../redux/actions';

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // callback creator and passing action
    dispatch(addTask(form.elements.text.value));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="Enter task text..." />
      <button type="submit">Add task</button>
    </form>
  );
};

// ======================================================================

// 10) Now that we added task we also want to have a posibility to delete task

import { useDispatch } from 'react-redux';

import { deleteTask } from '../redux/actions';

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  return (
    <div>
      <input type="checkbox" />
      <p>{task.text}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

//========================================================================

// 11) And lets add posibility to change toggle

import { useDispatch } from 'react-redux';

import { deleteTask, toggleCompleted } from '../../redux/actions';

export const Task = ({ task }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteTask(task.id));

  const handleToggle = () => dispatch(toggleCompleted(task.id));

  return (
    <div>
      <input type="checkbox" onChange={handleToggle} checked={task.completed} />
      <p>{task.text}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

//==========================================================================

// 12) Now lets add filter buttons that shows desierable tasks

import { useSelector, useDispatch } from 'react-redux';
// importing hooks
import { setStatusFilter } from '../redux/actions';
// importing object with filter options
import { statusFilter } from '../../redux/constants';

export const StatusFilter = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.statusFilter);

  const handleFilterChange = (filter) => dispatch(setStatusFilter(filter));

  return (
    <div>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilters.active}
        onClick={() => handleFilterChange(statusFilters.active)}
      >
        Active
      </Button>
      <Button
        selected={filter === statusFilters.completed}
        onClick={() => handleFilterChange(statusFilters.completed)}
      >
        Completed
      </Button>
    </div>
  );
};
//========================================================================

// 13) Reducer - function that recive initial state and action and return changed
// state defined by action

import { statusFilters } from './constants';

const initialState = {
  tasks: [
    { id: 0, text: 'Learn HTML and CSS', completed: true },
    { id: 1, text: 'Get good at JavaScript', completed: true },
    { id: 2, text: 'Master React', completed: false },
    { id: 3, text: 'Discover Redux', completed: false },
    { id: 4, text: 'Build amazing apps', completed: false },
  ],
  filters: {
    status: statusFilters.all,
  },
};

// we are using initialstate as a default value
export const rootReducer = (state = initialState, action) => {
  // reducer read a type form action and basing on it will commite changes to initial state
  switch (action.type) {
    // here we defiene types and changes we want to ocure
    default: // every reductor recives action send from store
      // if we dont want reductore to service not described action we
      // want it to return state unchanged
      return state;
  }
};

// =====================================================================
// 14) adding add functionality to our reducer

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'task/addTask': {
      // first we need to return new state object
      return {
        // new object need to contain all previus elements
        // so its good to use spread/rest operator
        ...state,
        // and we add new array with task
        tasks: [
          ...state.tasks,
          action.payload,
          // things passed by action
        ],
      };
    }
    default:
      // and here are actions that are nod described in Reducer
      return state;
  }
};
// Reducers should not change their arguments (state and action).
// Their sole purpose is to handle the action by returning a new
// state based on the current state and action.

// Reducers should not change the state. Instead, reducers
// should update by copying the existing state and making
// changes to the copy.

// Reducers should not perform any “side effects” such as
// starting a timer, making HTTP requests, changing values
// ​​outside the function or its arguments, generating random
// numbers or strings, etc.

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // previous code
    case 'tasks/deleteTask':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

// and lets add toggle option

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Poprzedni kod case "tasks/addTask"

    // Poprzedni kod case "tasks/deleteTask"

    case 'tasks/toggleCompleted':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload) {
            return task;
          }
          return {
            ...task,
            completed: !task.completed,
          };
        }),
      };

    // and now lets add case to filter
    case 'filters/setStatusFilter':
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };
    default:
      return state;
  }
};
// =========================================================================

// HOW ever out reducer is now rather big and looong (thats what she said xD)

// what can we do is to split it to two smaller one one that
// will be responsible for tasks and second for status

const tasksInitialState = [
  { id: 0, text: 'Learn HTML and CSS', completed: true },
  { id: 1, text: 'Get good at JavaScript', completed: true },
  { id: 2, text: 'Master React', completed: false },
  { id: 3, text: 'Discover Redux', completed: false },
  { id: 4, text: 'Build amazing apps', completed: false },
];

const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case 'tasks/addTask':
      return [...state, action.payload];
    case 'tasks/deleteTask':
      return state.filter((task) => task.id !== action.payload);
    case 'tasks/toggleCompleted':
      return state.map(task => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
      default: 
      return state;
  }
};

const filtersInitialState = {
  status: statusFilter.all,
};

const filterReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter': 
    return {
      ...state,
      status: action.payload,
    };
    default: 
    return state;
  }}

  // now we connect those two reducer in one 

  export const rootReducer = (state = {}, action) => {
    return {
      tasks: tasksReducer(state.tasks, action),
      filters: filterReducer(state.filters, action),
    };
  };

  // but libr offer option to combine it 
  import { combineReducers } from 'redux';

  export const rootReducer = combineReducers({
    tasks: tasksReducer,
    filters: filterReducer,
  });