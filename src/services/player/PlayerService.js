import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';

class PlayerService {
    findAll() {
        return instance.get("v1/admin/get/player").then(response => response.data)
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

    add(playerObject) {
        return instance.post("/v1/admin/post/player", playerObject).then(response => response);
    }
}


const playerService = new PlayerService();
export default playerService;