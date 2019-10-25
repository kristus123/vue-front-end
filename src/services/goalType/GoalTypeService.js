import instance from '@/services/AxiosService';


class GoalTypeService {

    findAll() {
        return instance.get("/v1/common/get/goaltype").then(response => response.data);
    }

    update(goalTypeObject, id) {
        return instance.put(`/v1/admin/update/goaltype/${id}`, goalTypeObject).then(response => response);
    }   

    create(goalTypeObject) {
        return instance.post("/v1/admin/post/goaltype", goalTypeObject).then(response => response);
    }

}

const goalTypeService = new GoalTypeService();
export default goalTypeService;