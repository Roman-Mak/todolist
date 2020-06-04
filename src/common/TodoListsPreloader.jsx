import preloader from "../assets/img/todolists-preloader.svg";
import React from "react";

const TodoListsPreloader = (props) => {
    return (
        <>
            <img src={preloader} alt={"loading"} style={{marginTop: 100}}/>
        </>
    )
};

export default TodoListsPreloader;