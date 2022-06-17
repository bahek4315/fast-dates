import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import Login from './layouts/login';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import NotFound from './layouts/notFound';
import { ToastContainer } from 'react-toastify';
import ProfessionProvider from './hooks/useProfessions';
import QualityProvider from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';
import LoginProvider from './hooks/useLogin';

function App() {
    return (
        <>
            <AuthProvider>
                <LoginProvider>
                    <NavBar />
                    <ProfessionProvider>
                        <QualityProvider>
                            <Switch>
                                <Route path="/" exact component={MainPage} />
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:userId?/:isEdit?"
                                    component={Users}
                                />
                                <Route path="/404" component={NotFound} />
                                <Redirect to="/404" />
                            </Switch>
                        </QualityProvider>
                    </ProfessionProvider>
                </LoginProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
