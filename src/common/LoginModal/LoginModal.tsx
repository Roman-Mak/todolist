import React, {ChangeEvent, useState} from "react";
import styles from "./LoginModal.module.css";
import {useDispatch} from "react-redux";
import {userLogin} from "../../redux/authReducer";

type LoginModalPropsType = {
    email: string;
    password: string;
};

const LoginModal = (props: LoginModalPropsType) => {
    const [email, setEmail] = useState<string>(props.email);
    const [password, setPassword] = useState<string>(props.password);
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const dispatch = useDispatch();

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    };
    const onRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    };

    const onLoginClick = () => {
        dispatch(userLogin(email, password, rememberMe));
    };

    return (
        <>
            <div className={styles.background}/>
            <div className={styles.modal}>
                <div className={styles.input}>
                    <span>E-mail: </span>
                    <input type={"email"} placeholder={"E-mail"} value={email} onChange={onEmailChange}/>
                </div>
                <div className={styles.input}>
                    <span>Password: </span>
                    <input type={"password"} placeholder={"Password"} value={password} onChange={onPasswordChange}/>
                </div>
                <label className={styles.remember}>
                    <input type={"checkbox"} checked={rememberMe} onChange={onRememberMeChange}/>
                    <span>remember me</span>
                </label>
                <button onClick={onLoginClick}>Login</button>
            </div>
        </>
    )
};

export default LoginModal;