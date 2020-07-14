import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

type DeleteButtonType = {
    onClick: () => void;
};

const DeleteButton = (props: DeleteButtonType) => {
    return (
        <button className="delete-item" onClick={props.onClick}>
            <FontAwesomeIcon icon={faTrash} className="trash-icon"/>
        </button>
    );
};

export default DeleteButton;