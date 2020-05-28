import React from "react";

class TodoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.props.changeTodoListTitle(this.state.title);
        this.setState({editMode: false})
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    render = () => {
        return (
            <>
                {
                    this.state.editMode
                        ? <input value={this.state.title}
                                 autoFocus={true}
                                 onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                        />
                        : <h3 className="todoList-header__title" onClick={this.activateEditMode}>{this.state.title}</h3>
                }
            </>
        );
    };
}

export default TodoListTitle;