import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

type AddButtonType = {
    onClick: () => void;
    disabled: boolean;
};

const AddButton = (props: AddButtonType) => {
    return (
        <button className="add-item" onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={faPlusSquare} className="plus-icon"/>
        </button>
    );
};

export default React.memo(AddButton);