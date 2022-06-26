import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import { useProfessions } from '../../../hooks/useProfessions';
import { useQualities } from '../../../hooks/useQualities';
import { useAuth } from '../../../hooks/useAuth';

const UserEditPage = () => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const [userInfo, setUserInfo] = useState({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex
    });

    const { professions, isLoading: professionsLoading } = useProfessions();
    const { qualities, isLoading: qualitiesLoading } = useQualities();

    console.log(currentUser);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        history.goBack();
    };

    if (professionsLoading && qualitiesLoading) {
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
