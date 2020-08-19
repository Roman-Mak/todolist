import React, {useState} from "react";
import {FilterValueType} from "./TodoList";

type PropsType = {
    filterValue: FilterValueType;
    changeFilter: (filter: FilterValueType) => void;
};

const TodoListFooter = ({filterValue, changeFilter}: PropsType) => {
    const [isHidden, setIsHidden] = useState<boolean>(false);

    let classForAll = filterValue === "All" ? "filter-active" : "";
    let classForCompleted = filterValue === "Completed" ? "filter-active" : "";
    let classForActive = filterValue === "Active" ? "filter-active" : "";

    return (
        <div className="todoList-footer">
            {!isHidden && <div>
                <button onClick={() => changeFilter("All")} className={classForAll}>All</button>
                <button onClick={() => changeFilter("Completed")} className={classForCompleted}>Completed</button>
                <button onClick={() => changeFilter("Active")} className={classForActive}>Active</button>
            </div>}
            {!isHidden && <span className="showHide" onClick={() => setIsHidden(true)}>hide buttons</span>}
            {isHidden && <span className="showHide" onClick={() => setIsHidden(false)}>show buttons</span>}
        </div>
    );
};

export default TodoListFooter;