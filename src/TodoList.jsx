import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All"
    };
    newTaskId = 0;

    componentDidMount() {
        this.restoreState();
    };

    saveState = () => {
        localStorage.setItem("our-state-" + this.props.id, JSON.stringify(this.state));
    };

    restoreState = () => {
        // let state = this.state;
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem("our-state-" + this.props.id);
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.newTaskId) {
                    this.newTaskId = task.id + 1;
                }
            })
        });
    };

    addTask = (newTitle) => {
        let newTask = {id: this.newTaskId, title: newTitle, isDone: false, priority: "medium"};
        this.newTaskId++;
        this.setState({tasks: [...this.state.tasks, newTask]}, this.saveState);
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
        this.changeTask(taskId, {isDone: isDone});
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
        this.changeTask(taskId, {title: title});
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
        return (
            <div className="todoList">
                <div className={"todoList-header"}>
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks tasks={this.taskFilter()} changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    };
}

export default TodoList;

