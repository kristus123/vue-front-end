import instance from '@/services/AxiosService';
import formService from '@/services/form/FormService.js'

class ContactService {
    add(personId, contactType, contactDetail) {
        const jsonObject = {
            personId: personId,
            contactType: contactType,
            contactDetail: contactDetail
        }
        instance.post("/v1/admin/post/contact", jsonObject)
            .then(response => response)
            .catch(error => error)
    }
}

const contactService = new ContactService();
export default contactService;