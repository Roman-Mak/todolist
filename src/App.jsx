import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.newTaskTitleRef = React.createRef();
    };

    //     setTimeout(() => {
    //         let newTask = {title: "GovnoCode", isDone: true, priority: "super high"};
    //         let newTasks = [...this.state.tasks, newTask];
    //         // this.state.tasks.push()
    //         this.setState({
    //             tasks: newTasks
    //         })
    //     }, 2000);

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "high"},
            {title: "CSS", isDone: true, priority: "low"},
            {title: "React", isDone: false, priority: "high"},
            {title: "SaSS", isDone: false, priority: "low"},
            {title: "Redux", isDone: false, priority: "medium"}
        ],
        filterValue: "All"
    };

    addTask = (newTitle) => {
        // let newTitle = this.newTaskTitleRef.current.value;
        // this.newTaskTitleRef.current.value = "";
        let newTask = {
            title: newTitle,
            isDone: true,
            priority: "super high"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if(t!== task) {
                return t;
            } else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({
            tasks: newTasks
        });
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={this.state.tasks.filter(task => {
                        if (this.state.filterValue === "All") {
                            return true;
                        } else if (this.state.filterValue === "Completed") {
                            return task.isDone === true;
                        } else if (this.state.filterValue === "Active") {
                            return task.isDone === false;
                        }
                    })}
                                   changeStatus={this.changeStatus}
                    />
                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    };
}

export default App;

