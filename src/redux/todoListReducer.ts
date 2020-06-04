import api from "../api";
import {TaskType, TodoType, UpdateTaskType} from "../types/enities";
import {Dispatch} from "redux";

const ADD_TODOLIST = "todoList/todoListReducer/ADD-TODOLIST";
const ADD_TASK = "todoList/todoListReducer/ADD-TASK";
const CHANGE_TASK = "todoList/todoListReducer/CHANGE-TASK";
const DELETE_TODOLIST = "todoList/todoListReducer/DELETE-TODOLIST";
const DELETE_TASK = "todoList/todoListReducer/DELETE-TASK";
const SET_TODOLISTS = "todoList/todoListReducer/SET-TODOLISTS";
const SET_TASKS = "todoList/todoListReducer/SET-TASKS";
const CHANGE_TODOLIST_TITLE = "todoList/todoListReducer/CHANGE-TODOLIST-TITLE";

type initialStateType = {
    todoLists: Array<TodoType>
}

const initialState: initialStateType = {
    todoLists: []
};

// type initialStateType = typeof initialState;

const todoListReducer = (state: initialStateType = initialState, action: TodoActionTypes) => {
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

type TodoActionTypes = addTodoListSuccessType | addTaskSuccessType | changeTaskSuccessType | deleteTodoListSuccessType
| deleteTaskSuccessType | setTodoListsSuccessType | setTasksSuccessType | changeTodoListTitleSuccessType;

type addTodoListSuccessType = {
    type: typeof ADD_TODOLIST;
    newTodoList: TodoType;
};
const addTodoListSuccess = (newTodoList: TodoType): addTodoListSuccessType => ({type: ADD_TODOLIST, newTodoList});

type addTaskSuccessType = {
    type: typeof ADD_TASK;
    newTask: TaskType;
};
const addTaskSuccess = (newTask: TaskType): addTaskSuccessType => ({type: ADD_TASK, newTask});

type changeTaskSuccessType = {
    type: typeof CHANGE_TASK;
    task: TaskType;
};
const changeTaskSuccess = (task: TaskType): changeTaskSuccessType => ({type: CHANGE_TASK, task});

type deleteTodoListSuccessType = {
    type: typeof DELETE_TODOLIST;
    todoListId: string;
};
const deleteTodoListSuccess = (todoListId: string): deleteTodoListSuccessType => ({type: DELETE_TODOLIST, todoListId});

type deleteTaskSuccessType = {
    type: typeof DELETE_TASK;
    todoListId: string;
    taskId: string;
};
const deleteTaskSuccess = (todoListId: string, taskId: string): deleteTaskSuccessType => ({type: DELETE_TASK, todoListId, taskId});

type setTodoListsSuccessType = {
    type: typeof SET_TODOLISTS;
    todoLists: Array<TodoType>;
};
const setTodoListsSuccess = (todoLists: Array<TodoType>): setTodoListsSuccessType => ({type: SET_TODOLISTS, todoLists});

type setTasksSuccessType = {
    type: typeof SET_TASKS;
    todoListId: string;
    tasks: Array<TaskType>
};
const setTasksSuccess = (todoListId: string, tasks: Array<TaskType>): setTasksSuccessType => ({type: SET_TASKS, todoListId, tasks});

type changeTodoListTitleSuccessType = {
    type: typeof CHANGE_TODOLIST_TITLE;
    todoListId: string;
    newTitle: string;
};
const changeTodoListTitleSuccess = (todoListId: string, newTitle: string): changeTodoListTitleSuccessType => ({type: CHANGE_TODOLIST_TITLE, todoListId, newTitle});

export const getTodoLists = () => (dispatch: Dispatch<TodoActionTypes>) => {
    api.getTodoLists()
        .then(res => {
            dispatch(setTodoListsSuccess(res.data));
        });
};
export const addTodoList = (newTodoListName: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.addTodoList(newTodoListName)
        .then(res => {
            if (res.data.resultCode === 0) {
                let todoList = res.data.data.item;
                dispatch(addTodoListSuccess(todoList));
            }
        })
};
export const changeTodoListTitle = (todoListId: string, newTitle: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.changeTodoListTitle(todoListId, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleSuccess(todoListId, newTitle));
            }
        })
};
export const deleteTodoList = (todoListId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.deleteTodoList(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodoListSuccess(todoListId));
            }
        })
};
export const getTasks = (todoListId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.getTasks(todoListId)
        .then(res => {
            if (!res.data.error) {
                let tasks = res.data.items;
                dispatch(setTasksSuccess(todoListId, tasks));
            }
        })
};
export const addTask = (newTitle: string, todoListId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.createTask(newTitle, todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item;
                dispatch(addTaskSuccess(task));
            }
        })
};
export const changeTask = (task: TaskType, obj: UpdateTaskType) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.changeTask(task, obj)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskSuccess(res.data.data.item));
            }
        })
};
export const deleteTask = (todoListId: string, taskId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskSuccess(todoListId, taskId));
            }
        });
};

export default todoListReducer;