import React from "react";
import TodoListTask from "./TodoListTask";
import TasksPreloader from "../common/TasksPreloader";
import {TaskType} from "../types/enities";

type PropsType = {
    tasks: Array<TaskType>;
    changeStatus: (task: TaskType, status: number) => void;
    changeTitle: (task: TaskType, title: string) => void;
    deleteTask: (id: string) => void;
    tasksIsFetching: boolean;
};

const TodoListTasks = ({tasks, changeStatus, changeTitle, deleteTask, tasksIsFetching}: PropsType) => {
    let taskElements = tasks.map(task =>
        <TodoListTask task={task}
                      changeStatus={changeStatus}
                      changeTitle={changeTitle}
                      key={task.id}
                      deleteTask={deleteTask}/>
    );

    return (
        <div className="todoList-tasks">
            {tasksIsFetching ? <TasksPreloader/> : taskElements}
        </div>
    );
};

export default TodoListTasks;