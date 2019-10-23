import instance from '@/services/AxiosService';

class MatchService {

    findAll() {
        return instance.get("/v1/common/get/match").then(response => response.data);
    }


}
const matchService = new MatchService();
export default matchService;