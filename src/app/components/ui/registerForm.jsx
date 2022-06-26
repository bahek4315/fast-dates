import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useQualities } from '../../hooks/useQualities';
import { useProfessions } from '../../hooks/useProfessions';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const { signUp } = useAuth();

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        console.log(newData);
        try {
            await signUp(newData);
            history.push('/');
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
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
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            },
            min: {
                message: 'Имя должно состоять минимум из двух букв',
                value: 2
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
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите профессию'
            }
        },
        qualities: {
            isRequired: {
                message: 'Обязательно выберите качества'
            }
        },
        licence: {
            isRequired: {
                message: 'Вы должны подтвердить лицензионное соглашение'
            }
        }
    };

    return (
        <>
            <h3 className="mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors?.email}
                />
                <TextField
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors?.name}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors?.password}
                />
                <SelectField
                    label="Выберите профессию"
                    name="profession"
                    value={data.profession}
                    onChange={handleChange}
                    defaultOption="Профессия..."
                    options={professionsList}
                    error={errors?.profession}
                />
                <RadioField
                    options={[
                        { name: 'Мужской', value: 'male' },
                        { name: 'Женский', value: 'female' },
                        { name: 'Иной', value: 'other' }
                    ]}
                    name="sex"
                    value={data.sex}
                    onChange={handleChange}
                    label="Выберите ваш пол"
                />
                <MultiSelectField
                    options={qualitiesList}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите ваши качества"
                    error={errors?.qualities}
                />
                <CheckBoxField
                    value={data.licence}
                    onChange={handleChange}
                    name="licence"
                    error={errors?.licence}
                >
                    <p>
                        Подтвердите{' '}
                        <a className="link-primary">лицензионное соглашение</a>
                    </p>
                </CheckBoxField>

                <button
                    className="btn btn-primary w-100 mx-auto mb-4"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
