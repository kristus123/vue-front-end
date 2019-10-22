import instance from '@/services/AxiosService';

class TeamService {
    findAll() {
        return instance.get("/v1/common/get/team").then(response => response.data);
    }
}

const teamService = new TeamService();
export default teamService;