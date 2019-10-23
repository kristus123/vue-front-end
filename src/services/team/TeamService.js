import instance from "@/services/AxiosService.js";


class TeamService {
    create(teamObject) {
        const jsonObject = {
            "owner": 1,
            "location": 1,
            "association": 1,
            "coach": 1
        }
        return instance.post("/v1/admin/post/team", teamObject)
            .then(response => response.data)
            .catch(error => error)
    }

    removeOwner(teamId) {
        return instance.put(`/v1/admin/put/team/${teamId}/removeOwner`)
            .then(response => response.data)
            .catch(error => error)
    }

    findById(id) {
        return instance.get(`/v1/common/get/team/${id}`)
            .then(response => response.data)
            .catch(error => error)

    }

}


const teamService = new TeamService()
export default teamService;