import api from "./api";

export const ADD_TODOLIST = "todoList/reducer/ADD-TODOLIST";
export const ADD_TASK = "todoList/reducer/ADD-TASK";
export const CHANGE_TASK = "todoList/reducer/CHANGE-TASK";
export const DELETE_TODOLIST = "todoList/reducer/DELETE-TODOLIST";
export const DELETE_TASK = "todoList/reducer/DELETE-TASK";
export const SET_TODOLISTS = "todoList/reducer/SET-TODOLISTS";
export const SET_TASKS = "todoList/reducer/SET-TASKS";
export const CHANGE_TODOLIST_TITLE = "todoList/reducer/CHANGE-TODOLIST-TITLE";

const initialState = {
    todoLists: []
};

const reducer = (state = initialState, action) => {
    let newTodoList;
    switch (action.type) {
        case ADD_TODOLIST:
            newTodoList = [action.newTodoList, ...state.todoLists];
            return {...state, todoLists: newTodoList};
        case ADD_TASK:
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.newTask.todoListId) {
                    return t;
                } else {
                    return {...t, tasks: [...t.tasks, action.newTask]}
                }
            });
            return {...state, todoLists: newTodoList};
        case CHANGE_TASK:
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.task.todoListId) {
                    return t;
                } else {
                    return {
                        ...t, tasks: t.tasks.map(task => {
                            if (task.id !== action.task.id) {
                                return task;
                            } else {
                                return {...action.task}
                            }
                        })
                    }
                }
            });
            return {...state, todoLists: newTodoList};
        case DELETE_TODOLIST:
            newTodoList = state.todoLists.filter(t => t.id !== action.todoListId);
            return {...state, todoLists: newTodoList};
        case DELETE_TASK:
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.todoListId) {
                    return t;
                } else {
                    return {...t, tasks: t.tasks.filter(task => task.id !== action.taskId)}
                }
            });
            return {...state, todoLists: newTodoList};
        case SET_TODOLISTS:
            return {...state, todoLists: action.todoLists.map(todo => ({...todo, tasks: []}))};
        case SET_TASKS:
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, tasks: action.tasks}
                    } else return todo;
                })
            };
        case CHANGE_TODOLIST_TITLE:
            return {...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, title: action.newTitle}
                    } else return todo;
                })};
        default:
            return state;
    }
};

export const addTodoListAC = (newTodoList) => ({type: ADD_TODOLIST, newTodoList});
export const addTaskSuccess = (newTask) => ({type: ADD_TASK, newTask});
export const changeTaskSuccess = (task) => ({type: CHANGE_TASK, task});
export const deleteTodoListSuccess = (todoListId) => ({type: DELETE_TODOLIST, todoListId});
export const deleteTaskSuccess = (todoListId, taskId) => ({type: DELETE_TASK, todoListId, taskId});
export const setTodoListsSuccess = (todoLists) => ({type: SET_TODOLISTS, todoLists});
export const setTasksSuccess = (todoListId, tasks) => ({type: SET_TASKS, todoListId, tasks});
export const changeTodoListTitleSuccess = (todoListId, newTitle) => ({type: CHANGE_TODOLIST_TITLE, todoListId, newTitle});

export const getTodoLists = () => (dispatch, getState) => {
    api.getTodoLists()
        .then(res => {
            dispatch(setTodoListsSuccess(res.data));
        });
};
export const addTodoList = (newTodoListName) => (dispatch) => {
    api.addTodoList(newTodoListName)
        .then(res => {
            if (res.data.resultCode === 0) {
                let todoList = res.data.data.item;
                dispatch(addTodoListAC(todoList));
            }
        })
};
export const changeTodoListTitle = (todoListId, newTitle) => (dispatch) => {
    api.changeTodoListTitle(todoListId, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleSuccess(todoListId, newTitle));
            }
        })
};
export const deleteTodoList = (todoListId) => (dispatch) => {
    api.deleteTodoList(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodoListSuccess(todoListId));
            }
        })
};
export const getTasks = (todoListId) => (dispatch) => {
    api.getTasks(todoListId)
        .then(res => {
            if (!res.data.error) {
                let tasks = res.data.items;
                dispatch(setTasksSuccess(todoListId, tasks));
            }
        })
};
export const addTask = (newTitle, todoListId) => (dispatch) => {
    api.createTask(newTitle, todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item;
                dispatch(addTaskSuccess(task));
            }
        })
};
export const changeTask = (task, obj) => (dispatch) => {
    api.changeTask(task, obj)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskSuccess(res.data.data.item));
            }
        })
};
export const deleteTask = (todoListId, taskId) => (dispatch) => {
    api.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskSuccess(todoListId, taskId));
            }
        });
};

export default reducer;