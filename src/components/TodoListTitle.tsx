import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string;
    changeTodoListTitle: (title: string) => void;
}

const TodoListTitle = ({title, changeTodoListTitle}: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);

    const deactivateEditMode = () => {
        changeTodoListTitle(newTitle);
        setEditMode(false);
    };

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    return (
        <>
            {
                editMode
                    ? <input value={newTitle}
                             autoFocus={true}
                             onBlur={deactivateEditMode}
                             onChange={onTitleChanged}
                    />
                    : <h3 className="todoList-header__title" onClick={() => setEditMode(true)}>{newTitle}</h3>
            }
        </>
    );
};

export default TodoListTitle;