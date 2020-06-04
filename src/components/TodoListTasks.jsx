import React from "react";
import TodoListTask from "./TodoListTask";
import TasksPreloader from "../common/TasksPreloader";

class TodoListTasks extends React.Component {
    render = () => {
        if (this.props.tasks.length === 0) {
            return <TasksPreloader/>
        }
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
                {taskElements}
            </div>
        );
    };
}

export default TodoListTasks;