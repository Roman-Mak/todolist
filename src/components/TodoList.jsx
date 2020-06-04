import React from 'react';
import '../App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTask, changeTodoListTitle, deleteTask, deleteTodoList, getTasks} from "../redux/todoListReducer";

class TodoList extends React.Component {
    state = {
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreState();
    };
    restoreState = () => {
        this.props.getTasks(this.props.id);
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id);
    };
    changeTodoListTitle = (newTitle) => {
        this.props.changeTodoListTitle(this.props.id, newTitle);
    };

    addTask = (newTitle) => {
        this.props.addTask(newTitle, this.props.id)
    };
    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId);
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
    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };
    changeStatus = (task, status) => {
        this.props.changeTask(task, {status});
    };
    changeTitle = (task, title) => {
        this.props.changeTask(task, {title});
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className={"todoList-header"}>
                    <div style={{display: "flex"}}>
                        <TodoListTitle title={this.props.title} changeTodoListTitle={this.changeTodoListTitle}/>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getTasks: (todoListId) => {
//             dispatch(getTasks(todoListId))
//         },
//         addTask: (newTask, todoListId) => {
//             dispatch(addTask(newTask, todoListId));
//         },
//         changeTask: (task, obj) => {
//             dispatch(changeTask(task, obj));
//         },
//         deleteTodoList: (todoListId) => {
//             dispatch(deleteTodoList(todoListId))
//         },
//         deleteTask: (todoListId, taskId) => {
//             dispatch(deleteTask(todoListId, taskId));
//         },
//         changeTodoListTitle: (todoListId, newTitle) => dispatch(changeTodoListTitle(todoListId, newTitle))
//     }
// };
const ConnectedTodoList = connect(null, {getTasks, addTask, changeTask, deleteTask,
    changeTodoListTitle, deleteTodoList})(TodoList);

export default ConnectedTodoList;

