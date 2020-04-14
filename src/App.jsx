import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    state = {
        tasks: [
            // {id: 0, title: "JS", isDone: true, priority: "high"},
            // {id: 1, title: "CSS", isDone: true, priority: "low"},
            // {id: 2, title: "React", isDone: false, priority: "high"},
            // {id: 3, title: "SaSS", isDone: false, priority: "low"},
            // {id: 4, title: "Redux", isDone: false, priority: "medium"}
        ],
        filterValue: "All"
    };
    newTaskId = 0;

    componentDidMount() {
        this.restoreState();
    };

    saveState = () => {
        localStorage.setItem("our-state", JSON.stringify(this.state));
    };

    restoreState = () => {
        // let state = this.state;
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem("our-state");
        if(stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {this.state.tasks.forEach(task => {
            if(task.id >= this.newTaskId) {
                this.newTaskId = task.id + 1;
            }
        })});
    };

    addTask = (newTitle) => {
        let newTask = {id: this.newTaskId, title: newTitle, isDone: false, priority: "medium"};
        this.newTaskId++;
        this.setState({tasks: [...this.state.tasks, newTask]}, this.saveState)
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };

    taskFilter = () => {
        return this.state.tasks.filter(t => {
            if (this.state.filterValue === "All") {
                return true;
            } else if (this.state.filterValue === "Completed") {
                return t.isDone;
            } else if (this.state.filterValue === "Active") {
                return !t.isDone;
            }
        });
    };

    changeStatus = (taskId, isDone) => {
        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id === taskId) {
        //         return {...t, isDone: isDone};
        //     } else {
        //         return t;
        //     }
        // });
        // this.setState({tasks: newTasks});
        this.changeTask(taskId, {isDone : isDone});
    };

    changeTitle = (taskId, title) => {
        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id === taskId) {
        //         return {...t, title: newTitle};
        //     } else {
        //         return t;
        //     }
        // });
        // this.setState({tasks: newTasks})
        this.changeTask(taskId, {title : title});
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, ...obj};
            } else {
                return t;
            }
        });
        this.setState({tasks: newTasks}, this.saveState)
    };

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
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={this.taskFilter()} changeStatus={this.changeStatus} changeTitle={this.changeTitle}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    };
}

export default App;

