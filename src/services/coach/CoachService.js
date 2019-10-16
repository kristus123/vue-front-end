import instance from '';
import formService from '@/services/form/FormService.js';

class CoachService {
    turnPersonIntoCoach(formObject) {
        const personId = formService.findValue("Person Id", formObject)
        const teamId = formService.findValue("Which team should the person coach ? (ID) ", formObject)

        instance.put(`/v1/admin/person/makeCoach/?personId=${personId}&teamID=${teamId}`)
            .then(response => response.data)
    }

}

const coachService = new CoachService(); 
export default coachService;