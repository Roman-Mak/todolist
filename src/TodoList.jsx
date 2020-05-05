import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All"
    };
    newTaskId = 0;

    // componentDidMount() {
    //     this.restoreState();
    // };
    //
    // saveState = () => {
    //     localStorage.setItem("our-state-" + this.props.id, JSON.stringify(this.state));
    // };
    //
    // restoreState = () => {
    //     // let state = this.state;
    //     let state = {
    //         tasks: [],
    //         filterValue: "All"
    //     };
    //     let stateAsString = localStorage.getItem("our-state-" + this.props.id);
    //     if (stateAsString) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state, () => {
    //         this.state.tasks.forEach(task => {
    //             if (task.id >= this.newTaskId) {
    //                 this.newTaskId = task.id + 1;
    //             }
    //         })
    //     });
    // };

    addTask = (newTitle) => {
        let newTask = {id: this.newTaskId, title: newTitle, isDone: false, priority: "medium"};
        this.newTaskId++;
        this.props.addTask(this.props.id, newTask);
        // this.setState({tasks: [...this.state.tasks, newTask]}, this.saveState);
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };

    taskFilter = () => {
        return this.props.tasks.filter(t => {
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
        this.props.changeTask(this.props.id, taskId, {isDone: isDone});
    };

    changeTitle = (taskId, title) => {
        this.props.changeTask(this.props.id, taskId, {title: title});
    };

    // changeTask = (taskId, obj) => {
    //     let newTasks = this.props.tasks.map(t => {
    //         if (t.id === taskId) {
    //             return {...t, ...obj};
    //         } else {
    //             return t;
    //         }
    //     });
    //     // this.setState({tasks: newTasks}, this.saveState)
    //     this.props.changeTask(taskId, newTasks)
    // };
    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    };

    render = () => {
        return (
            <div className="todoList">
                <div className={"todoList-header"}>
                    <div style={{display: "flex"}}>
                        <TodoListTitle title={this.props.title}/>
                        <button className="delete-item" onClick={this.deleteTodoList}>x</button>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks tasks={this.taskFilter()} changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todoListId, newTask) => {
            const action = {
                type: "ADD-TASK",
                todoListId: todoListId,
                newTask: newTask
            };
            dispatch(action);
        },
        changeTask: (todoListId, taskId, newObj) => {
            const action = {
                type: "CHANGE-TASK",
                todoListId: todoListId,
                taskId: taskId,
                obj: newObj
            };
            dispatch(action);
        },
        deleteTodoList: (todoListId) => {
            const action = {
                type: "DELETE-TODOLIST",
                todoListId: todoListId,
            };
            dispatch(action)
        },
        deleteTask: (todoListId, taskId) => {
            const action = {
                type: "DELETE-TASK",
                todoListId: todoListId,
                taskId: taskId
            };
            dispatch(action)
        }
    }
};
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;

