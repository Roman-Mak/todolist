import React from "react";
import {useDispatch} from "react-redux";

type PropsType = {
    isAuth: boolean;
    userLogout: () => void;
};

const Header = ({isAuth, userLogout}: PropsType) => {
    const dispatch = useDispatch();
    const onUserLogoutClick = () => {
        dispatch(userLogout);
    };
    return (
        <>
            <div className="header">
                {isAuth && <button onClick={onUserLogoutClick}>Log out</button>}
            </div>
        </>
    )
};

export default Header;