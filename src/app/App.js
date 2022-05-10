import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import Login from './layouts/login';
import Users from './layouts/users';
import NavBar from './components/navBar';
import UserPage from './components/userPage';
import NotFound from './layouts/notFound';

function App() {
    // return <Users />;
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/:userId?" component={UserPage} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default App;
