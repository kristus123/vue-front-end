import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class UserTeamService {

    create(formObject) {
        const jsonObject = {
            teamId : formService.findValue("Team ID", formObject)
        }

        return instance.post("/v1/user/watchlist/post/team", jsonObject).then(response => response);
    }

    add(teamObject) {
        return instance.post("/v1/user/watchlist/post/team", teamObject).then(response => response);
    }

    findAll() {
        return instance.get("/v1/user/watchlist/get/team").then(response => response.data);
    }

    getTeam(teamId) {
        return instance.get(`/v1/user/watchlist/get/team/${teamId}`).then(response => response.data);
    }

    deleteTeam(teamId) {
        return instance.delete(`/v1/user/watchlist/delete/team/${teamId}`)
            .then(response => response);
    }

    
}

const userTeamService = new UserTeamService();
export default userTeamService;