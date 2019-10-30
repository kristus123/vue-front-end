import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class UserPlayerService {

    create(formObject) {
        const jsonObject = {
            playerId : formService.findValue("Player ID", formObject)
        }

        return instance.post("/v1/user/watchlist/post/player", jsonObject).then(response => response);
    }

    add(playerObject) {
        return instance.post("/v1/user/watchlist/post/player", playerObject).then(response => response);
    }

    findAll() {
        return instance.get("/v1/user/watchlist/get/player").then(response => response.data._embedded.playerModelList);
    }

    getPlayer(playerId) {
        return instance.get(`/v1/user/watchlist/get/player/${playerId}`).then(response => response.data);
    }

    deletePlayer(playerId) {
        return instance.delete(`/v1/user/watchlist/delete/player/${playerId}`)
            .then(response => response);
    }

    
}

const userPlayerService = new UserPlayerService();
export default userPlayerService;