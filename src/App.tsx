import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoLists} from "./redux/todoListReducer";
import TodoListsPreloader from "./common/TodoListsPreloader";
import {AppStateType} from "./redux/store";
import {TodoType} from "./types/enities";

type MapDispatchToPropsType = {
    getTodoLists: () => void;
    addTodoList: (title: string) => void;
}

type MapStateToPropsType = {
    todoLists: Array<TodoType>
}

class App extends React.Component<MapDispatchToPropsType & MapStateToPropsType> {
    componentDidMount() {
        this.props.getTodoLists();
    }

    render = () => {
        let todoLists = this.props.todoLists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
        });
        return (
            <div className="App">
                <div className="headItemForm">
                    <span className="createTodoText">Create new TodoList</span>
                    <AddNewItemForm addItem={this.props.addTodoList}/>
                </div>
                {
                    this.props.todoLists.length === 0
                    ? <TodoListsPreloader/>
                    : <div className="todoLists">{todoLists}</div>
                }
            </div>
        );
    };
}

const mapStateToProps = (state: AppStateType) => {
    return {
        todoLists: state.todoLists.todoLists
    }
};

const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {addTodoList, getTodoLists})(App);
export default ConnectedApp;

