import React, { useState } from 'react';
const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const handleChange = (event) => {
        setData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };
    return (
        <>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
            </form>
        </>
    );
};

export default Login;
