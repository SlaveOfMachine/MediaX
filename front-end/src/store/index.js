import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/userReducer';
import MediaReducer from './reducers/mediaReducer';

// Combine Reducers
const reducer = combineReducers({
    auth: UserReducer,
    media: MediaReducer,
});

// Init Store
const store = createStore(reducer, applyMiddleware(thunk));

// Export Actions
export * from './actions/userActions';

// Export Store
export default store;