import axios from "axios";
import {TaskType, TodoType, UpdateTaskType} from "./types/enities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
});

type CommonApiType<T> = {
    resultCode: number;
    messages: Array<string>;
    data: T;
}

type GetTasksType = {
    totalCount: number;
    error: string;
    items: Array<TaskType>;
}

const api = {
    addTodoList(newTodoListName: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>("", {title: newTodoListName})
            .then(res => res.data);
    },
    getTodoLists() {
        return instance.get<Array<TodoType>>("").then(res => res.data);
    },
    changeTodoListTitle(todoListId: string, newTitle: string) {
        return instance.put<CommonApiType<{ item: TodoType }>>(`/${todoListId}`, {title: newTitle})
            .then(res => res.data);
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonApiType<{}>>(`/${todoListId}`).then(res => res.data);
    },

    getTasks(todoListId: string) {
        return instance.get<GetTasksType>(`/${todoListId}/tasks`).then(res => res.data);
    },
    createTask(newTitle: string, todoListId: string) {
        return instance.post<CommonApiType<{ item: TaskType }>>(`/${todoListId}/tasks`, {title: newTitle})
            .then(res => res.data);
    },
    changeTask(task: TaskType, obj: UpdateTaskType) {
        let newTask = {...task, ...obj};
        return instance.put<CommonApiType<{ item: TaskType }>>(`/${task.todoListId}/tasks/${task.id}`, newTask)
            .then(res => res.data);
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonApiType<{}>>(`/${todoListId}/tasks/${taskId}`,).then(res => res.data);
    }
};

export default api;