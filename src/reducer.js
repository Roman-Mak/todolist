export const ADD_TODOLIST = "todoList/reducer/ADD-TODOLIST";
export const ADD_TASK = "todoList/reducer/ADD-TASK";
export const CHANGE_TASK = "todoList/reducer/CHANGE-TASK";
export const DELETE_TODOLIST = "todoList/reducer/DELETE-TODOLIST";
export const DELETE_TASK = "todoList/reducer/DELETE-TASK";

const initialState = {
    todoLists: [
        {id: 0, title: "Поход в школу", tasks: []}
    ]
};

const reducer = (state = initialState, action) => {
    let newTodoList;
    switch (action.type) {
        case ADD_TODOLIST:
            newTodoList = [...state.todoLists, action.newTodoList];
            return {...state, todoLists: newTodoList};
        case ADD_TASK:
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.todoListId) {
                    return t;
                } else {
                    return {...t, tasks: [...t.tasks, action.newTask]}
                }
            });
            return {...state, todoLists: newTodoList};
        case CHANGE_TASK:
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.todoListId) {
                    return t;
                } else {
                    return {
                        ...t, tasks: [...t.tasks.map(task => {
                            if (task.id !== action.taskId) {
                                return task;
                            } else {
                                return {...task, ...action.obj}
                            }
                        })]
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

export const addTaskAC = (todoListId, newTask) => {
    return {
        type: ADD_TASK,
        todoListId,
        newTask
    };
};

export const changeTaskAC = (todoListId, taskId, newObj) => {
    return {
        type: CHANGE_TASK,
        todoListId,
        taskId,
        obj: newObj
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

export default reducer;