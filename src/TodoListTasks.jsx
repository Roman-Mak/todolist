import React from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
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
                {taskElements}
            </div>
        );
    };
}

export default TodoListTasks;