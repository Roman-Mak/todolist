import React from "react";

class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };

    render = () => {

        let classNameTask = this.props.task.isDone ? "todoList-task done" : "todoList-tasks";

        return (
            <div className={classNameTask}>
                <input onChange={this.onIsDoneChanged}
                // {this.props.changeStatus(this.props.task.id, e.currentTarget.checked)}}
                       type="checkbox"
                       checked={this.props.task.isDone}
                />
                <span>{this.props.task.id} - </span>
                {
                    this.state.editMode
                        ? <input value={this.props.task.title}
                                 autoFocus={true}
                                 onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                        />
                        : <span onClick={this.activateEditMode}>{this.props.task.title}, </span>
                }
                <span>priority: {this.props.task.priority}</span>
            </div>
        )
    }
}

export default TodoListTask;