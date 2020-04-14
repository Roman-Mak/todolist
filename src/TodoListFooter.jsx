import React from "react";

class TodoListFooter extends React.Component {

    state = {
        isHidden: false
    };

    onHideFilterClick = () => {this.setState({isHidden: true})};
    onShowFilterClick = () => {this.setState({isHidden: false})};
    onAllFilterClick = () => {this.props.changeFilter("All")};
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")};
    onActiveFilterClick = () => {this.props.changeFilter("Active")};

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                </div>}
                {!this.state.isHidden && <span onClick={this.onHideFilterClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFilterClick}>show</span>}
            </div>
        )
    }
}

export default TodoListFooter;