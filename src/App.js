import React from 'react';
import './App.css'; 
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    tasks = [
        {title: "JS", isDone: true, priority: "high"},
        {title: "CSS", isDone: true, priority: "low"},
        {title: "React", isDone: false, priority: "high"},
        {title: "SaSS", isDone: false, priority: "low"},
        {title: "Redux", isDone: false, priority: "medium"}
    ]
    filterValue = "Completed";
    render = () => {
        // let tasks = [
        //     {title: "JS", isDone: true, priority: "high"},
        //     {title: "CSS", isDone: true, priority: "low"},
        //     {title: "React", isDone: false, priority: "high"},
        //     {title: "SaSS", isDone: false, priority: "low"},
        //     {title: "Redux", isDone: false, priority: "medium"}
        // ]
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks={this.tasks} />
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

