import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';

class PlayerService {
    findAll() {
        return instance.get("v1/common/get/player").then(response => response.data)
    }

    create(formObject) {
        const jsonObject = {
            "personId": formService.findValue("Player ID", formObject),
            "teamId": formService.findValue("Person ID", formObject),
            "normalPosition": formService.findValue("Team ID", formObject),
            "playerNumber": formService.findValue("Normal Position", formObject)
        }

        return instance.post("/v1/admin/post/player", jsonObject).then(response => response.data)

    }

    getPlayerGoals(playerId) {
        return instance.get(`v1/common/get/matchgoal/${playerId}/byPlayerId`)
    }

    getPlayerStats(playerId) {
        return instance.get(`v1/common/get/player/${playerId}/stats`)
    
    }

    add(playerObject) {
        return instance.post("/v1/admin/post/player", playerObject).then(response => response);
    }
    
    update(playerObject, playerId) {
        return instance.put(`v1/admin/update/player/${playerId}`, playerObject)
            .then(response => response)
            .catch(error => error)
    }
}


const playerService = new PlayerService();
export default playerService;