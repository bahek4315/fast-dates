import React from 'react';
import Users from './components/users';
import { Switch, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import Login from './components/login';
import NavBar from './components/navBar';
import Test from './components/textUser';

function App() {
    // return <Users />;
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/:userId?" component={Test} />
            </Switch>
        </>
    );
}

export default App;
