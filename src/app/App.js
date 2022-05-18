import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import Login from './layouts/login';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import NotFound from './layouts/notFound';

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:isEdit?" component={Users} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default App;
