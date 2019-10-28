import instance from '@/services/AxiosService'

class MatchGoalService {

    addMatchGoal(matchGoalObject) {
        instance.post(`/v1/admin/post/matchgoal`, matchGoalObject);
    }

    getMatchGoalByMatchId(id) {
        return instance.get(`/v1/common/get/matchgoal/${id}/byMatchId`)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => console.log(error));
    }

    findAll() {
        return instance.get("/v1/common/get/matchgoal").then(response => response.data);
    }

    get(id) {
        return instance.get(`/v1/common/get/matchgoal/${id}`).then(response => response.data);
    }

    update(matchGoalObject, id) {
        return instance.put(`/v1/admin/update/matchgoal/${id}`, matchGoalObject).then(response => response);
    }

    create(matchGoalObject) {
        return instance.post("/v1/admin/post/matchgoal", matchGoalObject).then(response => response);
    }
}

const matchGoalService = new MatchGoalService();
export default matchGoalService;