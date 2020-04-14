import React from "react";

class TodoListHeader extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.newTaskTitleRef = React.createRef()
    // }

    state = {
        error: false,
        title: ""
    };

    onAddTaskClick = () => {
        // let newTitle = this.newTaskTitleRef.current.value;
        // this.newTaskTitleRef.current.value = "";
        let newTitle = this.state.title;
        this.setState({title: ""});
        if (newTitle === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addTask(newTitle);
        }
    };

    onTitleChanged = (e) => {
        this.setState({
            error:false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddTaskClick();
        }
    };

    render = () => {

        let inputClass = this.state.error ? "error" : "";

        return (
            <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input className={inputClass}
                                   // ref={this.newTaskTitleRef}
                                   type="text"
                                   placeholder="New task name"
                                   onChange={this.onTitleChanged}
                                   onKeyPress={this.onKeyPress}
                                   value={this.state.title}
                            />
                            <button onClick={this.onAddTaskClick}>Add</button>
                        </div>
                    </div>
        )
    }
}

export default TodoListHeader;