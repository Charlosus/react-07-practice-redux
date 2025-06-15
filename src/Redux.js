// redux is used to create storage that keep all stage changes
// and other effects that interact with our page

// to create storage npm install @reduxjs/toolkit

const createStore = (reducer) => {
  let state; // store all states

  const getState = () => state; // this display actual data stored

  const dispatch = (action) => {
    // this do determine action with picked state
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
};

// now we have created store and we have our storage worker (reduce)

// but worker do action need to know what to do and its determined in
// actions for example lets add two action to add and to remove object from store

// 1> creating save action
const actionSaveUser = {
  type: 'SAVE_USER', // here is working note what this action does
  payload: { id: 1, name: 'bob' }, // here we specify our action object
};

//2) creating remove action

// const actionRemoveUser = {
//   type: 'REMOVE_USER',
//   payload: 1, // here all we need is a id of specific record we want to remove
// };

// now that we have our action specified
// we need to 'learn' our 'storage worker'(reducer) how to interpret

const reducer = (state = [], action) => {
  if (action.type === 'SAVE_USER') {
    return [...state, action.payload];
  } else if (action.type === 'REMOVE_USER') {
    return state.filter((user) => user.id !== action.payload);
  }
};

// now reducer (worker) knows what to do if action is given

// now putting it all together lets use it to send order to
// our worker we use function dispatch that delivers order with action
const store = createStore(reducer);

store.dispatch(actionSaveUser);

console.log(store.getState());

// all funs and games but our actions are bit limited
// lets add save user action where we can pass  user

const saveUserAction = (user) => {
  // here we define user we want to add
  return {
    type: 'SAVE_USER',
    payload: user,
  };
};

store.dispatch(saveUserAction({ id: 3, name: 'Ana' }));

console.log(store.getState());
