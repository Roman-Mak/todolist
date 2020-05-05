import {createStore} from "redux";

const initialState = {
    todoLists: [
        {id: 0, title: "kek", tasks: []}
    ]
};

const reducer = (state = initialState, action) => {
    let newTodoList;
    switch (action.type) {
        case "ADD-TODOLIST":
            newTodoList = [...state.todoLists, action.newTodoList];
            return {...state, todoLists: newTodoList};
        case "ADD-TASK":
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.todoListId) {
                    return t;
                } else {
                    return {...t, tasks: [...t.tasks, action.newTask]}
                }
            });
            return {...state, todoLists: newTodoList};
        case "CHANGE-TASK":
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
        case "DELETE-TODOLIST":
            newTodoList = state.todoLists.filter(t => t.id !== action.todoListId);
            return {...state, todoLists: newTodoList};
        case "DELETE-TASK":
            newTodoList = state.todoLists.map(t => {
                if (t.id !== action.todoListId) {
                    return t;
                } else {
                    return {...t, tasks: t.tasks.filter(task => task.id !== action.taskId)}
                }});
            return {...state, todoLists: newTodoList};
        default: return state;
    }
};

const store = createStore(reducer);

export default store;