import React from 'react';
import '../App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTask, changeTodoListTitle, deleteTask, deleteTodoList, getTasks} from "../redux/todoListReducer";
import {TaskType, UpdateTaskType} from "../types/enities";
import {AppStateType} from "../redux/store";
import DeleteButton from "../common/DeleteButton";

type StateType = {
    filterValue: FilterValueType;
};

export type FilterValueType = "All" | "Completed" | "Active";

type OwnPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    tasksIsFetching: boolean;
};

type MapDispatchToPropsType = {
    getTasks: (id: string) => void;
    deleteTodoList: (id: string) => void;
    changeTodoListTitle: (id: string, title: string) => void;
    addTask: (id: string, title: string) => void;
    deleteTask: (todoId: string, taskId: string) => void;
    changeTask: (task: TaskType, obj: UpdateTaskType) => void;
};

type PropsType = MapDispatchToPropsType & OwnPropsType;

class TodoList extends React.Component<PropsType, StateType> {
    state: StateType = {
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
    changeTodoListTitle = (newTitle: string) => {
        this.props.changeTodoListTitle(this.props.id, newTitle);
    };

    addTask = (newTitle: string) => {
        this.props.addTask(this.props.id, newTitle)
    };
    deleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId);
    };
    taskFilter = (tasks: Array<TaskType>) => {
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
    changeFilter = (newFilterValue: FilterValueType) => {
        this.setState({filterValue: newFilterValue})
    };
    changeStatus = (task: TaskType, status: number) => {
        this.props.changeTask(task, {status});
    };
    changeTitle = (task: TaskType, title: string) => {
        this.props.changeTask(task, {title});
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div style={{display: "flex", marginBottom: "15px"}}>
                        <TodoListTitle title={this.props.title} changeTodoListTitle={this.changeTodoListTitle}/>
                        <DeleteButton onClick={this.deleteTodoList}/>
                    </div>
                    <AddNewItemForm addItem={this.addTask} placeholder={"new task"}
                                    isFetching={this.props.tasksIsFetching}/>
                </div>
                <TodoListTasks tasks={this.taskFilter(tasks)}
                               changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasksIsFetching={this.props.tasksIsFetching}
                />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    };
}

const ConnectedTodoList = connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>
(null, {getTasks, addTask, changeTask, deleteTask,
    changeTodoListTitle, deleteTodoList})(TodoList);

export default ConnectedTodoList;

