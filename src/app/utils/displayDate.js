export function displayDate(data) {
    const date = new Date(data);
    const dateNow = new Date();

    const yearDiff = dateNow.getFullYear() - date.getFullYear();
    if (yearDiff === 0) {
        const dayDiff = dateNow.getDate() - date.getDate();
        if (dayDiff === 0) {
            const hourDiff = dateNow.getHours() - date.getHours();
            if (hourDiff === 0) {
                const minuteDiff = dateNow.getMinutes() - date.getMinutes();

                if (minuteDiff >= 0 && minuteDiff < 5) return '1 минуту назад';
                if (minuteDiff >= 5 && minuteDiff < 10) return '5 минут назад';
                if (minuteDiff >= 10 && minuteDiff < 30) {
                    return '10 минут назад';
                }
                return '30 минут назад';
            }
            if (date.getHours() < 10) {
                if (date.getMinutes() < 10) {
                    return `0${date.getHours()}:0${date.getMinutes()}`;
                } else {
                    return `0${date.getHours()}:${date.getMinutes()}`;
                }
            } else {
                if (date.getMinutes() < 10) {
                    return `${date.getHours()}:0${date.getMinutes()}`;
                } else {
                    return `${date.getHours()}:${date.getMinutes()}`;
                }
            }
        }
        return `${date.getDate()} ${date.toLocaleString('default', {
            month: 'long'
        })}`;
    }
    if (date.getDate() < 10) {
        return (
            '0' +
            date.getDate() +
            '.' +
            (date.getMonth() + 1) +
            '.' +
            date.getFullYear()
        );
    } else {
        return (
            date.getDate() +
            '.' +
            (date.getMonth() + 1) +
            '.' +
            date.getFullYear()
        );
    }
}
