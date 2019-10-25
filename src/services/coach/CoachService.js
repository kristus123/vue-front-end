import instance from '@/services/AxiosService';
import formService from '@/services/form/FormService.js';

class CoachService {
    turnPersonIntoCoach(formObject) {
        const personId = formService.findValue("Person Id", formObject)
        const teamId = formService.findValue("Which team should the person coach ? (ID) ", formObject)

        instance.put(`/v1/admin/person/makeCoach/?personId=${personId}&teamID=${teamId}`)
            .then(response => response.data)
    }

    findAll() {
        return instance.get("/v1/common/get/coach").then(response => response.data._embedded.coachModelList)
            .catch(error => error)
    }

    findById(id) {
        return instance.get(`/v1/common/get/coach/${id}`).then(response => response.data)
            .catch(error => error)

    }

    removeCoachFromTeam(teamId) {
        return instance.put(`v1/admin/put/team/${teamId}/removeCoach`)
            .then(response => response.data)
            .catch(error => error)

    }

    findAllTeamsThatHasCoach(coachId) {
        return instance.get(`v1/common/get/team/thatHasCoach/${coachId}`).then(response => response.data)
            .catch(error => error)

    }

    update(coachId, newTeamId) {
        const jsonObject = {
            coachId: coachId,
            newTeamId: newTeamId
        }
        return instance.put(`/v1/admin/update/coach`, jsonObject)
            .then(response => response.data)
            .catch(error => error)
    }

}

const coachService = new CoachService();
export default coachService;