import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoLists} from "./reducer";

class App extends React.Component {
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
                <div className="todoLists">
                    {todoLists}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTodoList: (newTodoList) => {
//             dispatch(addTodoList(newTodoList));
//         },
//         getTodoLists: () => {
//             const thunk = getTodoLists();
//             dispatch(thunk);
//         }
//     }
// };

const ConnectedApp = connect(mapStateToProps, {addTodoList, getTodoLists})(App);
export default ConnectedApp;

