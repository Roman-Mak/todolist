import React from "react";
import LoginModal from "../common/LoginModal/LoginModal";
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
            {!isAuth && <LoginModal email={"free@samuraijs.com"} password={"free"}/>}
            <div className="header">
                {isAuth && <button onClick={onUserLogoutClick}>Log out</button>}
            </div>
        </>
    )
};

export default Header;