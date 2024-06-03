import React, { useState } from 'react';

const Login = () => {

    let [email, setEmail] = useState("scott@gmail.com");
    let [password, setPassword] = useState("Qaz");





    return (
        <div className='row mx-0'>
            <div className='col-lg-5 col-md-7 mx-auto'>
                <div className='card border-success shadow-lg my-2'>
                    <div className='card-header border-bottom border-success text-center'>Login</div>
                    <div className='card-body border-bottom border-success'>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className='card-footer text-center'>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
