import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {asyncActions} from "../features/Application/";
import {Route, Routes} from "react-router-dom";
import {authActions, Login} from "../features/Auth/";
import {appSelectors} from "./";
import {authSelectors} from "../features/Auth";
import {useActions} from "../utils/redux-utils";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector(appSelectors.selectStatus)
    const isInitialized = useSelector(appSelectors.selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(asyncActions)
    console.log(1212)
    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [demo, initializeApp])

    const logoutHandler = useCallback(() => {
        logout()
    }, [logout])

    if (!isInitialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App
