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

class TodoListTasks extends React.Component<PropsType> {
    render = () => {
        let taskElements = this.props.tasks.map(task => {
            return <TodoListTask task={task}
                                 changeStatus={this.props.changeStatus}
                                 changeTitle={this.props.changeTitle}
                                 key={task.id}
                                 deleteTask={this.props.deleteTask}
            />
        });

        return (
            <div className="todoList-tasks">
                {this.props.tasksIsFetching ? <TasksPreloader/> : taskElements}
            </div>
        );
    };
}

export default TodoListTasks;