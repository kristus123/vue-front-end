import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';
class OwnerService {
    create(id) {
        const jsonObject = {
            personId: id
        }

        return instance.post("/v1/admin/post/owner", jsonObject).then(response => response);
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
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => error)
    }

    makeOwnerOwnerOf(ownerId, teamId) {
        const jsonObject = {
            ownerId: ownerId,
            teamId : teamId
        }
        return instance.put(`/v1/admin/post/owner/assign-as-Owner-of-Team`, jsonObject)
            .then(response => response.data)
            .catch(error => error)
        
    }

    update(ownerId, id) {
        const jsonObject = {
            personId: ownerId
        }
        return instance.put(`/v1/admin/update/owner/${id}`, jsonObject).then(response => response);
    }
}


const ownerService = new OwnerService();
export default ownerService;