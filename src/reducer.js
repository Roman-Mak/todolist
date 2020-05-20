export const ADD_TODOLIST = "todoList/reducer/ADD-TODOLIST";
export const ADD_TASK = "todoList/reducer/ADD-TASK";
export const CHANGE_TASK = "todoList/reducer/CHANGE-TASK";
export const DELETE_TODOLIST = "todoList/reducer/DELETE-TODOLIST";
export const DELETE_TASK = "todoList/reducer/DELETE-TASK";
export const SET_TODOLISTS = "todoList/reducer/SET-TODOLISTS";
export const SET_TASKS = "todoList/reducer/SET-TASKS";

const initialState = {
    todoLists: []
};

const reducer = (state = initialState, action) => {
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
            return {...state, todoLists: action.todoLists.map(todo => ({...todo, tasks: []}))};
        case SET_TASKS:
            return {
                ...state, todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, tasks: action.tasks}
                    } else return todo;
                })
            };
        default:
            return state;
    }
};

export const addTodoListAC = (newTodoList) => {
    return {
        type: ADD_TODOLIST,
        newTodoList
    };
};

export const addTaskAC = (newTask) => {
    return {
        type: ADD_TASK,
        newTask
    };
};

export const changeTaskAC = (task) => {
    return {
        type: CHANGE_TASK,
        task
    };
};

export const deleteTodoListAC = (todoListId) => {
    return {
        type: DELETE_TODOLIST,
        todoListId,
    };
};

export const deleteTaskAC = (todoListId, taskId) => {
    return {
        type: DELETE_TASK,
        todoListId,
        taskId
    };
};

export const setTodoListsAC = (todoLists) => ({type: SET_TODOLISTS, todoLists});

export const setTasksAC = (todoListId, tasks) => ({type: SET_TASKS, todoListId, tasks});

export default reducer;