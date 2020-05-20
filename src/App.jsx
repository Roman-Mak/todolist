import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListAC, setTodoListsAC} from "./reducer";
import axios from "axios";

class App extends React.Component {
    newTodoListId = 1;

    // addTodoList = (newTodoListName) => {
    //     let newTodoList = {id: this.newTodoListId, title: newTodoListName, tasks: []};
    //     this.newTodoListId++;
    //     this.props.addTodoList(newTodoList);
    //     // this.setState({todoLists: [...this.state.todoLists, newTodoList]}, this.saveState);
    // };

    addTodoList = (newTodoListName) => {
        axios.post(
            "https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: newTodoListName},
            {
                withCredentials: true,
                headers: {"API-KEY": "cd6b66cc-d0ef-4fb7-9f54-808df7c15bee"}
            }
        )
            .then(res => {
                if (res.data.resultCode === 0) {
                    let todoList = res.data.data.item;
                    this.props.addTodoList(todoList);
                }
            })
    };

    // saveState = () => {
    //     localStorage.setItem("todoLists-state", JSON.stringify(this.state));
    // };

    // restoreState = () => {
    //     let state = this.state;
    //     let stateAsString = localStorage.getItem("todoLists-state");
    //     if (stateAsString) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state, () => {
    //         this.state.todoLists.forEach(t => {
    //             if (t.id >= this.newTaskId) {
    //                 this.newTodoListId = t.id + 1;
    //             }
    //         })
    //     });
    // };

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodoLists(res.data);
            });
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        let todoLists = this.props.todoLists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
        });
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            dispatch(addTodoListAC(newTodoList));
        },
        setTodoLists: (todoLists) => {
            dispatch(setTodoListsAC(todoLists))
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

