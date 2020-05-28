import {applyMiddleware, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

// let rootReducers = {
//     todoLists: todoListReducer;
//     tasks: tasksReducer
// }
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

//Сделать комбайн редьюсер

export default store;