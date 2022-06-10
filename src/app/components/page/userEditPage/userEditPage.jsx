import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../../api';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';

const UserEditPage = () => {
    const params = useParams();
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        profession: {},
        sex: ''
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(params.userId).then((data) => setUserInfo(data));
        api.qualities
            .fetchAll()
            .then((data) => {
                const qualitiesList = Object.keys(data).map((optionName) => ({
                    label: data[optionName].name,
                    value: data[optionName]._id,
                    color: data[optionName].color
                }));
                setQualities(qualitiesList);
            })
            .finally(() => setIsLoading(false));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
    }, []);
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
    const getFromQualities = (elements) => {
        if (elements) {
            const qualitiesArray = [];
            for (const elem of elements) {
                for (const quality in qualities) {
                    if (elem._id === qualities[quality].value) {
                        qualitiesArray.push({
                            value: elem._id,
                            label: elem.name,
                            color: elem.color
                        });
                    }
                }
            }
            return qualitiesArray;
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...userInfo,
            qualities: getQualities(userInfo.qualities),
            profession: getProfessionById(userInfo.profession)
        };
        api.users.update(userInfo._id, submitData);
        history.goBack();
    };

    if (isLoading) {
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
                    />
                    <TextField
                        label="Измените почту"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Измените профессию"
                        value={userInfo.profession.name}
                        onChange={handleChange}
                        defaultOption="Профессия..."
                        options={professions}
                        name="profession"
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
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={getFromQualities(userInfo.qualities)}
                        name="qualities"
                        label="Измените качества"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto mb-4"
                        type="submit"
                    >
                        Сохранить изменения
                    </button>
                </form>
            </>
        );
    }
};

export default UserEditPage;
