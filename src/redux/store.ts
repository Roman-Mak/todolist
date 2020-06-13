import {applyMiddleware, combineReducers, createStore} from "redux";
import todoListReducer from "./todoListReducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducers = combineReducers({
    todoLists: todoListReducer
});

type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;