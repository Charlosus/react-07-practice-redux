// Traditional reducer usage can be complicated so lazy devs manage to create 
// Redux Toolkit 

// to install it in project we need to use 

// npm install @reduxjs/toolkit

// thanks to that there is no need to install tradition react in some
// we can use it to get combineReducers() 

// to fully install redux lib 

//npm install @reduxjs/toolkit react-redux


// lets refactor code to be used with toolkit 
//=============== Before ========================
import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { rootReducer } from "./reducer";

const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);

//=============== After ========================
import { configureStore, createReducer } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

const store = configureStore({
  reducer: rootReducer,
});

// to create store we can use configureStore 

// BEFORE 

import { combineReducers } from "redux";
import { statusFilters } from "./constants";

const tasksInitialState = [];

const tasksReducer = (state = tasksInitialState, action) => {
  // Reducer code
};

const filtersInitialState = {
  status: statusFilters.all,
};

const filtersReducer = (state = filtersInitialState, action) => {
  // Reducer code
};

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});

// AFTER ================================================================\

import { statusFilters } from "./constats";

const tasksInitialState = [];

export const tasksReducer = (state = tasksInitialState, action) => {
    // redurer code 
}

const filtersInitialState = {
    status: statusFilters.all,
}

export filtersReducer = (state = filtersInitialState, action) => {
    // reducer code 
}

// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import {tasksReducer, filtersReducer} from './reducers';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        filters: filtersReducer,
    },
});

// now lets go to actions 

// src/redux/actions.js

//=============== Before ========================
const addTask = text => {
  return { type: "tasks/AddTask", payload: text };
};

console.log(addTask("Learn Redux Toolkit"));
// {type: "tasks/addTask", payload: "Learn Redux Toolkit"}

//==============================================================

import { createAction } from "@reduxjs/toolkit";

const addTask = createAction('tasks/AddTask');

console.log(addTask('tasks/AddTask'));

// {type: 'tasks/addTask', payload: 'Learn Redux Toolkit'}

// heres how our actions would look like 

import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask");

export const deleteTask = createAction("tasks/deleteTask");

export const toggleCompleted = createAction("tasks/toggleCompleted");

export const setStatusFilter = createAction("filters/setStatusFilter");

import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("tasks/AddTask");

// Kreator akcji ma właściwość type
console.log(addTask.type); // "tasks/AddTask"

// Metoda toString() funkcji addTask została przedefiniowana
console.log(addTask.toString()); // "tasks/AddTask"

// =====================================================================

// lets change redures to use toolkit

import { addTask, deleteTask, toggleCompleted } from "./actions";

export const tasksReducer = (state = tasksInitialState, action) => {
    switch (action.type) {
        case addTask.type: 
        return [...state, action.payload];

        case deleteTask.type: 
        return state.filter(task => task.id !== action.payload);

        case toggleCompleted.type:
            return state.map(task => {
                if (task.id !== action.payload) {
                    return task;
                }
                return {...task, completed: !task.completed};
            });

            default: 
            return state;
    }
};

//========================================================================

//here is construction of createAction

createAction(type, prepareAction)

// if we want to add special properties to this action for example add
// unique id 
import { createAction, nanoid } from "@reduxjs/toolkit";

export const addTask = createAction('tasks/addTask', text => {
    return {
        payload: {
            text,
            id: nanoid(),
            completed: false
        }
    }
})
console.log(addTask("Learn Redux Toolkit"));
/**
 * {
 *   type: 'tasks/addTask',
 *   payload: {
 *     text: 'Learn Redux Toolkit',
 *     id: '4AJvwMSWEHCchcWYga3dj',
 *     completed: false
 *   }
 * }
 **/

// ======================================================================

// usage of toolkit in REDUCER 

// here is how to create Reducer 

createReducer(initialState, builderCallback)

// initial state recivies first state of reducer 
// builderCallback is is callback function that is use for sepcific actions 

createReducer({}, builder => {
    builder.addCase(action, (state, action) => {})
})

//=========================================================================== 

// src/redux/reducers.js

import { createReducer } from "@reduxjs/toolkit";
import { statusFilters } from "./constants";
import { addTask, deleteTask, toggleCompleted } from "./actions";

