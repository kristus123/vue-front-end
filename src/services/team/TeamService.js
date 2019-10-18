import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';

class TeamService {
    create() {
        const jsonObject = {
            "owner": 1,
            "location": 1,
            "association": 1,
            "coach": 1
        }

        return instance.post("/v1/admin/post/team", jsonObject).then(response => response.data)

    }
}