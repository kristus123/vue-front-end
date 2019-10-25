import instance from '@/services/AxiosService'

class MatchService {

    getMatch(id) {
        return instance.get(`/v1/admin/get/match/${id}`)
            .then(response => response.data);
    }

    findAll() {
        return instance.get("/v1/common/get/match").then(response => response.data);
    }

    update(matchObject, matchId) {

        return instance.put(`/v1/admin/update/match/${matchId}`, matchObject).then(response => response);

    }

    create(matchObject) {
        return instance.post("/v1/admin/post/match", matchObject).then(response => response);
    }
}

const matchService = new MatchService();
export default matchService;