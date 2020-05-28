import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
});

const api = {
    addTodoList(newTodoListName) {
        return instance.post("", {title: newTodoListName},)
    },
    getTodoLists() {
        return instance.get("")
    },
    changeTodoListTitle(todoListId, newTitle) {
        return instance.put(`/${todoListId}`, {title: newTitle})
    },
    deleteTodoList(todoListId) {
        return instance.delete(`/${todoListId}`)
    },

    getTasks(todoListId) {
        return instance.get(`/${todoListId}/tasks`)
    },
    createTask(newTitle, todoListId) {
        return instance.post(`/${todoListId}/tasks`, {title: newTitle})
    },
    changeTask(task, obj) {
        let newTask = {...task, ...obj};
        return instance.put(
            `/${task.todoListId}/tasks/${task.id}`, newTask)
    },
    deleteTask(todoListId, taskId) {
        return instance.delete(`/${todoListId}/tasks/${taskId}`,)
    }
};

export default api;