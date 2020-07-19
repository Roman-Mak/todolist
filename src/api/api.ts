import axios from "axios";
import {TaskType, TodoType, UpdateTaskType} from "../types/enities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
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

export const todoListsAPI = {
    addTodoList(newTodoListName: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>("/todo-lists", {title: newTodoListName})
            .then(res => res.data);
    },
    getTodoLists() {
        return instance.get<Array<TodoType>>("/todo-lists").then(res => res.data);
    },
    changeTodoListTitle(todoListId: string, newTitle: string) {
        return instance.put<CommonApiType<{ item: TodoType }>>(`/todo-lists/${todoListId}`, {title: newTitle})
            .then(res => res.data);
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonApiType<{}>>(`/todo-lists/${todoListId}`).then(res => res.data);
    }
};

export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todoListId}/tasks`).then(res => res.data);
    },
    createTask(newTitle: string, todoListId: string) {
        return instance.post<CommonApiType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title: newTitle})
            .then(res => res.data);
    },
    changeTask(task: TaskType, obj: UpdateTaskType) {
        let newTask = {...task, ...obj};
        return instance.put<CommonApiType<{ item: TaskType }>>(`/todo-lists/${task.todoListId}/tasks/${task.id}`, newTask)
            .then(res => res.data);
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonApiType<{}>>(`/todo-lists/${todoListId}/tasks/${taskId}`,).then(res => res.data);
    }
};

export const authAPI = {
    authMe() {
        return instance.get<CommonApiType<{id: string; email: string; login: string}>>(`auth/me`).then(res => res.data);
    },
    authLogin(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe}).then(res => res.data);
    },
    authLogout() {
        return instance.delete(`auth/login`).then(res => res.data);
    }
};