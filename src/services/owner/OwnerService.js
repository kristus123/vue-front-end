import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';
class OwnerService {
    create(formObject) {
        const jsonObject = {
            personId: formService.findValue("Owner ID", formObject),
            teamId: formService.findValue("Team ID", formObject),

        }

        return instance.post("/v1/admin/post/owner", jsonObject).then(response => response.data);
    }

    findAll() {
        return instance.get("/v1/common/get/owner").then(response => response.data._embedded.ownerModelList)
        .catch(error => error)
    }

    findById(id) {
        return instance.get(`/v1/common/get/owner/${id}`)
            .then(response => response.data)
            .catch(error => error)
    }
    findAllOwnedTeams(id) {
        return instance.get(`/v1/admin/get/owner/${id}/allTeams`)
            .then(response => response.data)
            .catch(error => error)

    }
}


const ownerService = new OwnerService();
export default ownerService;