import instance from '@/services/AxiosService';


class GoalTypeService {

    findAll() {
        return instance.get("/v1/common/get/goaltype").then(response => response.data);
    }

}

const goalTypeService = new GoalTypeService();
export default goalTypeService;