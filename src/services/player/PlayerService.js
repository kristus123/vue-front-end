import instance from '@/services/AxiosService.js';

class PlayerService {
    findAll() {
        return instance.get("v1/admin/get/player").then(response => response.data)
    }
}












const playerService = new PlayerService();
export default playerService;