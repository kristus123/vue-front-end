import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';
class OwnerService {
    create(formObject) {
        const jsonObject = {
            personId: formService.findValue("Player ID", formObject),
            personId: formService.findValue("Person ID", formObject),
            teamId: formService.findValue("Team ID", formObject),
            normalPosition: formService.findValue("Normal Position", formObject),
            playerNumber: formService.findValue("Player Number", formObject)

        }

        return instance.post("/v1/admin/post/owner", jsonObject).then(response => response.data);
    }
}


const ownerService = new OwnerService();
export default ownerService;