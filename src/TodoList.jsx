import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodoListAC, setTasksAC} from "./reducer";
import axios from "axios"

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        axios.get(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
            }
        )
            .then(res => {
                if (!res.data.error) {
                    let tasks = res.data.items;
                    this.props.setTasks(this.props.id, tasks);
                }
            })
    };

    addTask = (newTitle) => {
        axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
            }
        )
            .then(res => {
                if (res.data.resultCode === 0) {
                    let task = res.data.data.item;
                    this.props.addTask(task);
                }
            })
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };

    taskFilter = (tasks) => {
        return tasks.filter(t => {
            if (this.state.filterValue === "All") {
                return true;
            } else if (this.state.filterValue === "Completed") {
                return t.status === 2;
            } else if (this.state.filterValue === "Active") {
                return t.status === 0;
            }
        });
    };

    changeStatus = (task, status) => {
        this.changeTask(task, {status});
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title});
    };

    changeTask = (task, obj) => {
        let newTask = {...task, ...obj};
        axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            newTask,
            {
                withCredentials: true,
                headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
            }
        )
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.changeTask(res.data.data.item)
                }
            })
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
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
            }
        )
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTodoList(this.props.id)
                }
            })
    };

    deleteTask = (taskId) => {
        axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
            }
        )
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId);
                }
            });
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className={"todoList-header"}>
                    <div style={{display: "flex"}}>
                        <TodoListTitle title={this.props.title}/>
                        <button className="delete-item" onClick={this.deleteTodoList}>x</button>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks tasks={this.taskFilter(tasks)} changeStatus={this.changeStatus}
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
        addTask: (newTask) => {
            dispatch(addTaskAC(newTask));
        },
        changeTask: (task) => {
            dispatch(changeTaskAC(task));
        },
        deleteTodoList: (todoListId) => {
            dispatch(deleteTodoListAC(todoListId))
        },
        deleteTask: (todoListId, taskId) => {
            dispatch(deleteTaskAC(todoListId, taskId));
        },
        setTasks: (todoListId, tasks) => dispatch(setTasksAC(todoListId, tasks))
    }
};
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;

