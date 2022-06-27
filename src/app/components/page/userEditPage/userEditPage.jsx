import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import { useProfessions } from '../../../hooks/useProfessions';
import { useQualities } from '../../../hooks/useQualities';
import { useAuth } from '../../../hooks/useAuth';
import { validator } from '../../../utils/validator';

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { currentUser, updateUserData } = useAuth();
    const { professions } = useProfessions();
    const { qualities, getQuality } = useQualities();

    const [userInfo, setUserInfo] = useState({
        _id: userId,
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: currentUser.qualities.map((q) => getQuality(q))
    });

    const handleChange = (event) => {
        if (event?.target?.name === 'profession') {
            setUserInfo((prevState) => ({
                ...prevState,
                [event.target.name]: {
                    _id: event.target.value,
                    name: professions.find(
                        (prof) => prof.value === event.target.value
                    ).label
                }
            }));
        } else {
            setUserInfo((prevState) => ({
                ...prevState,
                [event.name]: event.value
            }));
        }
    };

    const transformProfessionsToRender = (arr) => {
        return arr.map((item) => {
            return { label: item.name, value: item._id };
        });
    };

    const transformQualitiesToRender = (arr) => {
        return arr.map((item) => {
            return { label: item.name, value: item._id, color: item.color };
        });
    };

    const getFromQualities = (elements) => {
        if (elements) {
            return transformQualitiesToRender(elements);
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
        profession: {
            isRequired: {
                message: 'Обязательно выберите профессию'
            }
        },
        qualities: {
            isRequired: {
                message: 'Обязательно выберите качества'
            }
        }
    };

    const validate = () => {
        const errors = validator(userInfo, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...userInfo,
            qualities: userInfo.qualities.map((q) => q.value)
        };
        console.log(newData);
        try {
            await updateUserData(newData);
            history.push('/');
        } catch (error) {
            console.log(error);
            setErrors(error);
        } finally {
            history.goBack();
        }
    };

    if (!userInfo.profession && !userInfo.qualities) {
        return <p>loading...</p>;
    } else {
        return (
            <>
                <button
                    className="btn btn-primary mt-4 mx-4"
                    onClick={() => history.goBack()}
                >
                    Назад
                </button>
                <form
                    className="container justify-content-center mt-4 shadow p-3"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Измените имя"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        error={errors?.name}
                    />
                    <TextField
                        label="Измените почту"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        error={errors?.email}
                    />
                    <SelectField
                        label="Измените профессию"
                        value={userInfo.profession}
                        onChange={handleChange}
                        defaultOption="Профессия..."
                        options={transformProfessionsToRender(professions)}
                        name="profession"
                        error={errors?.profession}
                    />
                    <RadioField
                        options={[
                            { name: 'Мужской', value: 'male' },
                            { name: 'Женский', value: 'female' },
                            { name: 'Иной', value: 'other' }
                        ]}
                        name="sex"
                        value={userInfo.sex}
                        onChange={handleChange}
                        label="Измените пол"
                    />
                    <MultiSelectField
                        options={transformQualitiesToRender(qualities)}
                        onChange={handleChange}
                        defaultValue={getFromQualities(userInfo.qualities)}
                        name="qualities"
                        label="Измените качества"
                        error={errors?.qualities}
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto mb-4"
                        type="submit"
                        disabled={!isValid}
                    >
                        Сохранить изменения
                    </button>
                </form>
            </>
        );
    }
};

export default UserEditPage;
