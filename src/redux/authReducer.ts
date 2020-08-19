import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SET_USER_LOGIN_DATA = "todoList/authReducer/SET-USER-LOGIN-DATA";
const TOGGLE_IS_AUTH = "todoList/authReducer/TOGGLE-IS-AUTH";
const AUTH_FETCHING = "todoList/authReducer/AUTH-FETCHING";

let initialState = {
    userId: "",
    email: "",
    login: "",
    isAuth: false,
    isAuthFetching: false
};

type InitialStateType = typeof initialState;

const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_LOGIN_DATA:
            return {...state, ...action.payload};
        case TOGGLE_IS_AUTH :
            return {...state, isAuth: action.isAuth};
        case AUTH_FETCHING:
            return {...state, isAuthFetching: action.isAuthFetching};
        default:
            return state;
    }
};

type AuthActionType = SetUserLoginDataType | ToggleIsAuthType | AuthFetchingType;

type SetUserLoginDataType = {type: typeof SET_USER_LOGIN_DATA; payload: {userId :string; email: string; login: string}};
export const setUserLoginData = (userId: string, email: string, login: string): SetUserLoginDataType => ({
    type: SET_USER_LOGIN_DATA,
    payload: {userId, email, login}
});

type ToggleIsAuthType = {type: typeof TOGGLE_IS_AUTH; isAuth: boolean}
export const toggleIsAuth = (isAuth: boolean): ToggleIsAuthType => ({type: TOGGLE_IS_AUTH, isAuth});

type AuthFetchingType = {type: typeof AUTH_FETCHING; isAuthFetching: boolean};
const authFetching = (isAuthFetching: boolean): AuthFetchingType => ({type: AUTH_FETCHING, isAuthFetching});


export const getUserLoginData = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> =>
    async (dispatch) => {
    dispatch(authFetching(true));
    try {
        const data = await authAPI.authMe();
        if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setUserLoginData(id, email, login));
                dispatch(toggleIsAuth(true));
                dispatch(authFetching(false));
        } else if (data.messages[0] === "You are not authorized") {
            dispatch(authFetching(false));
        }
    }
    catch (e) {
        dispatch(authFetching(false));
    }
};

export const userLogin = (email: string, password: string, rememberMe: boolean): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> =>
    async (dispatch) => {
    dispatch(authFetching(true));
    try {
        const data = await authAPI.authLogin(email, password, rememberMe);
        if (data.resultCode === 0) {
            // await dispatch(getUserLoginData())
            let {id, email, login} = data.data;
            dispatch(setUserLoginData(id, email, login));
            dispatch(toggleIsAuth(true));
            dispatch(authFetching(false));
        }
    }
    catch (e) {
        dispatch(authFetching(false));
    }
};
export const userLogout = () => async (dispatch: Dispatch<AuthActionType>) => {
    const data = await authAPI.authLogout();
    if (data.resultCode === 0) {
        dispatch(setUserLoginData("", "", ""));
        dispatch(toggleIsAuth(false));
    }
};

export default authReducer;