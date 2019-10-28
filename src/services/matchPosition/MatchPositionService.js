import instance from '@/services/AxiosService';

class MatchPositionService {

    findAll() {
        return instance.get("/v1/common/get/matchposition").then(response => response.data).catch(error => error.response);
    }

    create(matchPositionObject) {
        return instance.post("/v1/admin/post/matchPosition", matchPositionObject).then(response => response);
    }

    findById(matchId, playerId) {
        return instance.get(`/v1/common/get/matchposition/${matchId}/${playerId}`).then(response => response.data).catch(error => error.response);
    }

}

const matchPositionService = new MatchPositionService();
export default matchPositionService;