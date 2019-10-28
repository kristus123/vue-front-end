import instance from '@/services/AxiosService';
import formService from '@/services/form/FormService.js';

class TeamService {
    findAll() {
        return instance.get("/v1/common/get/team").then(response => response.data);
    }

    create(teamObject) {
        const jsonObject = {
            "owner": 1,
            "location": 1,
            "association": 1,
            "coach": 1
        }
        return instance.post("/v1/admin/post/team", teamObject)
            .then(response => response.data)
            .catch(error => error)
    }

    findTeamsWithNoCoach() {
        return instance.get("/v1/common/get/team/with-no-coach")
            .then(response => {
                console.log(response)
                return response.data
            })
            .catch(error => error)
    }

    removeOwner(teamId) {
        return instance.put(`/v1/admin/put/team/${teamId}/removeOwner`)
            .then(response => response.data)
            .catch(error => error)
    }

    deleteTeam(teamId) {
        return instance.delete(`/v1/admin/delete/team/${teamId}`)
            .then(response => response.data)
            .catch(error => error)
    }

    findById(id) {
        return instance.get(`/v1/common/get/team/${id}`)
            .then(response => response.data)
            .catch(error => error)

    }

    async findTeamsWithNoOwner() {
        return instance.get(`/v1/admin/get/team/with-no-owner`)
            .then(response => response.data)
            .catch(error => error)
    }

    getAllPlayersOfTeam(teamId) {
        return instance.get(`/v1/common/get/team/${teamId}/players`)
            .then(response => response.data)
            .catch(error => error)
    }

    getTeamStats(teamId) {
        return instance.get(`/v1/common/get/team/${teamId}/stats`)
            .then(response => response.data)
            .catch(error => error)
    }

    update(teamObject, teamId) {
        return instance.put(`/v1/admin/update/team/${teamId}`, teamObject).then(response => response); 
    }
}


const teamService = new TeamService();
export default teamService;