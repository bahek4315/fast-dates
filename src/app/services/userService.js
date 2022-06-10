import httpService from './httpService';

const userEndPoint = 'user/';

const UserService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    }
};
export default UserService;