const tasksInitialState = [];

//=============== Before ========================
const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case addTask.type:
    // case logic
    case deleteTask.type:
    // case logic
    case toggleCompleted.type:
    // case logic
    default:
      return state;
  }
};

export const taskReducer = createReducer(tasksInitialState, builder => {
    builder
    .addCase(addTask, (state, action) => {
        return [...state, action.payload];
    })
    .addCase(deleteTask, (state, action) => {
        return state.filter(task => task.id !== action.payload);
    })
    .addCase(toggleCompleted, (state, action) => {
        return state.map(task => {
            if (task.id !== action.payload) {
                return task;
            }
            return {
                ...task,
                completed: !task.completed,
            }
        })
    })
})

export const filtersReducer = createReducer(filtersInitialState, builder => {
    builder.addCase(setStatusFilter, (state, action) => {
        return {
            ...state,
            status: action.payload,
        };
    });
});

// src/redux/reducers.js

export const tasksReducer = createReducer(tasksInitialState, builder => {
  builder
    .addCase(addTask, (state, action) => {
      // ✅ Immer zastąpi to operacją aktualizacji
      state.push(action.payload);
    })
    .addCase(deleteTask, (state, action) => {
      // ✅ Immer zastąpi to operacją aktualizacji
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    })
    .addCase(toggleCompleted, (state, action) => {
      // ✅ Immer zastąpi to operacją aktualizacji
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
      }
    });
});

export const filtersReducer = createReducer(filtersInitialState, builder => {
  builder.addCase(setStatusFilter, (state, action) => {
    // ✅ Immer zastąpi to operacją aktualizacji
    state.status = action.payload;
  });
});

// ==============w===============================================

// Slices 

// In design, the Redux state structure is divided into smaller
// slices, each of which is handled by a separate reducer. In our 
// task list application, there are two such slices—tasks and filters.

const appState = {
    tasks: [],
    filters: {}
};

const tasksSlice = createSlice({
    // name of slice
    name: 'tasks', 
    // initialstate
    initialState: tasksInitialState,
    // reducers object 
    reducers: {
        addTask(state, action) {},
        deleteTask(state, action) {},
        toggleCompleted(state, action) {},
    }
})

const { addTask, deleteTask, toggleCompleted } = tasksSlice.action

const tasksReducer = tasksSlice.reducer;

const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksInitialState,
    reducers: {
        addTask(state, action) {
            state.push(action.payload);
        },
        deleteTask(state, action) {
            const index = state.findeIndex(task => task.id === action.payload);
            state.splice(index, 1);
        },
        toggleCompleted(state, action) {
            for (const task of state) {
                if (task.id === action.payload) {
                    task.completed = !task.completed;
                    break;
                }
            }
        }
    }
})

const {addTask, deleteTask, toggleCompleted} = tasksSlice.actions;
const taskReducer = tasksSlice.reducer;

//===========================================================================
// 3) Payload Content

// The addTask action creator only takes a string with the task text, 
// and then changes the payload value using the prepareAction function. 
// This is how it looks in our code now.

import { createAction, nanoid } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask", text => {
    return {
        payload: {
            text,
            id: nanoid(),
            completed: false,
        },
    };
});

import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    // Код решти редюсерів
  },
});

//====================================================================
// We don't need reducers.js anymore, because a separate file will
// be created for each slice. In the case of the tasks slice, it 
// will be the tasksSlice.js file.

// src/redux/taslsSlice.js 
import { createSlice } from "@reduxjs/toolkit";

import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksInitialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
});

export const {addTask, deleteTask, toggleCompleted} = tasksSlice.action;
export const tasksReducer = tasksSlice.reducer

//src/redux/filtersSlice.js 

import { createSlice } from "@reduxjs/toolkit";
import { statusFilters } from "./constance";

const filtersInitialState = {
    status: statusFilters.all,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState: filtersInitialState,
    reducers: {
        setStatusFilter(state, action) {
            state.status = action.payload;
        },
    },
}),

// we are exporting creators of action and reducers 

export const {setStatusFilter} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

// =====================================================================

// 5) creating Stores 

// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import {tasksReducer} from './tasksSlice';
import {filtersReducer} from './filtersSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        filters: filtersReducer,
    },
});
