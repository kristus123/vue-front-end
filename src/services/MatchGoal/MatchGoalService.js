import instance from './node_modules/@/services/AxiosService'

class MatchGoalService {

    addMatchGoal(matchGoalObject) {
        instance.post(`/v1/admin/post/matchgoal`, matchGoalObject);
    }

    getMatchGoalByMatchId(id) {
        return instance.get(`/v1/common/get/matchgoal/${id}/byMatchId`)
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}

const matchGoalService = new MatchGoalService();
export default matchGoalService;