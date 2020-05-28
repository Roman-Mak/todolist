import React from "react";

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task, this.state.title);
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2: 0;
        this.props.changeStatus(this.props.task, status);
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };

    render = () => {
        let statusTask = this.props.task.status;
        let classNameTask = statusTask === 2 ? "todoList-task done" : "todoList-tasks";

        return (
            <div className={classNameTask}>
                <input onChange={this.onIsDoneChanged}
                    // {this.props.changeStatus(this.props.task.id, e.currentTarget.checked)}}
                       type="checkbox"
                       checked={statusTask === 2}
                />
                {
                    this.state.editMode
                        ? <input value={this.state.title}
                                 autoFocus={true}
                                 onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                        />
                        : <span onClick={this.activateEditMode}>{this.state.title}, </span>
                }
                <span>priority: {this.props.task.priority}</span>
                <button className="delete-item" onClick={this.deleteTask}>x</button>
            </div>
        )
    }
}

export default TodoListTask;