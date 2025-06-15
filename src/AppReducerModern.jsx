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
import { configureStore } from "@reduxjs/toolkit";
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