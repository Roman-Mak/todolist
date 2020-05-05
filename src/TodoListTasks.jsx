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
                {/*<TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[3].title} isDone={this.props.tasks[3].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[4].title} isDone={this.props.tasks[4].isDone}/>*/}
            </div>
        );
    };
}

export default TodoListTasks;