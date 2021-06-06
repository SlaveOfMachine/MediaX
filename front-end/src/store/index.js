import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/authReducer';

// Combine Reducers
const reducer = AuthReducer;

// Init Store
const store = createStore(reducer, applyMiddleware(thunk));

// Export Actions
export * from './actions/authActions';

// Export Store
export default store;