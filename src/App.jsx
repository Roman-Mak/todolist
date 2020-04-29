import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
    state = {
        todoLists: []
    };
    newTodoListId = 0;

    addTodoList = (newTodoListName) => {
        let newTodoList = {id: this.newTodoListId, title: newTodoListName};
        this.newTaskId++;
        this.setState({todoLists: [...this.state.todoLists, newTodoList]}, this.saveState);
    };

    saveState = () => {
        localStorage.setItem("todoLists-state", JSON.stringify(this.state));
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem("todoLists-state");
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todoLists.forEach(t => {
                if (t.id >= this.newTaskId) {
                    this.newTodoListId = t.id + 1;
                }
            })
        });
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        let todoLists = this.state.todoLists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title}/>
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

export default App;

