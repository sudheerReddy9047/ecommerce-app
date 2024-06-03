import React, { useState } from 'react';

import { HashRouter, } from 'react-router-dom';
import { Route, Routes } from 'react-router';

import Login from './../Login/login';
import Register from '../register/register';
import Dashboard from '../dashboard/dashboard';
import PageNotFound from '../pageNotFound/pageNotFound';

import NavBar from '../NavBar/NavBar';

import { UserContext } from './../userContext';

const App = () => {
    const [user, setuser] = useState({
        isLoggedin: false,
        info: null
    });
    return (
        <UserContext.Provider value={{ user, setuser }}>
            <HashRouter>
                <NavBar></NavBar>
                <div className='container-fluid'></div>
                <Routes>
                    <Route path='/' exact={true} element={<Login></Login>}></Route>
                    <Route path='/register' exact={true} element={<Register></Register>}></Route>
                    <Route path='/dashboard' exact={true} element={<Dashboard></Dashboard>}></Route>
                    <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
                </Routes>
            </HashRouter>
        </UserContext.Provider>
    )
}

export default App;