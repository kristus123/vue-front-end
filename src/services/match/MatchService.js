import instance from '@/services/AxiosService'

class MatchService {

    getMatch(id) {
        return instance.get(`/v1/admin/get/match/${id}`)
            .then(response => response.data);
    }
}

const matchService = new MatchService();
export default matchService;