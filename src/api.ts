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

const api = {
    addTodoList(newTodoListName: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>("", {title: newTodoListName},)
    },
    getTodoLists() {
        return instance.get("")
    },
    changeTodoListTitle(todoListId: string, newTitle: string) {
        return instance.put(`/${todoListId}`, {title: newTitle})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonApiType<{}>>(`/${todoListId}`)
    },

    getTasks(todoListId: string) {
        return instance.get(`/${todoListId}/tasks`)
    },
    createTask(newTitle: string, todoListId: string) {
        return instance.post(`/${todoListId}/tasks`, {title: newTitle})
    },
    changeTask(task: TaskType, obj: UpdateTaskType) {
        let newTask = {...task, ...obj};
        return instance.put(
            `/${task.todoListId}/tasks/${task.id}`, newTask)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete(`/${todoListId}/tasks/${taskId}`,)
    }
};

export default api;