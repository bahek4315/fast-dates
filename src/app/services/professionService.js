import httpService from './httpService';

const professionEndPoint = 'profession/';

const ProfessionService = {
    get: async () => {
        const { data } = await httpService.get(professionEndPoint);
        return data;
    }
};
export default ProfessionService;
