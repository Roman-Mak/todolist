import React, {ChangeEvent, KeyboardEvent} from "react";

type StateType = {
    error: boolean;
    item: string;
}

type OwnPropsType = {
    addItem: (title: string) => void;
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {
    state: StateType = {
        error: false,
        item: ""
    };

    onAddItemClick = () => {
        let newItem = this.state.item;
        this.setState({item: ""});
        if (newItem === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addItem(newItem);
        }
    };

    onItemChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            item: e.currentTarget.value
        });
    };

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };

    render = () => {

        let inputClass = this.state.error ? "error" : "";

        return (
                <div className="addNewTaskForm">
                    <input className={inputClass}
                           type="text"
                           placeholder="New item name"
                           onChange={this.onItemChanged}
                           onKeyPress={this.onKeyPress}
                           value={this.state.item}
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
        );
    };
}

export default AddNewItemForm;