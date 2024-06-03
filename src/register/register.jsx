import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    let [userInfo, setuserInfo] = useState({
        "email": "",
        "password": "",
        "fullName": "",
        "dateOfBirth": "",
        "gender": "",
        "country": "",
        "recieveNewsLetters": null
    });

    let [dirty, setdirty] = useState({
        "email": false,
        "password": false,
        "fullName": false,
        "dateOfBirth": false,
        "gender": false,
        "country": false,
        "recieveNewsLetters": false
    });

    const navigate = useNavigate();

    let [errors, setErrors] = useState({
        "email": [],
        "password": [],
        "fullName": [],
        "dateOfBirth": [],
        "gender": [],
        "country": [],
        "recieveNewsLetters": [],
    });

    const validate = () => {
        const errors = {};
        if (!userInfo.email) {
            errors['email'] = ['Email is required'];
        } else if (!userInfo.email.includes('@')) {
            errors['email'] = ['Email is should contain "@"'];
        }

        if (dirty.password) {
            const password = userInfo.password;
            if (!password) {
                errors['password'] = ['Password is required'];
            } else {
                if (password.length < 8) {
                    errors['password'] ??= [];
                    errors['password'].push('Password should be more than or equals to 8 characters in length.');
                }
                if (!/[A-Z]/.test(password)) {
                    errors['password'] ??= [];
                    errors['password'].push('Password should contain one uppercase letter.');
                }
                if (!/[a-z]/.test(password)) {
                    errors['password'] ??= [];
                    errors['password'].push('Password should contain one uppercase letter.');
                }
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                    errors['password'] ??= [];
                    errors['password'].push('Password should contain one special character.');
                }
            }
        }
        setErrors(errors);
        setisValid(Object.keys(errors).length);
    }

    let [isValid, setisValid] = useState(false);

    useEffect(validate, [userInfo, dirty]);

    const registerUser = () => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.ok) {
                navigate('/')
            }
        })
    }

    return (
        <div className='row mx-0 mt-2'>
            <div className='col-lg-5 col-md-9 m-auto'>
                <div className='card'>
                    <div className='card-header border-bottom border-success'>
                        <div className='text-center'>Register User</div>
                        {
                            isValid ? <ul className='text-danger'>
                                {(Object.values(errors)).flat(1).map((err, ind) => <li key={ind}>{err}</li>)}
                            </ul> : ''
                        }
                    </div>
                    <div className='card-body border-bottom border-success'>
                        <div className='form-group form-row'>
                            <label className="col-lg-4" htmlFor='email'>Email</label>
                            <input id='email' className='form-control col-lg-8' type='text'
                                value={userInfo.email} onChange={(e) => setuserInfo({ ...userInfo, email: e.target.value })} />

                        </div>
                        <div className='form-group form-row'>
                            <label className="col-lg-4" htmlFor='password'>Password</label>
                            <input id='password' className='form-control col-lg-8' type='password' value={userInfo.password} onChange={(e) => {
                                setdirty({ ...dirty, password: true })
                                setuserInfo({ ...userInfo, password: e.target.value });
                            }} />
                        </div>
                        <div className='form-group form-row'>
                            <label className="col-lg-4" htmlFor='fullName'>FullName</label>
                            <input id='fullName' className='form-control col-lg-8' type='text' value={userInfo.fullName} onChange={(e) => setuserInfo({ ...userInfo, fullName: e.target.value })} />
                        </div>
                        <div className='form-group form-row'>
                            <label className="col-lg-4" htmlFor='dateOfBirth'>Date of Birth</label>
                            <input id='dateOfBirth' className='form-control col-lg-8' type='date' value={userInfo.dateOfBirth} onChange={(e) => setuserInfo({ ...userInfo, dateOfBirth: e.target.value })} />
                        </div>
                        <div className='form-group form-row'>
                            <label className="col-lg-4" htmlFor='gender'>Gender</label>
                            <select id='gender' className='form-control col-lg-8' value={userInfo.gender} onChange={(e) => setuserInfo({ ...userInfo, gender: e.target.value })} >
                                <option value="" disabled>Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='form-group form-row'>
                            <label className="col-lg-4" htmlFor='country'>Country</label>
                            <input id='country' className='form-control col-lg-8' type='text' value={userInfo.country} onChange={(e) => setuserInfo({ ...userInfo, country: e.target.value })} />
                        </div>
                        <div className='form-group form-row'>
                            <input id='recieveNewsLetters' className='mr-2' type='checkbox' checked={userInfo.recieveNewsLetters} onChange={(e) => setuserInfo({ ...userInfo, recieveNewsLetters: e.target.checked })} />
                            <label className="col-lg-4" htmlFor='recieveNewsLetters'>Recieve News Letters</label>
                        </div>
                    </div>
                    <div className='card-footer border-bottom border-success'>
                        <button className='btn btn-primary' onClick={registerUser} disabled={isValid}> Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
