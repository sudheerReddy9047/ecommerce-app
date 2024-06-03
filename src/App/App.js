import React from 'react';
import 'jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/css/bootstrap.css';

import { HashRouter, } from 'react-router-dom';
import { Route, Routes } from 'react-router';

import Login from './../Login/login';
import Register from '../register/register';
import Dashboard from '../dashboard/dashboard';
import PageNotFound from '../pageNotFound/pageNotFound';

import NavBar from '../NavBar/NavBar';

const App = () => {
    return (
        <HashRouter>
            <NavBar>    </NavBar>
            <div className='container-fluid'></div>
            <Routes>
                <Route path='/' exact={true} element={<Login></Login>}></Route>
                <Route path='/register' exact={true} element={<Register></Register>}></Route>
                <Route path='/dashboard' exact={true} element={<Dashboard></Dashboard>}></Route>
                <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
        </HashRouter>
    )
}

export default App;