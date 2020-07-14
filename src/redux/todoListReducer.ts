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
const TODOLISTS_IS_FETCHING = "todoList/todoListReducer/TODOLISTS-IS-FETCHING";
const TASKS_IS_FETCHING = "todoList/todoListReducer/TASKS-IS-FETCHING";

const initialState = {
    todoLists: [] as Array<TodoType>,
    todoListsIsFetching: false
};

type initialStateType = typeof initialState;

const todoListReducer = (state: initialStateType = initialState, action: TodoActionTypes): initialStateType => {
    let newTodoList;
    switch (action.type) {
        case ADD_TODOLIST:
            newTodoList = [...state.todoLists, action.newTodoList];
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
            return {...state, todoLists: action.todoLists.map(todo => ({...todo, tasks: [], taskIsFetching: false}))};
        case SET_TASKS:
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, tasks: action.tasks}
                    } else return todo;
                })
            };
        case CHANGE_TODOLIST_TITLE:
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, title: action.newTitle}
                    } else return todo;
                })
            };
        case TODOLISTS_IS_FETCHING:
            return {...state, todoListsIsFetching: action.isFetching};
        case TASKS_IS_FETCHING:
            return {...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, taskIsFetching: action.isFetching}
                    } else return todo;
                })};
        default:
            return state;
    }
};

type TodoActionTypes =
    AddTodoListSuccessType
    | AddTaskSuccessType
    | ChangeTaskSuccessType
    | DeleteTodoListSuccessType
    | DeleteTaskSuccessType
    | SetTodoListsSuccessType
    | SetTasksSuccessType
    | changeTodoListTitleSuccessType
    | TodoListsIsFetchingSuccessType
    | TasksIsFetchingSuccessType;

type AddTodoListSuccessType = {
    type: typeof ADD_TODOLIST;
    newTodoList: TodoType;
};
const addTodoListSuccess = (newTodoList: TodoType): AddTodoListSuccessType => ({type: ADD_TODOLIST, newTodoList});

type AddTaskSuccessType = {
    type: typeof ADD_TASK;
    newTask: TaskType;
};
const addTaskSuccess = (newTask: TaskType): AddTaskSuccessType => ({type: ADD_TASK, newTask});

type ChangeTaskSuccessType = {
    type: typeof CHANGE_TASK;
    task: TaskType;
};
const changeTaskSuccess = (task: TaskType): ChangeTaskSuccessType => ({type: CHANGE_TASK, task});

type DeleteTodoListSuccessType = {
    type: typeof DELETE_TODOLIST;
    todoListId: string;
};
const deleteTodoListSuccess = (todoListId: string): DeleteTodoListSuccessType => ({type: DELETE_TODOLIST, todoListId});

type DeleteTaskSuccessType = {
    type: typeof DELETE_TASK;
    todoListId: string;
    taskId: string;
};
const deleteTaskSuccess = (todoListId: string, taskId: string): DeleteTaskSuccessType => ({
    type: DELETE_TASK,
    todoListId,
    taskId
});

type SetTodoListsSuccessType = {
    type: typeof SET_TODOLISTS;
    todoLists: Array<TodoType>;
};
const setTodoListsSuccess = (todoLists: Array<TodoType>): SetTodoListsSuccessType => ({type: SET_TODOLISTS, todoLists});

type SetTasksSuccessType = {
    type: typeof SET_TASKS;
    todoListId: string;
    tasks: Array<TaskType>
};
const setTasksSuccess = (todoListId: string, tasks: Array<TaskType>): SetTasksSuccessType => ({
    type: SET_TASKS,
    todoListId,
    tasks
});

type changeTodoListTitleSuccessType = {
    type: typeof CHANGE_TODOLIST_TITLE;
    todoListId: string;
    newTitle: string;
};
const changeTodoListTitleSuccess = (todoListId: string, newTitle: string): changeTodoListTitleSuccessType => ({
    type: CHANGE_TODOLIST_TITLE,
    todoListId,
    newTitle
});

type TodoListsIsFetchingSuccessType = {
    type: typeof TODOLISTS_IS_FETCHING;
    isFetching: boolean;
}
const todoListsIsFetchingSuccess = (isFetching: boolean): TodoListsIsFetchingSuccessType => ({
    type: TODOLISTS_IS_FETCHING,
    isFetching
});

type TasksIsFetchingSuccessType = {
    type: typeof TASKS_IS_FETCHING;
    todoListId: string;
    isFetching: boolean;
}
const tasksIsFetchingSuccess = (todoListId: string, isFetching: boolean): TasksIsFetchingSuccessType => ({
    type: TASKS_IS_FETCHING,
    todoListId,
    isFetching
});


export const getTodoLists = () => (dispatch: Dispatch<TodoActionTypes>) => {
    dispatch(todoListsIsFetchingSuccess(true));
    api.getTodoLists()
        .then(res => {
            dispatch(setTodoListsSuccess(res));
            dispatch(todoListsIsFetchingSuccess(false));
        });
};
export const addTodoList = (newTodoListName: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.addTodoList(newTodoListName)
        .then(res => {
            if (res.resultCode === 0) {
                let todoList = res.data.item;
                dispatch(addTodoListSuccess(todoList));
            }
        })
};
export const changeTodoListTitle = (todoListId: string, newTitle: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.changeTodoListTitle(todoListId, newTitle)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(changeTodoListTitleSuccess(todoListId, newTitle));
            }
        })
};
export const deleteTodoList = (todoListId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.deleteTodoList(todoListId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(deleteTodoListSuccess(todoListId));
            }
        })
};
export const getTasks = (todoListId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    dispatch(tasksIsFetchingSuccess(todoListId, true));
    api.getTasks(todoListId)
        .then(res => {
            if (!res.error) {
                let tasks = res.items;
                dispatch(setTasksSuccess(todoListId, tasks));
                dispatch(tasksIsFetchingSuccess(todoListId, false));
            }
        })
};
export const addTask = (todoListId: string, newTitle: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.createTask(newTitle, todoListId)
        .then(res => {
            if (res.resultCode === 0) {
                let task = res.data.item;
                dispatch(addTaskSuccess(task));
            }
        })
};
export const changeTask = (task: TaskType, obj: UpdateTaskType) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.changeTask(task, obj)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(changeTaskSuccess(res.data.item));
            }
        })
};
export const deleteTask = (todoListId: string, taskId: string) => (dispatch: Dispatch<TodoActionTypes>) => {
    api.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(deleteTaskSuccess(todoListId, taskId));
            }
        });
};

export default todoListReducer;