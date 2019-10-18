import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';
class OwnerService {
    create(formObject) {
        const jsonObject = {
            personId: formService.findValue("personId", formObject),
            teamId: formService.findValue("teamId", formObject),

        }

        console.log(jsonObject);

        return instance.post("/v1/admin/post/owner", jsonObject)
            .then(response => response.data)
            .catch(error => error);
    }   
}


const ownerService = new OwnerService();
export default ownerService;