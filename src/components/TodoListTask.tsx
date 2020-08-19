import React, {ChangeEvent, useState} from "react";
import {TaskType} from "../types/enities";
import DeleteButton from "../common/DeleteButton";

type PropsType = {
    task: TaskType;
    changeStatus: (task: TaskType, status: number) => void;
    changeTitle: (task: TaskType, title: string) => void;
    deleteTask: (id: string) => void;
};

const TodoListTask = ({task, changeStatus, changeTitle, deleteTask}: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(task.title);

    const deactivateEditMode = () => {
        changeTitle(task, title);
        setEditMode(false);
    };

    const onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        changeStatus(task, status);
    };

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    let classNameTask = task.status === 2 ? "taskDone" : "";

    return (
        <div className="todoList-task">
            <input onChange={onIsDoneChanged}
                   type="checkbox"
                   checked={task.status === 2}
            />
            {
                editMode
                    ? <input value={title}
                             autoFocus={true}
                             onBlur={deactivateEditMode}
                             onChange={onTitleChanged}
                    />
                    : <span onClick={() => setEditMode(true)} className={classNameTask}>{title}</span>
            }
            <DeleteButton onClick={() => deleteTask(task.id)}/>
        </div>
    )
};

export default TodoListTask;