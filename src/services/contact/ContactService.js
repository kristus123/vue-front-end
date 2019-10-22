import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class ContactService {
    addContactToPerson(formObject) {
        const jsonObject = {
            "personId": formService.findValue("Person", formObject), //2,
            "contactType": formService.findValue("Contact type", formObject), //"Work phone",
            "contactDetail":  formService.findValue("details", formObject) //"433 84 096"
        }

        return instance.post("/v1/admin/post/contact", jsonObject)
            .then(response => response.data)
            .catch(error => error);

    }
}


const contactService = new ContactService();
export default contactService;