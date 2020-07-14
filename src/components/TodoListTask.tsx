import React, {ChangeEvent} from "react";
import {TaskType} from "../types/enities";
import DeleteButton from "../common/DeleteButton";

type StateType = {
    editMode: boolean;
    title: string;
}

type PropsType = {
    task: TaskType;
    changeStatus: (task: TaskType, status: number) => void;
    changeTitle: (task: TaskType, title: string) => void;
    deleteTask: (id: string) => void;
}

class TodoListTask extends React.Component<PropsType, StateType> {
    state: StateType = {
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

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2: 0;
        this.props.changeStatus(this.props.task, status);
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };

    render = () => {
        let statusTask = this.props.task.status;
        let classNameTask = statusTask === 2 ? "taskDone" : "";

        return (
            <div className="todoList-task">
                <input onChange={this.onIsDoneChanged}
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
                        : <span onClick={this.activateEditMode} className={classNameTask}>{this.state.title}</span>
                }
                <DeleteButton onClick={this.deleteTask}/>
            </div>
        )
    }
}

export default TodoListTask;