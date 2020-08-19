import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import AddButton from "../common/AddButton";

type PropsType = {
    addItem: (title: string) => void;
    placeholder: string;
    isFetching: boolean;
}

const AddNewItemForm = ({addItem, placeholder, isFetching}: PropsType) => {
    const [error, setError] = useState<string>("");
    const [item, setItem] = useState<string>("");

    const onAddItemClick = useCallback(() => {
        if (item === "") {
            setError("error");
        } else {
            setError("");
            addItem(item);
            setItem("");
        }
    },[addItem, item]);

    const onItemChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setItem(e.currentTarget.value)
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddItemClick();
        }
    };

    return (
        <div className="addNewTaskForm">
            <input className={error}
                   type="text"
                   placeholder={placeholder}
                   onChange={onItemChanged}
                   onKeyPress={onKeyPress}
                   value={item}
            />
            <AddButton onClick={onAddItemClick} disabled={isFetching}/>
        </div>
    );
};

export default AddNewItemForm;