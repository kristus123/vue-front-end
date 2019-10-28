import instance from '@/services/AxiosService';

class MatchPositionService {

    findAll() {
        return instance.get("/v1/common/get/matchposition").then(response => response.data).catch(error => error.response);
    }

    create(matchPositionObject) {
        return instance.post("/v1/admin/post/matchPosition", matchPositionObject).then(response => response);
    }

}

const matchPositionService = new MatchPositionService();
export default matchPositionService;