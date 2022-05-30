import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import TextField from '../common/form/textField';

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (event) => {
        setData((prevState) => ({
            ...prevState,
            [event.name]: event.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Электронная почта введена неверно'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль не содержит заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль не содержит цифру'
            },
            min: {
                message: 'Пароль должен быть больше 8 символов',
                value: 8
            }
        }
    };

    return (
        <>
            <h3 className="mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors?.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors?.password}
                />
                <CheckBoxField
                    value={data.stayOn}
                    onChange={handleChange}
                    name="stayOn"
                >
                    <p>Оставаться в системе</p>
                </CheckBoxField>
                <button
                    className="btn btn-primary w-100 mb-4 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default LoginForm;
