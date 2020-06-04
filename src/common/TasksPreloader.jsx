import preloader from "../assets/img/tasks-preloader.svg";
import React from "react";

const PreloaderTodoLists = (props) => {
    return (
        <>
            <img src={preloader} alt={"loading"} style={{width: 90, height: 24}}/>
        </>
    )
};

export default PreloaderTodoLists;