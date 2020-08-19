import React from "react";
import "./App.css";
import {connect} from "react-redux";
import TodoListsPreloader from "./common/TodoListsPreloader";
import {AppStateType} from "./redux/store";
import Header from './components/Header';
import {getUserLoginData, userLogout} from "./redux/authReducer";
import TodoLists from "./components/TodoLists";
import LoginModal from "./common/LoginModal/LoginModal";

type MapDispatchToPropsType = {
    getUserLoginData: () => void;
    userLogout: () => void;
};

type MapStateToPropsType = {
    isAuth: boolean;
    isAuthFetching: boolean;
};

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUserLoginData();
    }

    render = () => {
        if (this.props.isAuthFetching) {
            return <div className="app-container"><TodoListsPreloader/></div>
        }
        return (
            <div className="App">
                {!this.props.isAuth && <LoginModal email={"free@samuraijs.com"} password={"free"}
                                                   isAuthFetching={this.props.isAuthFetching}/>}
                <Header isAuth={this.props.isAuth} userLogout={this.props.userLogout}/>
                <TodoLists/>
            </div>
        );
    };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        isAuthFetching: state.auth.isAuthFetching
    }
};

const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {getUserLoginData, userLogout})(App);
export default ConnectedApp;

